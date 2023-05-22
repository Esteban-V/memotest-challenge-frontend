import { gql } from "@apollo/client";
import { GameSession } from "../types";

export type START_GAME_SESSION_TYPE = {
  startGameSession: GameSession;
};

export const START_GAME_SESSION_MUTATION = gql`
  mutation START_GAME_SESSION_MUTATION($memoTestId: ID!, $numberOfPairs: Int!) {
    startGameSession(memoTestId: $memoTestId, numberOfPairs: $numberOfPairs) {
      id
      number_of_pairs
      retries
      memo_test {
        id
        name
        image_urls
      }
      created_at
    }
  }
`;

export const INCREMENT_GAME_SESSION_RETRIES = gql`
  mutation GET_MEMOTESTS_PAGINATED($gameSessionId: ID!) {
    addTry(gameSessionId: $gameSessionId) {
      id
      number_of_pairs
      retries
      memo_test {
        id
        name
        image_urls
      }
      created_at
    }
  }
`;