import { Message } from 'whatsapp-web.js';
import { printBoard } from '../components/board';
import { handleRandomPlayer, playerList } from '../components/playerList';
import { setCurrentPlayer } from './playTurn';

let isInProgress = false;

const start = (msg: Message): void => {
  if (playerList.length !== 2) {
    msg.reply(`🤖 Aguardando... (${playerList.length} de 2)`);
    return;
  }

  if (isInProgress) {
    msg.reply(`🤖 Já temos um jogo em progresso`);
    return;
  }

  isInProgress = true;

  const randomPlayer = handleRandomPlayer();
  setCurrentPlayer(randomPlayer.id);
  printBoard(randomPlayer, msg);
};

const resetProgress = (): void => {
  isInProgress = false;
};

export { start, resetProgress, isInProgress };
