import { Message } from 'whatsapp-web.js';
import fs from 'fs';

import { prefix } from '../config/config.json';
import getCommand from '../utils/getCommand';
import sanitize from '../utils/sanitize';

const commandHandler = async (msg: Message): Promise<Message | void> => {
  if (!msg.body.startsWith(prefix)) return;

  const { isGroup } = await msg.getChat();
  const { args, command } = sanitize(msg.body);
  const { path, isGroupCommand } = getCommand(command);

  if (!fs.existsSync(path)) return;

  const exec = await import(path);

  if (isGroupCommand && isGroup) {
    return exec.default(msg, args);
  } else if (isGroupCommand && !isGroup) {
    return msg.reply('🤖 Comando apenas para grupos');
  }

  exec.default(msg, args);
};

export default commandHandler;
