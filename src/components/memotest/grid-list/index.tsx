import Pagination from "@/components/pagination";
import MemoTestInfoCard from "../info-card";
import { MemoTestListProps } from "./types";
import { MemoTest } from "@/lib/types";
import { AiOutlinePlusCircle } from "react-icons/ai"

const MemoTestList: React.FC<MemoTestListProps> = ({ items, paginatorInfo, onPageChange, itemClickHandler, showCreateCard, onClickCreate }) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 grid-rows-3 mb-10 gap-4 h-full">
        {items.map((item: MemoTest, _) => (
          <MemoTestInfoCard
            key={item.id}
            item={item}
            buttonClickHandler={itemClickHandler}
          />
        ))}
        {showCreateCard && (
          <div className="text-black border-4 border-dashed border-black cursor-pointer flex justify-center
          p-4 rounded-3xl w-40 items-center hover:scale-105 transition-all"
            onClick={onClickCreate}>
            <AiOutlinePlusCircle size={50} />
          </div>
        )}
      </div>
      <Pagination
        paginatorInfo={paginatorInfo}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default MemoTestList;
