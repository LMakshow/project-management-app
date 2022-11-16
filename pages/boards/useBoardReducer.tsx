import { BoardAction, BoardActionTypes, BoardState, INITIAL_STATE } from './BoardContext';
import { Dispatch, useReducer } from 'react';

const useBoardReducer: () => {
  state: BoardState;
  dispatchState: Dispatch<BoardAction>;
} = () => {
  const boardReducer: (currentState: BoardState, action: BoardAction) => BoardState = (
    currentState: BoardState,
    action: BoardAction
  ) => {
    const {
      ADD_BOARD,
    } = BoardActionTypes;

    switch (action.type) {
      case ADD_BOARD:
        return {
          ...currentState,
          boards: [...currentState.boards, action.payload],
        };
      default:
        return currentState;
    }
  };

  const [state, dispatchState] = useReducer(boardReducer, INITIAL_STATE);

  return {
    state,
    dispatchState,
  };
};

export default useBoardReducer;
