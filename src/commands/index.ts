import cotacao from './cotacao';
import eununca from './eununca';
import covid from './covid';
import perfil from './perfil';
import ban from './ban';
import velha from './jogo-da-velha';

import { Message } from 'whatsapp-web.js';

type ICommands = keyof typeof commands;

const commands = {
  cotacao,
  eununca,
  covid,
  perfil,
  ban,
  velha,
};

const commandHandler = (msg: Message): void => {
  const msgBody = msg.body;
  const tokens = msgBody.split(' ');

  if (tokens[0].startsWith('!')) {
    const command = tokens[0].substring(1) as ICommands;
    commands[command](msg, tokens);
  }
};

export default commandHandler;
