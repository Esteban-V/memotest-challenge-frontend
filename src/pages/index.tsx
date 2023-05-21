import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MEMOTESTS_PAGINATED } from "@/lib/queries/memotest";
import MemoTestList from "@/components/memotest/grid";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useQuery(GET_MEMOTESTS_PAGINATED, {
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
      <div>
        <p>Something went wrong, please try again.</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    );
  }
  if (!data) return <p>No data available</p>;

  return (
    <div className="home-container">
      <h1 className="home-title">MemoTest</h1>
      <h2 className="home-subtitle">Select a category</h2>
      <MemoTestList
        handlePageChange={setPage}
        items={data.memoTests.data}
        paginatorInfo={data.memoTests.paginatorInfo}
        currentPage={page}
        itemClickHandler={(item) => {
          console.log(item);
        }}
      />
    </div>
  );
}
