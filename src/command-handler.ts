import { Message } from 'whatsapp-web.js';
import path from 'node:path';
import fs from 'node:fs';
import { BotException } from './error';

const commandHandler = async (msg: Message): Promise<Message | void> => {
  const { command, args } = sanitize(msg.body);

  const { path } = findCommandPath(command);

  if (!path) {
    return msg.reply('🤖 Esse comando não existe meu chapa!');
  }

  const exec = await import(path);

  try {
    await exec.default(msg, args);
  } catch (error) {
    if (error instanceof BotException) {
      return msg.reply(error.message);
    }

    return msg.reply('🤖 Ocorreu um problema, tente novamente.');
  }
};

export function findCommandPath(
  command: string,
  startPath?: string,
): { path: string } {
  const currentPath = startPath || path.join(__dirname, './commands');
  const files = fs.readdirSync(currentPath, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.resolve(currentPath, file.name);

    if (file.isDirectory()) {
      const foundInfo = findCommandPath(command, filePath);
      if (foundInfo.path !== '') {
        return foundInfo;
      }
    } else {
      const fileNameWithoutExtension = path.parse(file.name).name;
      if (command === fileNameWithoutExtension) {
        return { path: filePath };
      }
    }
  }

  return { path: '' };
}

export function sanitize(msg: string) {
  const prefix = process.env.PREFIX as string;
  if (!msg.startsWith(prefix)) return { args: [], command: '' };
  // !command arg1;arg 2;arg3
  const [command, ...args] = msg.split(' ');
  const sanitizedCommand = command.replace(prefix, '');
  const splittedArgs = args
    .join(' ')
    .split(';')
    .filter(arg => arg.length > 0);

  if (!sanitizedCommand) {
    return { args: [], command: '' };
  }

  return { args: splittedArgs, command: sanitizedCommand };
}

export default commandHandler;
