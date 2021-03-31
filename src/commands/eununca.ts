import rand from '../utils/rand';
import questions from '../data/questions.json';

import { Message } from 'whatsapp-web.js';
import { IQuestionsKeys } from '../types';

const euNunca = (msg: Message): Promise<Message> => {
  const randomNumber: IQuestionsKeys = String(rand(0, 761)) as IQuestionsKeys;

  const message = `🤖 ${questions[randomNumber]}`;
  return msg.reply(message);
};

export default euNunca;
