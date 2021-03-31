import { Message } from 'whatsapp-web.js';
import { IBoardKeys } from '../../types';

import enter from './commands/enter';
import reset from './commands/reset';
import { start } from './commands/start';
import { playTurn } from './commands/playTurn';

const velha = async (msg: Message, args: string[]): Promise<Message> => {
  const sufix = args[1];
  const position = Number(args[2]) as IBoardKeys;
  const contact = await msg.getContact();

  switch (sufix) {
    case 'entrar':
      return enter(contact, msg);
    case 'começar':
      return start(msg);
    case 'jogar':
      return playTurn(contact, position, msg);
    case 'resetar':
      return reset(msg);
    default:
      return msg.reply(
        '🤖 Algo ta errado...\n\n📝Lista de comandos:\n!velha entrar\n!velha começar\n!velha jogar 1-9\n!velha resetar',
      );
  }
};

export default velha;
