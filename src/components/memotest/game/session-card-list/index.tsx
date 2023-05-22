import React from "react";
import { GameSession } from "@/lib/types";
import SessionCard from "../session-card";

const SessionCardList: React.FC<any> = ({ gameSessions, className, title }) => {
  return (
    <div
      className={`flex flex-col gap-4 justify-center ${className}`}
    >
      <h1 className="font-bold text-2xl">{title}</h1>

      <div className="flex flex-col  max-h-96 gap-4 p-5 overflow-y-auto">
        {gameSessions.map((gameSession: GameSession) => (
          <SessionCard key={gameSession.id} gameSession={gameSession} onClick={() => { }} />
        ))}
      </div>

    </div>
  );
}

export default SessionCardList;
