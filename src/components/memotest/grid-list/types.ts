import { MemoTest } from "@/lib/types";

export interface GridListProps {
  itemClickHandler: (memotest: MemoTest) => void;
  showCreateCard: boolean;
}