import { IBoardKeys, IPlayerProps } from '../../../types';
import { board } from './board';

const winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const validateMove = (position: IBoardKeys): boolean => {
  return board[position] === '⬜';
};

const checkWin = ({ symbol }: IPlayerProps): boolean => {
  let markCount: number;

  for (const combination of winCombinations) {
    markCount = 0;
    for (const position of combination) {
      if (board[position as IBoardKeys] === symbol) {
        markCount++;
      }

      if (markCount === 3) {
        return true;
      }
    }
  }

  return false;
};

const checkTie = (): boolean => {
  const boardKeys = Object.keys(board);

  for (const key of boardKeys) {
    const newKey = Number(key) as IBoardKeys;

    if (board[newKey] === '⬜') {
      return false;
    }
  }

  return true;
};

export { validateMove, checkTie, checkWin };
