export type PaginatorInfo = {
    total: number;
    perPage: number;
    currentPage: number;
}

export type Paginated<T> = {
    paginatorInfo: PaginatorInfo;
    data: T[];
};

