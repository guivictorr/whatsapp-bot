import { Message } from 'whatsapp-web.js';

const xinga = (msg: Message, args: string[]): void => {
  const sufix = args.toString().replace(/,/g, ' ');
  const message = `Vai toma no seu cu *${sufix}*`;

  msg.reply(message);
};

export default xinga;
