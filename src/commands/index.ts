import { Message } from 'whatsapp-web.js';

import cotacao from './cotacao';
import eununca from './eununca';
import covid from './covid';
import perfil from './perfil';
import ban from './ban';
import membros from './membros';
import figurinha from './figurinha';
import velha from './jogo-da-velha';

import config from '../config/config.json';

type IGroupCommands = keyof typeof groupCommands;
type ICommands = keyof typeof commands;

const commands = {
  cotacao,
  eununca,
  covid,
  perfil,
  velha,
  figurinha,
};

const groupCommands = {
  membros,
  ban,
};

const commandHandler = async (msg: Message): Promise<Message | void> => {
  const { prefix } = config;
  const message = msg.body;
  const { isGroup } = await msg.getChat();
  if (!message.startsWith(config.prefix)) return;

  const args = message.slice(prefix.length).trim().split(/ +/);
  const command = args[0].toLowerCase();

  const isCommand = Object.keys(commands).includes(command);
  const isGroupCommand = Object.keys(groupCommands).includes(command);

  if (!isCommand && !isGroupCommand) return;
  args.shift();

  if (isGroupCommand) {
    return isGroup
      ? groupCommands[command as IGroupCommands](msg)
      : msg.reply('🤖 Comando apenas para grupos.');
  }

  return commands[command as ICommands](msg, args);
};

export default commandHandler;
