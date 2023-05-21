import { PaginatorInfo } from "@/lib/types/apollo";
import { MemoTest } from "@/lib/types/memotest";

export interface GridListProps {
  items: MemoTest[];
  itemClickHandler: (memotest: MemoTest) => void;
  handlePageChange: (page: number) => void;
  currentPage: number;
  paginatorInfo: PaginatorInfo;
}
