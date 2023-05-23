import { getHighestScore } from "@/utils";
import { MemoTestInfoCardProps } from "./types";
import { useGameData } from "@/context/GameDataContext";

const MemoTestInfoCard: React.FC<MemoTestInfoCardProps> = ({
  item,
  buttonClickHandler,
}) => {
  const { gameData } = useGameData();

  const highestScore = getHighestScore(gameData?.sessions, item.id);

  return (
    <button
      onClick={() => buttonClickHandler(item)}
      className={`
          bg-purple-500 hover:bg-purple-600 text-white
          p-4 rounded-3xl w-40 flex flex-col items-center hover:scale-105 transition-all group
          `}
    >
      <h2 className="font-bold text-lg">{`#${item.id} - ${item.name}`}</h2>
      {!highestScore && (<span><strong>Highest score: </strong>{highestScore}</span>)}
      <span className="text-lg h-fit mt-2 p-2 rounded-xl group-hover:font-bold group-hover:bg-white group-hover:text-black">Play</span>
    </button>
  );
};

export default MemoTestInfoCard;
