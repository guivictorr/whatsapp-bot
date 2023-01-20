import path from 'path';
import fs from 'fs';

type IGetCommand = {
  isGroupCommand: boolean;
  path: string;
};

const getCommand = (command: string): IGetCommand => {
  const fileExtension = __filename.slice(-2);
  const dirName = __dirname.split('/');
  const currentFolder = dirName[dirName.length - 2];

  const globalPath = path.resolve(
    currentFolder,
    'commands',
    'global',
    `${command}.${fileExtension}`,
  );
  const groupPath = path.resolve(
    currentFolder,
    'commands',
    'group',
    `${command}.${fileExtension}`,
  );

  const commandData = fs.existsSync(globalPath)
    ? { isGroupCommand: false, path: globalPath }
    : { isGroupCommand: true, path: groupPath };

  return commandData;
};

export default getCommand;
