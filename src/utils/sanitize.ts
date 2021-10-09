import { prefix } from '../config/config.json';

type ISanitize = {
  args: string[];
  command: string;
};

const sanitize = (msg: string): ISanitize => {
  const args = msg.slice(prefix.length).trim().split(/ +/);
  const command = args.splice(0, 1).toString().toLowerCase();

  return { args, command };
};

export default sanitize;
