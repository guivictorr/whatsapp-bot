import { Message } from 'whatsapp-web.js';
import { IBoardKeys, IPlayerProps } from '../../../types';

const board = {
  1: '⬜',
  2: '⬜',
  3: '⬜',
  4: '⬜',
  5: '⬜',
  6: '⬜',
  7: '⬜',
  8: '⬜',
  9: '⬜',
};

const printBoard = (
  { name, symbol }: IPlayerProps,
  msg: Message,
): Promise<Message> => {
  return msg.reply(
    `Agora é sua vez *${name}* (${symbol})\n\n${board[1]}${board[2]}${board[3]}\n${board[4]}${board[5]}${board[6]}\n${board[7]}${board[8]}${board[9]}\n`,
  );
};

const markBoard = (position: IBoardKeys, { symbol }: IPlayerProps): void => {
  board[position] = symbol;
};

const resetBoard = (): void => {
  const resetedBoard = {
    1: '⬜',
    2: '⬜',
    3: '⬜',
    4: '⬜',
    5: '⬜',
    6: '⬜',
    7: '⬜',
    8: '⬜',
    9: '⬜',
  };

  Object.assign(board, resetedBoard);
};

export { printBoard, markBoard, board, resetBoard };
