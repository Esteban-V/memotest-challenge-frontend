import { MemoTest } from "@/lib/types/memotest";
import React, { useState } from "react";
import Pagination from "./pagination";
import { PaginatorInfo } from "@/lib/types/apollo";
import MemoTestInfoCard from "./memotest-info-card";

interface GridListProps {
  items: MemoTest[];
  buttonClickHandler: (index: number) => void;
  handlePageChange: (page: number) => void;
  currentPage: number;
  paginatorInfo: PaginatorInfo;
}

const MemoTestList: React.FC<GridListProps> = ({
  items,
  buttonClickHandler,
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
            buttonClickHandler={buttonClickHandler}
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
