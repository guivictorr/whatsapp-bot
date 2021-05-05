import cotacao from './cotacao';
import eununca from './eununca';
import covid from './covid';
import perfil from './perfil';
import ban from './ban';
import figurinha from './figurinha';
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
  figurinha,
};

const commandHandler = (msg: Message): void => {
  const prefix = '!';
  const message = msg.body;
  if (!message.startsWith(prefix)) return;

  const args = message.slice(prefix.length).trim().split(/ +/);
  const command = args[0].toLowerCase() as ICommands;
  const hasCommand = Object.keys(commands).includes(command);

  if (!hasCommand) return;

  args.shift();
  commands[command](msg, args);
};

export default commandHandler;
