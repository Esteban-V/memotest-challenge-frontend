import { gql } from '@apollo/client';
import { Session } from '../types';

export type CREATE_SESSION_TYPE = {
  createSession: Session;
};

export const CREATE_SESSION = gql`
  mutation CREATE_SESSION {
    createSession {
      id
    }
  }
`;