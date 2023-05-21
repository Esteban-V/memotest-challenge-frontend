import { MemoTest } from "@/lib/types/memotest";

export interface MemoTestInfoCardProps {
  item: MemoTest;
  buttonClickHandler: (memotest: MemoTest) => void;
}
