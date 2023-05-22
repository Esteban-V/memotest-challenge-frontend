export type MemoTest = {
  id: number;
  name: string;
  image_urls: string[];
}

export type Card = {
  image_url: string;
}

export type GameSession = {
  id: number;
  number_of_pairs: number;
  retries: number;
  memo_test: MemoTest;
  calculated_cards?: Card[];
  created_at: string;
}

export type GameData = {
  current_session: GameSession | null;
  sessions: GameSession[];
}