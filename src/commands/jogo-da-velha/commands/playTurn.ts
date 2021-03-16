import { Contact, Message } from 'whatsapp-web.js';
import { IBoardKeys, IPlayerProps } from '../../../types';
import { markBoard, printBoard } from '../components/board';
import { checkTie, checkWin, validateMove } from '../components/checks';
import { handlePlayerAtList, playerList } from '../components/playerList';
import reset from './reset';
import { isInProgress } from './start';

let currentPlayer = '';

const changeTurn = ({ id }: IPlayerProps, msg: Message) => {
  const nextPlayer = playerList.findIndex(player => player.id !== id);
  currentPlayer = playerList[nextPlayer].id;
  printBoard(playerList[nextPlayer], msg);
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
): void => {
  if (!isInProgress) {
    msg.reply(`🤖 O jogo ainda não começou`);
    return;
  }

  const player = handlePlayerAtList(contact);

  if (currentPlayer !== player.id) {
    msg.reply('🤖 Não é sua vez');
    return;
  }

  if (validateMove(position)) {
    markBoard(position, player);
    if (checkWin(player)) {
      msg.reply(`🎉 Parabéns ${player.name} você venceu`);
      reset();
      return;
    }

    if (checkTie()) {
      msg.reply(`👵 Deu velha`);
      reset();
      return;
    }
  } else {
    msg.reply(`❌ Movimento inválido, tente novamente.`);
    return;
  }

  changeTurn(player, msg);
};

export { playTurn, resetTurn, setCurrentPlayer };
