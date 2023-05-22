import CreateModal from "@/components/memotest/create-modal";
import MemoTestList from "@/components/memotest/grid-list";
import { initializeApollo } from "@/lib/apolloClient";
import { START_GAME_SESSION_MUTATION } from "@/lib/queries/gameSession";
import { MemoTest } from "@/lib/types/memotest";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [selectedMemoTest, setSelectedMemoTest] = useState<MemoTest | null>(
    null
  );

  const { push } = useRouter();

  const createMemoTest = async (item: MemoTest, pairCount: number) => {
    const apolloClient = initializeApollo();
    const { data, errors } = await apolloClient.mutate({
      mutation: START_GAME_SESSION_MUTATION,
      variables: {
        memoTestId: item.id,
        numberOfPairs: pairCount,
      },
    })

    if (errors) {
      console.log(errors);
    }

    push('/game');
  }

  return (
    <>
      <div
        className={`flex min-h-screen min-w-max p-[5%] flex-col items-center`}
      >
        <h1 className="text-4xl font-adelia mb-2">Memo Test</h1>
        <h2 className="text-lg mb-10">Select a category</h2>
        <MemoTestList
          itemClickHandler={(item) => {
            setSelectedMemoTest(item);
          }}
        />
      </div>

      {selectedMemoTest && (
        <CreateModal
          memoTest={selectedMemoTest}
          onStart={(item, pairCount) => {
            createMemoTest(item, pairCount);
          }}
          onClose={() => {
            setSelectedMemoTest(null);
          }}
        />
      )}
    </>
  );
}
