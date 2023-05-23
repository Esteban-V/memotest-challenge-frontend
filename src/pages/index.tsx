import CreationModal from "@/components/memotest/creation-modal";
import SessionCardList from "@/components/memotest/game/session-card-list";
import MemoTestList from "@/components/memotest/grid-list";
import NewGameModal from "@/components/memotest/new-game-modal";
import { useGameData } from "@/context/GameDataContext";
import { initializeApollo } from "@/lib/apolloClient";
import { START_GAME_SESSION_MUTATION } from "@/lib/queries/gameSession";
import {
  CREATE_MEMOTEST,
  GET_MEMOTESTS_PAGINATED,
  GET_MEMOTESTS_PAGINATED_TYPE,
} from "@/lib/queries/memoTest";
import { GameSession, MemoTest } from "@/lib/types";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export default function Home() {
  const { push } = useRouter();
  const { setCurrentSession, createSession, gameData } = useGameData();

  const [page, setPage] = useState(1);
  const [showCreationModal, setShowCreationModal] = useState<boolean>(false);
  const [selectedMemoTest, setSelectedMemoTest] = useState<MemoTest | null>(null);

  const { data, loading, error, refetch } =
    useQuery<GET_MEMOTESTS_PAGINATED_TYPE>(GET_MEMOTESTS_PAGINATED, {
      variables: {
        page,
        perPage: 8,
      },
      fetchPolicy: "no-cache",
      onError: (error) => {
        console.error(error);
      },
    });

  const createMemoTest = useCallback(async (name: string, images: string[]) => {
    const apolloClient = initializeApollo();
    try {
      await apolloClient.mutate({
        mutation: CREATE_MEMOTEST,
        variables: {
          name,
          images,
        },
      });
      refetch();
    } catch (error) {
      console.error('Failed to create a MemoTest', error);
    }
  }, [refetch]);

  const createGameSession = useCallback(async (item: MemoTest, pairCount: number) => {
    const apolloClient = initializeApollo();
    const { data, errors } = await apolloClient.mutate({
      mutation: START_GAME_SESSION_MUTATION,
      variables: {
        memoTestId: item.id,
        numberOfPairs: pairCount,
      },
    });

    if (errors) {
      console.log(errors);
    } else if (data) {
      createSession(data.startGameSession);
      push("/game");
    }
  }, [createSession, push]);

  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row justify-center items-center min-h-screen min-w-max p-[5%] gap-5">
        {!!gameData?.sessions.length && (
          <div className="w-full sm:w-3/5 p-6 rounded-3xl bg-gray-100">
            <SessionCardList
              title={"Past Games"}
              onClick={(item: GameSession) => {
                setCurrentSession(item);
                push("/game");
              }}
              gameSessions={gameData?.sessions}
            />
          </div>
        )}
        <div className="flex w-full flex-col items-center h-fit">
          <h1 className="text-4xl font-adelia mb-2">Memo Test</h1>
          <div className="flex flex-col items-center" style={{ height: "60vh" }}>
            {loading ? (
              <div className="h-full">
                <p>Loading...</p>
              </div>
            ) : error || !data ? (
              <div className="flex flex-col items-center gap-5">
                <p>Something went wrong, please try again.</p>
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white
                  p-2 rounded-3xl w-20 flex flex-col items-center hover:scale-105 transition-all"
                  onClick={refetch}
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-lg mb-10">Select a category</h2>
                <MemoTestList
                  onPageChange={setPage}
                  paginatorInfo={data.memoTests.paginatorInfo}
                  items={data.memoTests.data}
                  showCreateCard
                  onClickCreate={() => {
                    setShowCreationModal(true);
                  }}
                  itemClickHandler={(item) => {
                    setSelectedMemoTest(item);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {selectedMemoTest && (
        <NewGameModal
          memoTest={selectedMemoTest}
          onStart={(item: MemoTest, pairCount: number) => {
            createGameSession(item, pairCount);
          }}
          onClose={() => {
            setSelectedMemoTest(null);
          }}
        />
      )}

      {showCreationModal && (
        <CreationModal
          onCreate={(name, image_urls) => {
            createMemoTest(name, image_urls);
            setShowCreationModal(false);
          }}
          onClose={() => {
            setShowCreationModal(false);
          }}
        />
      )}
    </>
  );
}
