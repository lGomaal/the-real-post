export const PageSizes = [3, 5, 10, 15, 50, 100];

export type PaginationType = 'server' | 'client';

export interface IPaginatorState {
  page: number;
  pageSize: number;
  total: number;
  currentPageSizeData: number;
  recalculatePaginator(
    total: number,
    currentPageSizeData: number,
  ): IPaginatorState;
}

export class PaginatorState implements IPaginatorState {
  page = 1;
  pageSize = PageSizes[1];
  // currentPageSizeData is here to check the current number of rows to correct the paginator counting of rows.
  currentPageSizeData = this.pageSize;
  total = 0;
  pageSizes: number[] = [];
  serverOrClientSide: PaginationType;

  constructor(
    paginationType?: PaginationType,
    pageSize?: number,
    pageSizes?: number[],
  ) {
    this.serverOrClientSide = paginationType || 'server';
    this.pageSize = pageSize || 5;
    this.pageSizes = pageSizes || PageSizes;
  }

  recalculatePaginator(
    total: number,
    currentPageSizeData: number,
  ): PaginatorState {
    this.total = total;
    this.currentPageSizeData = currentPageSizeData;
    return this;
  }
}

export interface IPaginatorView {
  paginator: PaginatorState;
  ngOnInit(): void;
  paginate(paginator: PaginatorState): void;
}
