import create from 'zustand';

interface PaginationState {
  pageIndex: number;
  pageSize: number;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  pageIndex: 1,
  pageSize: 5,
  setPageIndex: (pageIndex: number) => set(() => ({ pageIndex })),
  setPageSize: (pageSize: number) => set(() => ({ pageSize })),
}));
