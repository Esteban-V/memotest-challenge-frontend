import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import FlipCard from "@/components/memotest/game/flip-card";
import { useGameData } from "@/context/GameDataContext";
import { Card, GameState } from "@/lib/types";
import { END_GAME_SESSION, END_GAME_SESSION_TYPE, INCREMENT_GAME_SESSION_RETRIES } from '@/lib/queries/gameSession';
import ReactConfetti from 'react-confetti';
import { AiOutlineLeftCircle } from "react-icons/ai"
import { useRouter } from 'next/router';


const Game: React.FC = () => {
  const { push } = useRouter();
  const { gameData, updateSession } = useGameData();

  const [isExploding, setIsExploding] = useState(false);

  const [incrementRetries] = useMutation(INCREMENT_GAME_SESSION_RETRIES);
  const [endGameSession] = useMutation<END_GAME_SESSION_TYPE>(END_GAME_SESSION);
  const [flippedCards, setFlippedCards] = useState<(Card | null)[]>([null, null]);
  const [matchedCards, setMatchedCards] = useState<Card[]>([]);

  const currentSession = gameData?.current_session;
  const progress = currentSession?.progress;

  // Add effect to unflip the cards if they do not match after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      if (flippedCards[0] && flippedCards[1] && flippedCards[0].image_url !== flippedCards[1].image_url) {
        setFlippedCards([null, null]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [flippedCards]);

  const flipCard = async (card: Card) => {
    if (!flippedCards[0]) {
      setFlippedCards([card, null]);

      // Increment the retries both locally and on the server
      if (currentSession) {
        currentSession.retries += 1;
        updateSession(currentSession);
        incrementRetries({ variables: { gameSessionId: currentSession.id } });
      }
    } else if (flippedCards[0] && !flippedCards[1]) {
      if (flippedCards[0].image_url === card.image_url) {
        // If the two cards match, add to progress and unflip the cards
        progress && progress.push(card.image_url);
        currentSession && updateSession(currentSession);
        setFlippedCards([null, null]);

        // If the progress is complete, end the game
        if (progress && progress.length === currentSession?.number_of_pairs) {
          const session = await endGameSession({ variables: { gameSessionId: currentSession.id } });
          updateSession(session.data?.endGameSession!);
          setIsExploding(session.data?.endGameSession.state === GameState.Completed);
        }

      } else {
        setFlippedCards([flippedCards[0], card]);
      }
    }
  };

  const isCardFlipped = (card: Card) => {
    const progress = gameData?.current_session?.progress;
    return (!!flippedCards.find(flippedCard => flippedCard && flippedCard.position === card.position)
      || !!progress?.find(image_url => image_url === card.image_url));
  };

  if (!gameData?.current_session || !gameData.current_session.calculated_cards) {
    return <div>Loading...</div>
  }

  const cards = gameData.current_session.calculated_cards;

  return (
    <>
      <AiOutlineLeftCircle
        className="absolute top-5 left-5 cursor-pointer hover:scale-105 transition-all"
        onClick={() => push('/')}
        size={40} />

      <div className="flex items-center justify-center p-5">
        {isExploding &&
          <ReactConfetti />
        }
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col">
            <span className="text-2xl"><strong>Retries:</strong> {currentSession?.retries}</span>
          </div>
          <div className="grid grid-cols-4 gap-1 w-fit rounded-3xl bg-gray-200 p-5">
            {cards.map((card, index) => (
              <FlipCard
                key={card.position}
                isFlipped={isCardFlipped(card)}
                onClick={() => flipCard(card)}
                backImage={card.image_url}
                frontText={`${index + 1}`} />
            ))}
          </div>
        </div>

      </div>
    </>

  );
};

export default Game;
