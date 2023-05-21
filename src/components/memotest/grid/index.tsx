import Pagination from "@/components/pagination";
import MemoTestInfoCard from "../info-card";
import { GridListProps } from "./types";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_MEMOTESTS_PAGINATED,
  GET_MEMOTESTS_PAGINATED_TYPE,
} from "@/lib/queries/memotest";
import { MemoTest } from "@/lib/types/memotest";

const MemoTestList: React.FC<GridListProps> = ({ itemClickHandler }) => {
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useQuery<GET_MEMOTESTS_PAGINATED_TYPE>(GET_MEMOTESTS_PAGINATED, {
      variables: {
        page,
      },
      onError: (error) => {
        // Log the error for debugging.
        console.error(error);
      },
    });

  const handleRetry = () => {
    refetch();
  };

  if (loading) return <div>Loading...</div>;
  if (error) {
    return (
      <div className="flex flex-col items-center gap-5">
        <p>Something went wrong, please try again.</p>
        <button className="bg-purple-500 hover:bg-purple-600 text-white
          p-2 rounded-3xl w-20 flex flex-col items-center hover:scale-105 transition-all" onClick={handleRetry}>Retry</button>
      </div>
    );
  }
  if (!data) return <p>No data available</p>;

  return (
    <div className="flex flex-col min-h-full">
      <div className="grid grid-cols-3 grid-rows-3 mb-10 gap-4 h-2/6">
        {data.memoTests.data.map((item: MemoTest, _) => (
          <MemoTestInfoCard
            key={item.id}
            item={item}
            buttonClickHandler={itemClickHandler}
          />
        ))}
      </div>
      <Pagination
        currentPage={page}
        paginatorInfo={data.memoTests.paginatorInfo}
        onPageChange={setPage}
      />
    </div>
  );
};

export default MemoTestList;
