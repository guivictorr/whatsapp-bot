import cotacao from './cotacao';
import eununca from './eununca';
import covid from './covid';
import perfil from './perfil';
import ban from './ban';
import membros from './membros';
import figurinha from './figurinha';
import velha from './jogo-da-velha';

import { Message } from 'whatsapp-web.js';
import config from '../config/config.json';

type ICommands = keyof typeof commands;

const commands = {
  cotacao,
  eununca,
  covid,
  perfil,
  ban,
  velha,
  figurinha,
  membros,
};

const commandHandler = (msg: Message): void => {
  const { prefix } = config;
  const message = msg.body;
  if (!message.startsWith(config.prefix)) return;

  const args = message.slice(prefix.length).trim().split(/ +/);
  const command = args[0].toLowerCase() as ICommands;
  const hasCommand = Object.keys(commands).includes(command);

  if (!hasCommand) return;

  args.shift();
  commands[command](msg, args);
};

export default commandHandler;
