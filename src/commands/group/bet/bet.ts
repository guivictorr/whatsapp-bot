import { Message } from 'whatsapp-web.js';

const bet = async (msg: Message): Promise<void | Message> => {
  console.log(msg);
};

export default bet;
