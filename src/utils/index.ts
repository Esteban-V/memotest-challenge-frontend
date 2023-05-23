import { Card, GameSession } from "@/lib/types";

export const calculateCards = (session: GameSession) => {
  if (session.calculated_cards?.length == session.number_of_pairs) {
    return session.calculated_cards;
  }

  const { image_urls } = session.memo_test;
  const { number_of_pairs: pairs } = session;

  const selectedImages: string[] = [];
  const usedIndices = new Set<number>();

  while (selectedImages.length < pairs) {
    const imageIndex = Math.floor(Math.random() * image_urls.length);

    if (!usedIndices.has(imageIndex)) {
      selectedImages.push(image_urls[imageIndex]);
      usedIndices.add(imageIndex);
    }
  }

  const duplicatedImages = [...selectedImages, ...selectedImages];

  let shuffledCards: Card[] = duplicatedImages.map((image, index) => ({
    position: index,
    image_url: image,
  }));

  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }

  return shuffledCards;
};

export const getPastSessions = (sessions: GameSession[], memotest: number) => {
  return sessions.filter((session) => session.memo_test.id === memotest);
}

export const getHighestScore = (sessions: GameSession[] | undefined, memotest: number) => {
  if(!sessions) return 0;

  const pastSessions = getPastSessions(sessions, memotest);
  const scores = pastSessions.map((session) => session.score);

  return !!scores.length ? Math.max(...scores) : 0;
}

export const isServer = () => typeof window === 'undefined';
export const isClient = () => typeof window !== 'undefined';