import { gql } from "@apollo/client";
import { Paginated } from "../types/apollo";
import { MemoTest } from "../types";

export type GET_MEMOTESTS_PAGINATED_TYPE = {
  memoTests: Paginated<MemoTest>;
};

export type CREATE_MEMOTEST_TYPE = {
  createMemoTest: Paginated<MemoTest>;
};

export const GET_MEMOTESTS_PAGINATED = gql`
  query GET_MEMOTESTS_PAGINATED($sessionId: ID!, $page: Int!, $perPage: Int!) {
    memoTests(page: $page, first: $perPage) {
      paginatorInfo {
        total
        perPage
        currentPage
      }
      data {
        id
        name
        image_urls
        high_score(sessionId: $sessionId)
      }
    }
  }
`;

export const CREATE_MEMOTEST = gql`
  mutation CREATE_MEMOTEST($name: String!, $images: [String!]!) {
    createMemoTest(name: $name, image_urls: $images) {
      id
      name
      image_urls
    }
  }
`;
