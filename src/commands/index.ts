import { Message } from 'whatsapp-web.js';
import path from 'path';

import getCommand from '../utils/get-command';
import sanitize from '../utils/sanitize';

const commandHandler = async (msg: Message): Promise<Message | void> => {
  const prefix = process.env.PREFIX as string;
  if (!msg.body.startsWith(prefix)) return;

  const { isGroup } = await msg.getChat();
  const { args, command } = sanitize(msg.body);

  const startPath = path.join(__dirname);
  const commandData = getCommand(startPath, command);

  if (commandData === null) {
    return msg.reply('🤖 Esse comando não existe meu chapa!');
  }

  const exec = await import(commandData.commandPath);

  if (commandData.categoryName === 'group' && !isGroup) {
    return msg.reply('🤖 Comando apenas para grupos');
  }

  exec.default(msg, args);
};

export default commandHandler;
