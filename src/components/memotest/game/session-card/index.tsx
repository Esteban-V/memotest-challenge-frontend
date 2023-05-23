import React from "react";
import { GameState } from "@/lib/types";
import { SessionCardProps } from "./types";

const SessionCard: React.FC<SessionCardProps> = ({ gameSession, onClick }) => {
  const { id, state, number_of_pairs, score, memo_test } = gameSession;

  return (
    <>
      <div className="flex flex-row cursor-pointer shadow-lg h-24 rounded-2xl justify-between p-4 bg-white">
        <div className="w-full flex flex-col justify-center">
          <h1 className="font-bold text-xl">{`#${id} | ${memo_test.name}`}</h1>
          <span><strong>Number of pairs:</strong> {number_of_pairs}</span>
          {!!score && (<span><strong>Score:</strong> {score}</span>)}
        </div>
        {(state != GameState.Completed) &&
          <button onClick={() => { onClick(gameSession) }} className="p-2 bg-purple-500 hover:bg-purple-600 h-fit self-center
          text-white rounded-2xl hover:font-bold hover:scale-105 transition-all">Resume</button>
        }
      </div>
    </>

  );
}

export default SessionCard;
