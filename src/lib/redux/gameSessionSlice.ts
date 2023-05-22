import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameSession } from '../types/memotest';

interface GameState {
  currentSession: GameSession | null;
}

const initialState: GameState = {
  currentSession: null,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameSession: (state, action: PayloadAction<GameSession>) => {
      state.currentSession = action.payload
    },
    clearGameSession: (state) => {
      state.currentSession = null
    },
  },
})

export const { setGameSession, clearGameSession } = gameSlice.actions

export default gameSlice.reducer
