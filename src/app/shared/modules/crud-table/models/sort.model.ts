export type SortDirection = 'asc' | 'desc' | '';

export type SortType = 'server' | 'client';

export interface ISortState {
  column: string;
  direction: SortDirection;
  serverOrClientSide: SortType;
}

export class SortState implements ISortState {
  column = ''; // Id by default
  direction: SortDirection = 'asc'; // asc by default;
  serverOrClientSide: SortType = 'client';
}

export interface ISortView {
  sorting: SortState;
  ngOnInit(): void;
  sort(column: string): void;
}
