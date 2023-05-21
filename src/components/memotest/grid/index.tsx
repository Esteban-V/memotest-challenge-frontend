import Pagination from "@/components/pagination";
import MemoTestInfoCard from "../info-card";
import { GridListProps } from "./types";

const MemoTestList: React.FC<GridListProps> = ({
    items,
    itemClickHandler,
    handlePageChange,
    currentPage,
    paginatorInfo,
  }) => {
    return (
      <div className="flex flex-col min-h-full">
        <div className="grid grid-cols-3 grid-rows-3 mb-10 gap-4 h-2/6">
          {items.map((item, index) => (
            <MemoTestInfoCard
              key={index}
              item={item}
              buttonClickHandler={itemClickHandler}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          paginatorInfo={paginatorInfo}
          onPageChange={handlePageChange}
        />
      </div>
    );
  };
  
  export default MemoTestList;
  