import { MemoTestInfoCardProps } from "./types";
import { useGameData } from "@/context/GameDataContext";

const MemoTestInfoCard: React.FC<MemoTestInfoCardProps> = ({
  item,
  buttonClickHandler,
}) => {
  return (
    <button
      onClick={() => buttonClickHandler(item)}
      className={`
          bg-purple-500 hover:bg-purple-600 text-white h-40 w-40
          p-4 rounded-3xl flex flex-col justify-between items-center hover:scale-105 transition-all group
          `}
    >
      <h2 className="font-bold text-lg whitespace-nowrap text-ellipsis w-32 overflow-hidden">{item.name}</h2>
      {!!item.high_score && (
        <>
          <span className="font-bold">Highest score:</span>
          <span>{item.high_score}</span>
        </>
      )}
      <span className="text-lg h-fit mt-2 p-2 rounded-xl group-hover:font-bold">Play</span>
    </button>
  );
};

export default MemoTestInfoCard;
