import { useState, useEffect } from 'react';
import FlipCard from "@/components/memotest/game/flip-card";
import { useGameData } from "@/context/GameDataContext";
import { Card } from "@/lib/types";

const Game: React.FC = () => {
  const { gameData, updateSession } = useGameData();
  const [flippedCards, setFlippedCards] = useState<(Card | null)[]>([null, null]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (flippedCards[0] && flippedCards[1] && flippedCards[0].image_url !== flippedCards[1].image_url) {
        setFlippedCards([null, null]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [flippedCards]);

  const flipCard = (card: Card) => {
    const currentSession = gameData?.current_session;
    const progress = currentSession?.progress;

    if (!flippedCards[0]) {
      setFlippedCards([card, null]);
    } else if (flippedCards[0] && !flippedCards[1]) {
      if (flippedCards[0].image_url === card.image_url) {
        progress && progress.push(card.image_url);
        currentSession && updateSession(currentSession);
        setFlippedCards([null, null]);
      } else {
        setFlippedCards(prev => [prev[0], card]);
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
    <div className="flex items-center justify-center p-5">
      <div className={`grid grid-cols-4 gap-1 w-fit rounded-3xl bg-gray-200 p-5`}>
        {cards.map((card, index) => (
          <FlipCard
            key={card.position} // or use a unique id for the key if available
            isFlipped={isCardFlipped(card)}
            onClick={() => flipCard(card)}
            backImage={card.image_url}
            frontText={`${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Game;
