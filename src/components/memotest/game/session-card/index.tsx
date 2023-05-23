import React from "react";
import { GameState } from "@/lib/types";
import { SessionCardProps } from "./types";

const SessionCard: React.FC<SessionCardProps> = ({ gameSession, onClick }) => {
  const { id, state, number_of_pairs, score, memo_test } = gameSession;

  return (
    <>
      <div className="flex flex-row shadow-lg gap-4 h-24 rounded-2xl justify-between p-4 bg-white">
        <div className="w-full flex flex-col justify-center">
          <h1
            title={memo_test.name}
            className="font-bold text-xl whitespace-nowrap text-ellipsis overflow-x-clip w-3/5">
            {`#${id} | ${memo_test.name}`}
          </h1>
          <span><strong>Number of pairs:</strong> {number_of_pairs}</span>
          {!!score && (<span><strong>Score:</strong> {score}</span>)}
        </div>
        {(state != GameState.Completed) &&
          <button onClick={() => { onClick(gameSession) }} className="py-2 px-4 bg-purple-500 hover:bg-purple-600 h-fit self-center
          text-white rounded-2xl hover:font-bold hover:scale-105 transition-all">Resume</button>
        }
        {(state == GameState.Completed) &&
          <span className="py-2 px-4 bg-gray-400 h-fit self-center text-white rounded-2xl">Finished</span>
        }
      </div>
    </>

  );
}

export default SessionCard;
