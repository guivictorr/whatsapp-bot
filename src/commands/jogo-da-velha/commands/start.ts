import { Message } from 'whatsapp-web.js';
import { printBoard } from '../components/board';
import { handleRandomPlayer, playerList } from '../components/playerList';
import { setCurrentPlayer } from './playTurn';

let isInProgress = false;

const start = (msg: Message): Promise<Message> => {
  if (playerList.length !== 2) {
    return msg.reply(`🤖 Aguardando... (${playerList.length} de 2)`);
  }

  if (isInProgress) {
    return msg.reply(`🤖 Já temos um jogo em progresso`);
  }

  isInProgress = true;

  const randomPlayer = handleRandomPlayer();
  setCurrentPlayer(randomPlayer.id);
  return printBoard(randomPlayer, msg);
};

const resetProgress = (): void => {
  isInProgress = false;
};

export { start, resetProgress, isInProgress };
