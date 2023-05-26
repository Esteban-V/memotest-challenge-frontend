import { gql } from "@apollo/client";
import { GameSession } from "../types";

export type START_GAME_SESSION_TYPE = {
  startGameSession: GameSession;
};

export type END_GAME_SESSION_TYPE = {
  endGameSession: GameSession;
};

export const START_GAME_SESSION_MUTATION = gql`
  mutation START_GAME_SESSION_MUTATION($sessionId: ID!, $memoTestId: ID!, $numberOfPairs: Int!) {
    startGameSession(sessionId: $sessionId, memoTestId: $memoTestId, numberOfPairs: $numberOfPairs) {
      id
      number_of_pairs
      retries
      state
      memo_test {
        id
        name
        image_urls
      }
      created_at
    }
  }
`;

export const END_GAME_SESSION = gql`
  mutation END_GAME_SESSION($gameSessionId: ID!) {
    endGameSession(gameSessionId: $gameSessionId) {
      id
      number_of_pairs
      retries
      state
      score
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
  mutation INCREMENT_GAME_SESSION_RETRIES($gameSessionId: ID!) {
    addTry(gameSessionId: $gameSessionId) {
      id
      number_of_pairs
      retries
      state
      memo_test {
        id
        name
        image_urls
      }
      created_at
    }
  }
`;