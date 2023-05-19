import { gql } from "@apollo/client";
import { Paginated } from "../types/apollo";
import { MemoTest } from "../types/memotest";

export type GET_MEMOTESTS_PAGINATED = {
    memoTests: Paginated<MemoTest>;
};

export const GET_MEMOTESTS_PAGINATED = gql`
  query GET_MEMOTESTS_PAGINATED($page: Int!) {
    memoTests(page: $page, first: 10) {
      paginatorInfo {
        total
        count
        perPage
      }
      data {
        id
        name
        image_urls
      }
    }
  }
`;
