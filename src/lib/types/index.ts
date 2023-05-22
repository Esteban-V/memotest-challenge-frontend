export type MemoTest = {
  id: number;
  name: string;
  image_urls: string[];
}

export type Card = {
  position: number;
  image_url: string;
}

export enum GameState {
  Started,
  Completed
}

export type GameSession = {
  id: number;
  number_of_pairs: number;
  state: GameState;
  retries: number;
  memo_test: MemoTest;
  calculated_cards?: Card[];
  progress: string[]; // Already flipped images
  score: number;
  created_at: string;
}

export type GameData = {
  current_session: GameSession | null;
  sessions: GameSession[];
}