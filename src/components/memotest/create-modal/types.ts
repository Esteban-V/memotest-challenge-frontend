import { MemoTest } from "@/lib/types";

export interface CreateModalProps {
  memoTest: MemoTest;
  onClose: () => void;
  onStart: (item: MemoTest, pairCount: number) => void;
}
