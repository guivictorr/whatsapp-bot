import path from 'path';
import fs from 'fs';

type IGetCommand = {
  isGroupCommand: boolean;
  path: string;
};

const getCommand = (command: string): IGetCommand => {
  const globalPath = path.resolve('src', 'commands', 'global', `${command}.ts`);
  const groupPath = path.resolve('src', 'commands', 'group', `${command}.ts`);

  const commandData = fs.existsSync(globalPath)
    ? { isGroupCommand: false, path: globalPath }
    : { isGroupCommand: true, path: groupPath };

  return commandData;
};

export default getCommand;
