import CreateModal from "@/components/memotest/create-modal";
import SessionCardList from "@/components/memotest/game/session-card-list";
import MemoTestList from "@/components/memotest/grid-list";
import { useGameData } from "@/context/GameDataContext";
import { initializeApollo } from "@/lib/apolloClient";
import { START_GAME_SESSION_MUTATION } from "@/lib/queries/gameSession";
import { MemoTest } from "@/lib/types";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const { setCurrentSession, gameData } = useGameData();
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
    } else if (data) {
      setCurrentSession(data.startGameSession);
    }

    push('/game');
  }

  return (
    <>
      <div
        className="flex flex-row justify-center items-center min-h-screen min-w-max p-[5%] gap-5"
      >
        <div className="w-3/5 p-10 rounded-3xl bg-yellow-300">
          <SessionCardList
            title={"Past Games"}
            gameSessions={gameData?.sessions} />
        </div>
        <div className="flex w-full flex-col items-center h-fit">
          <h1 className="text-4xl font-adelia mb-2">Memo Test</h1>
          <h2 className="text-lg mb-10">Select a category</h2>
          <MemoTestList
            itemClickHandler={(item) => {
              setSelectedMemoTest(item);
            }}
          />
        </div>
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
