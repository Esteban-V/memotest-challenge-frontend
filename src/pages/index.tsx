import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MEMOTESTS_PAGINATED } from "@/lib/queries/memotest";
import MemoTestList from "@/components/memotest/grid";

export default function Home() {
  return (
    <div
      className={`flex min-h-screen min-w-max p-[5%] flex-col items-center`}
    >
      <h1 className="text-4xl font-adelia mb-2">MemoTest</h1>
      <h2 className="text-lg mb-10">Select a category</h2>
      <MemoTestList
        itemClickHandler={(item) => {
          console.log(item);
        }}
      />
    </div>
  );
}
