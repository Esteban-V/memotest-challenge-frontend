import React from "react";
import { GameSession } from "@/lib/types";
import SessionCard from "../session-card";

const SessionCardList: React.FC<any> = ({ gameSessions, className, title, onClick }) => {
  return (
    <div
      className={`flex flex-col gap-4 justify-center ${className}`}
    >
      <h1 className="font-bold text-2xl">{title}</h1>

      <div className="flex flex-col max-h-96 gap-4 overflow-y-auto overflow-visible">
        {gameSessions.map((gameSession: GameSession) => (
          <SessionCard key={gameSession.id} gameSession={gameSession} onClick={onClick} />
        ))}
      </div>

    </div>
  );
}

export default SessionCardList;
