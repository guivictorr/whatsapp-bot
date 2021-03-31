import { Message } from 'whatsapp-web.js';
import { resetBoard } from '../components/board';
import { playerList, resetPlayerList } from '../components/playerList';
import { resetTurn } from './playTurn';
import { resetProgress } from './start';

const reset = (msg: Message): Promise<Message> => {
  resetProgress();
  resetTurn();
  resetPlayerList();
  resetBoard();
  return msg.reply(
    `🤖 O jogo foi resetado\n\n${playerList.length} de 2 players`,
  );
};

export default reset;
