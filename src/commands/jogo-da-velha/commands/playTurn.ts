import { Contact, Message } from 'whatsapp-web.js';
import { IBoardKeys, IPlayerProps } from '../../../types';
import { markBoard, printBoard } from '../components/board';
import { checkTie, checkWin, validateMove } from '../components/checks';
import { handlePlayerAtList, playerList } from '../components/playerList';
import reset from './reset';
import { isInProgress } from './start';

let currentPlayer = '';

const changeTurn = ({ id }: IPlayerProps, msg: Message): Promise<Message> => {
  const nextPlayer = playerList.findIndex(player => player.id !== id);
  currentPlayer = playerList[nextPlayer].id;
  return printBoard(playerList[nextPlayer], msg);
};

const setCurrentPlayer = (id: string): void => {
  currentPlayer = id;
};

const resetTurn = (): void => {
  currentPlayer = '';
};

const playTurn = (
  contact: Contact,
  position: IBoardKeys,
  msg: Message,
): Promise<Message> => {
  if (!isInProgress) {
    return msg.reply(`🤖 O jogo ainda não começou`);
  }

  const player = handlePlayerAtList(contact);

  if (currentPlayer !== player.id) {
    return msg.reply('🤖 Não é sua vez');
  }

  if (validateMove(position)) {
    markBoard(position, player);
    if (checkWin(player)) {
      msg.reply(`🎉 Parabéns ${player.name} você venceu`);
      return reset(msg);
    }

    if (checkTie()) {
      msg.reply(`👵 Deu velha`);
      return reset(msg);
    }
  } else {
    return msg.reply(`❌ Movimento inválido, tente novamente.`);
  }

  return changeTurn(player, msg);
};

export { playTurn, resetTurn, setCurrentPlayer };
