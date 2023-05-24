import { MemoTest } from "@/lib/types";

export interface NewGameModalProps {
  memoTest: MemoTest;
  isLoading: boolean;
  onClose: () => void;
  onStart: (item: MemoTest, pairCount: number) => void;
}
