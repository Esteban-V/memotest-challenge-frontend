export type MemoTest = {
  id: number;
  name: string;
  image_urls: string[];
}

export type GameSession = {
  id: number;
  number_of_pairs: number;
  retries: number;
  memo_test: Partial<MemoTest>;
  created_at: string;
}