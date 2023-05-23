import { MemoTest } from "@/lib/types";

export interface NewGameModalProps {
  memoTest: MemoTest;
  onClose: () => void;
  onStart: (item: MemoTest, pairCount: number) => void;
}
