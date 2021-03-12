import cotacao from './cotacao';
import xinga from './xinga';
import eununca from './eununca';
import covid from './covid';

import { Message } from 'whatsapp-web.js';

const commands = {
  cotacao,
  xinga,
  eununca,
  covid,
};

const commandHandler = (msg: Message): void => {
  const msgBody = msg.body;
  const tokens = msgBody.split(' ');
  let command = tokens.shift();

  if (!command) {
    return;
  }

  if (command.startsWith('!')) {
    command = command.substring(1);
    commands[command](msg, tokens);
  }
};

export default commandHandler;
