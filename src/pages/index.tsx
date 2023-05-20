import GridList from "@/components/memo-grid";
import { GET_MEMOTESTS_PAGINATED } from "@/lib/queries/memotest";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<GET_MEMOTESTS_PAGINATED>(
    GET_MEMOTESTS_PAGINATED,
    {
      variables: {
        page,
      },
    }
  );

  return (
    <div
      className={`flex min-h-screen min-w-max p-[5%] flex-col items-center`}
    >
      <h1 className="text-4xl font-adelia mb-2">MemoTest</h1>
      <h2 className="text-lg mb-10">Select a category</h2>

      {!data || loading || error ? (
        <div>Loading...</div>
      ) : (
        <GridList
          buttonClickHandler={() => {}}
          handlePageChange={setPage}
          items={data.memoTests.data}
          paginatorInfo={data.memoTests.paginatorInfo}
          currentPage={page}
        />
      )}
    </div>
  );
}
