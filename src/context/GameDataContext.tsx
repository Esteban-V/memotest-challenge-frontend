import { CREATE_SESSION, CREATE_SESSION_TYPE } from "@/lib/queries/session";
import { GameData, GameSession } from "@/lib/types";
import { calculateCards } from "@/utils";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const GameDataContext = createContext<{
  session: string | null,
  gameData: GameData | null,
  setGameData: (data: GameData) => void,
  createGame: (session: GameSession) => void,
  setCurrentGame: (session: GameSession) => void,
  updateGame: (session: GameSession) => void,
}>({
  session: null,
  gameData: null,
  setGameData: (data: GameData) => { },
  createGame: (session: GameSession) => { },
  setCurrentGame: (session: GameSession) => { },
  updateGame: (session: GameSession) => { },
});

export const useGameData = () => useContext(GameDataContext);

export const GameDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameData, setGameDataState] = useState<GameData>({ sessions: [], current_session: null });
  const router = useRouter();

  const [createSessionMutation] = useMutation<CREATE_SESSION_TYPE>(CREATE_SESSION);
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    const savedSessionId = localStorage.getItem('sessionId');
    
    if (!savedSessionId) {
      createSessionMutation().then(result => {
        const newSessionId = result.data?.createSession.id?.toString() || "";
        localStorage.setItem('sessionId', newSessionId);
        setSession(newSessionId);
      }).catch(error => {
        console.error('Failed to create a session', error);
      });
    } else {
      setSession(savedSessionId);
    }
  }, [router.isReady]);

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
    <GameDataContext.Provider value={{ session, gameData, setGameData, createGame, setCurrentGame, updateGame }}>
      {children}
    </GameDataContext.Provider>
  );
};