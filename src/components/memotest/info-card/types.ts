import { MemoTest } from "@/lib/types";

export interface MemoTestInfoCardProps {
  item: MemoTest;
  buttonClickHandler: (memotest: MemoTest) => void;
}
