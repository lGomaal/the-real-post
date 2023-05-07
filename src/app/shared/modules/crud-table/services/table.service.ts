import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  of,
  Subscription,
  tap,
} from 'rxjs';
import { PaginatorState } from '../models/paginator.model';
import { SortState } from '../models/sort.model';
import { ITableState, TableResponseModel } from '../models/table.model';

const DEFAULT_STATE: ITableState = {
  filter: {},
  paginator: new PaginatorState(),
  sorting: new SortState(),
  searchTerm: '',
};

export abstract class TableService<T> {
  // Private fields
  protected _itemsWithNoServerSidePagination$ = new BehaviorSubject<T[]>([]);
  protected _errorMessage$ = new BehaviorSubject<string>('');
  protected _subscriptions: Subscription[] = [];
  protected _items$ = new BehaviorSubject<T[]>([]);
  protected _isLoading$ = new BehaviorSubject<boolean>(false);
  protected _tableState$ = new BehaviorSubject<ITableState>(DEFAULT_STATE);

  get items$() {
    return this._items$.asObservable();
  }
  get isLoading$() {
    return this._isLoading$.asObservable();
  }
  get errorMessage$() {
    return this._errorMessage$.asObservable();
  }
  get subscriptions() {
    return this._subscriptions;
  }
  // State getters
  get paginator() {
    return this._tableState$.value.paginator;
  }
  get filter() {
    return this._tableState$.value.filter;
  }
  get sorting() {
    return this._tableState$.value.sorting;
  }
  get searchTerm() {
    return this._tableState$.value.searchTerm;
  }

  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  abstract find(tableState: ITableState): Observable<TableResponseModel<T>>;

  public fetchUpdatedData(): void {
    this._itemsWithNoServerSidePagination$.next([]);
    this.fetch();
  }

  public fetch() {
    this._isLoading$.next(true);
    this._errorMessage$.next('');
    const request = this.find(this._tableState$.value)
      .pipe(
        tap((res: TableResponseModel<T>) => {
          this._items$.next(res.items);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              res.total,
              res.items.length,
            ),
          });
        }),
        catchError(err => {
          this._errorMessage$.next(err);
          return of({
            items: [],
            total: 0,
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
        }),
      )
      .subscribe();
    this._subscriptions.push(request);
  }

  public setDefaults() {
    this.patchStateWithoutFetch({ filter: {} });
    this.patchStateWithoutFetch({ sorting: new SortState() });
    this.patchStateWithoutFetch({ searchTerm: '' });
    this.patchStateWithoutFetch({
      paginator: new PaginatorState(),
    });
    this._isLoading$.next(true);
    this._tableState$.next(DEFAULT_STATE);
    this._errorMessage$.next('');
  }

  // Base Methods
  public patchState(patch: Partial<ITableState>) {
    this.patchStateWithoutFetch(patch);
    if (
      patch.sorting instanceof SortState &&
      patch.sorting.serverOrClientSide === 'client'
    ) {
      this.sortClientSide();
      return;
    }
    this.fetch();
  }

  public patchStateWithoutFetch(patch: Partial<ITableState>) {
    const newState = Object.assign(this._tableState$.value, patch);
    this._tableState$.next(newState);
  }

  protected sortClientSide(): void {
    const sortState: SortState = this._tableState$.value.sorting;

    if (sortState.direction === 'asc') {
      this._items$.next(
        this._items$.value.sort((a, b) =>
          (a as any)[sortState.column] < (b as any)[sortState.column] ? -1 : 1,
        ),
      );
    } else {
      this._items$.next(
        this._items$.value.sort((a, b) =>
          (a as any)[sortState.column] > (b as any)[sortState.column] ? -1 : 1,
        ),
      );
    }
  }

  protected paginationClintSide(
    paginator: PaginatorState,
  ): TableResponseModel<T> {
    const items = this._itemsWithNoServerSidePagination$.value;
    const newItems: TableResponseModel<T> = {
      items: [],
      total: items.length,
    };

    const startIndex = paginator.page * paginator.pageSize - paginator.pageSize;
    let endIndex = 0;

    if (startIndex <= 0) {
      endIndex = paginator.pageSize;
    } else {
      endIndex = startIndex + paginator.pageSize;
    }

    if (endIndex >= items.length) {
      endIndex = items.length;
    }

    for (let index = startIndex; index < endIndex; index++) {
      newItems.items.push(items[index]);
    }

    // console.log("start", startIndex)
    // console.log("end", endIndex)
    // console.log("pagination", newItems)

    return newItems;
  }
}
