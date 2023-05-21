import { MemoTestInfoCardProps } from "./types";

const MemoTestInfoCard: React.FC<MemoTestInfoCardProps> = ({
  item,
  buttonClickHandler,
}) => {
  const rotation = [3, 6, 12];
  const randomRotation = rotation[Math.floor(Math.random() * rotation.length)];

  return (
    <button
      onClick={() => buttonClickHandler(item)}
      className={`
          bg-purple-500 hover:bg-purple-600 text-white
          p-4 rounded-3xl w-40 flex flex-col items-center hover:scale-105 transition-all
          `}
    >
      <h2 className="font-bold text-lg">{`#${item.id} - ${item.name}`}</h2>
      <span className="text-lg underline">Play</span>
    </button>
  );
};

export default MemoTestInfoCard;
