import { Message } from 'whatsapp-web.js';
import { IBoardKeys } from '../../types';
import { playerList } from './components/playerList';

import enter from './commands/enter';
import reset from './commands/reset';
import { start } from './commands/start';
import { playTurn } from './commands/playTurn';

const velha = async (msg: Message, args: string[]): Promise<void> => {
  const sufix = args[1];
  const position = Number(args[2]) as IBoardKeys;
  const contact = await msg.getContact();

  switch (sufix) {
    case 'entrar':
      enter(contact, msg);
      break;
    case 'começar':
      start(msg);
      break;
    case 'jogar':
      playTurn(contact, position, msg);
      break;
    case 'resetar':
      reset();
      msg.reply(`🤖 O jogo foi resetado\n\n${playerList.length} de 2 players`);
      break;
  }
};

export default velha;
