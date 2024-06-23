type ISanitize = {
  args: string[];
  command: string;
};

const sanitize = (msg: string): ISanitize => {
  const prefix = process.env.PREFIX as string;
  // !command arg1;arg 2;arg3
  const [command, ...args] = msg.split(' ');
  const sanitizedCommand = command.replace(prefix, '');
  const splittedArgs = args.join(' ').split(';');

  if (!sanitizedCommand) {
    return { args: [], command: '' };
  }

  return { args: splittedArgs, command: sanitizedCommand };
};

export default sanitize;
