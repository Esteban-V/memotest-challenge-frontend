import React from "react";
import { GameSession } from "@/lib/types";
import SessionCard from "../session-card";

const SessionCardList: React.FC<any> = ({ gameSessions, className, title, onClick }) => {
  return (
    <div
      className={`flex flex-col justify-center ${className}`}
    >
      <h1 className="font-bold text-2xl px-4 py-2">{title}</h1>

      <div className="flex flex-col max-h-96 gap-4 overflow-visible overflow-y-scroll p-4">
        {gameSessions.map((gameSession: GameSession) => (
          <SessionCard key={gameSession.id} gameSession={gameSession} onClick={onClick} />
        ))}
      </div>

    </div>
  );
}

export default SessionCardList;
