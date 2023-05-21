import { PaginatorInfo } from "@/lib/types/apollo";
import { MemoTest } from "@/lib/types/memotest";

export interface GridListProps {
  items: MemoTest[];
  buttonClickHandler: (index: number) => void;
  handlePageChange: (page: number) => void;
  currentPage: number;
  paginatorInfo: PaginatorInfo;
}
