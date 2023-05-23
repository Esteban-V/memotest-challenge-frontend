import { GameSession } from "@/lib/types";

export interface SessionCardProps {
  gameSession: GameSession;
  onClick: (item: GameSession) => void;
}
