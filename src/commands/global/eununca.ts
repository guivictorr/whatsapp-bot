import { Message } from 'whatsapp-web.js';

import rand from '../../utils/rand';
import questions from '../../data/questions.json';

export type IQuestionsKeys = keyof typeof questions;

const euNunca = (msg: Message): Promise<Message> => {
  const randomNumber = String(rand(0, 761)) as IQuestionsKeys;

  const message = `🤖 ${questions[randomNumber]}`;
  return msg.reply(message);
};

export default euNunca;
