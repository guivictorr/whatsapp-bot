import { Message } from 'whatsapp-web.js';
import path from 'node:path';
import fs from 'node:fs';
import { BotException } from './error';

const commandHandler = async (msg: Message): Promise<Message | void> => {
  const prefix = process.env.PREFIX as string;
  if (!msg.body.startsWith(prefix)) return;

  const { command, args } = sanitize(msg.body);

  if (!command) {
    return msg.reply('🤖 Esse comando não existe meu chapa!');
  }

  const { path } = findCommandPath(command);

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

function findCommandPath(command: string): { path: string } {
  let startPath = path.join(__dirname, './commands');
  const files = fs.readdirSync(startPath);

  for (const file of files) {
    const filePath = path.resolve(startPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      startPath = filePath;
      const foundInfo = findCommandPath(command);
      if (foundInfo) {
        return foundInfo;
      }
    } else {
      const fileNameWithoutExtension = path.parse(file).name;
      if (command.includes(fileNameWithoutExtension)) {
        // const category = path.basename(path.dirname(filePath));
        return { path: filePath };
      }
    }
  }

  return { path: '' };
}

function sanitize(msg: string) {
  const prefix = process.env.PREFIX as string;
  // !command arg1;arg 2;arg3
  const [command, ...args] = msg.split(' ');
  const sanitizedCommand = command.replace(prefix, '');
  const splittedArgs = args.join(' ').split(';');

  if (!sanitizedCommand) {
    return { args: [], command: '' };
  }

  return { args: splittedArgs, command: sanitizedCommand };
}

export default commandHandler;
