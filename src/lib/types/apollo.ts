export type PaginatorInfo = {
    total: number;
    perPage: number;
}

export type Paginated<T> = {
    paginatorInfo: PaginatorInfo;
    data: T[];
};

