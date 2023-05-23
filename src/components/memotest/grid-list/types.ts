import { MemoTest } from "@/lib/types";
import { PaginatorInfo } from "@/lib/types/apollo";

export interface MemoTestListProps {
  items: MemoTest[];
  itemClickHandler: (memotest: MemoTest) => void;
  onClickCreate: () => void;
  onPageChange: (page: number) => void;
  paginatorInfo: PaginatorInfo;
  showCreateCard: boolean;
}