import { GameData, GameSession } from "@/lib/types";
import { calculateCards } from "@/utils";
import { createContext, useContext, useEffect, useState } from "react";

const GameDataContext = createContext<{
  gameData: GameData | null,
  setGameData: (data: GameData) => void,
  createSession: (session: GameSession) => void,
  setCurrentSession: (session: GameSession) => void,
  updateSession: (session: GameSession) => void,
}>({
  gameData: null,
  setGameData: (data: GameData) => { },
  createSession: (session: GameSession) => { },
  setCurrentSession: (session: GameSession) => { },
  updateSession: (session: GameSession) => { },
});

export const useGameData = () => useContext(GameDataContext);

export const GameDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameData, setGameDataState] = useState<GameData>({ sessions: [], current_session: null });

  useEffect(() => {
    const savedSession = localStorage.getItem('gameData');
    if (savedSession) {
      setGameDataState(JSON.parse(savedSession));
    }
  }, []);

  const setGameData = (data: GameData) => {
    localStorage.setItem('gameData', JSON.stringify(data));
    setGameDataState(data);
  };

  const createSession = (session: GameSession) => {
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

  const setCurrentSession = (session: GameSession) => {
    const updatedGameData = {
      ...gameData,
      current_session: session
    };
    
    setGameData(updatedGameData);
  };

  const updateSession = (session: GameSession) => {
    if (!gameData) return;
    const updatedSessions = gameData.sessions.map(s => s.id === session.id ? session : s);
    const updatedGameData = {
      ...gameData,
      sessions: updatedSessions
    };
    setGameData(updatedGameData);
  };

  return (
    <GameDataContext.Provider value={{ gameData, setGameData, createSession, setCurrentSession, updateSession }}>
      {children}
    </GameDataContext.Provider>
  );
};
