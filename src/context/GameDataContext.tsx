import { GameData, GameSession } from "@/lib/types";
import { calculateCards } from "@/utils";
import { createContext, useContext, useState } from "react";

const GameDataContext = createContext<{
  gameData: GameData | null,
  setGameData: (data: GameData) => void,
  createGame: (game: GameSession) => void,
  setCurrentGame: (game: GameSession) => void,
  updateGame: (game: GameSession) => void,
}>({
  gameData: null,
  setGameData: (data: GameData) => { },
  createGame: (game: GameSession) => { },
  setCurrentGame: (game: GameSession) => { },
  updateGame: (game: GameSession) => { },
});

export const useGameData = () => useContext(GameDataContext);

export const GameDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameData, setGameDataState] = useState<GameData>({ sessions: [], current_session: null });

  const setGameData = (data: GameData) => {
    localStorage.setItem('gameData', JSON.stringify(data));
    setGameDataState(data);
  };

  const createGame = (session: GameSession) => {
    session.calculated_cards = calculateCards(session);
    session.score = 0;
    session.progress = [];
    gameData.sessions.push(session);
    const updatedGameData = {
      ...gameData,
      current_session: session
    };
    
    setGameData(updatedGameData);
  };

  const setCurrentGame = (session: GameSession) => {
    const updatedGameData = {
      ...gameData,
      current_session: session
    };
    
    setGameData(updatedGameData);
  };

  const updateGame = (session: GameSession) => {
    if (!gameData) return;
    const updatedSessions = gameData.sessions.map(s => s.id === session.id ? session : s);
    const updatedGameData = {
      ...gameData,
      sessions: updatedSessions
    };
    setGameData(updatedGameData);
  };

  return (
    <GameDataContext.Provider value={{ gameData, setGameData, createGame, setCurrentGame, updateGame }}>
      {children}
    </GameDataContext.Provider>
  );
};