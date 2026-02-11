export * from './database';

export interface Pagination {
  total: number;
  size: number;
  start: number;
  end: number;
  currentPage: number;
  lastPage: number;
}
