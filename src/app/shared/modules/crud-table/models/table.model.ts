import { PaginatorState } from './paginator.model';
import { SortState } from './sort.model';

export interface ITableState {
  filter: object;
  paginator: PaginatorState;
  sorting: SortState;
  searchTerm: string;
}

export interface TableResponseModel<T> {
  items: T[];
  total: number;
}
