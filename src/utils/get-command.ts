import path from 'path';
import fs from 'fs';

type GetCommandReturn = {
  categoryName: string;
  commandPath: string;
};

const getCommand = (
  startPath: string,
  command: string,
): GetCommandReturn | null => {
  const files = fs.readdirSync(startPath);

  for (const file of files) {
    const filePath = path.resolve(startPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const foundInfo = getCommand(filePath, command);
      if (foundInfo) {
        return foundInfo;
      }
    } else {
      const fileNameWithoutExtension = path.parse(file).name;
      if (command.includes(fileNameWithoutExtension)) {
        const category = path.basename(path.dirname(filePath));
        return { categoryName: category, commandPath: filePath };
      }
    }
  }

  return null;
};

export default getCommand;
