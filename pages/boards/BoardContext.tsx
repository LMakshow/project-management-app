import { createContext, Dispatch, FC, ReactNode } from 'react';
import Boards from './index';
import useBoardReducer from './useBoardReducer';

export interface Board {
  name: string;
  info: string;
  id?: number;
}

export interface BoardState {
  boards: Board[];
}

export const INITIAL_STATE: BoardState = {
  boards: [],
}

export enum BoardActionTypes {
  ADD_BOARD = 'ADD_BOARD',
}

export interface BoardAction {
  type: BoardActionTypes;
  payload: Board;
}

export interface BoardContext {
  state: BoardState;
  dispatch: Dispatch<BoardAction>;
}

export interface BoardProps {
  children: ReactNode;
}

export const BoardContext = createContext<BoardContext>({
  state: INITIAL_STATE,
  dispatch: () => INITIAL_STATE,
});

export const ContextProvider: FC<BoardProps> = (props) => {
  const { state, dispatchState } = useBoardReducer();

  return (
    <BoardContext.Provider
      value={{
        state: state,
        dispatch: dispatchState,
      }}
    >
      {props.children}
    </BoardContext.Provider>
  );
};