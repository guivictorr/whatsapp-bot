import { Message } from 'whatsapp-web.js';

const finishgame = async (msg: Message): Promise<void | Message> => {
  console.log(msg);
};

export default finishgame;
