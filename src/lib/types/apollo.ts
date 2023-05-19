export type Paginatorinfo = {
    total: number;
    count: number;
}

export type Paginated<T> = {
    paginatorInfo: Paginatorinfo;
    data: T[];
};

