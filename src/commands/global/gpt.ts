import { Message } from 'whatsapp-web.js';
import { openai } from '../../lib/openai';

const getDavinciResponse = async (clientText: string) => {
  const options = {
    model: 'text-davinci-003',
    prompt: clientText,
    temperature: 1,
    max_tokens: 4000,
  };

  try {
    const response = await openai.createCompletion(options);
    let botResponse = '';
    response.data.choices.forEach(({ text }) => {
      botResponse += text;
    });
    return `Chat GPT 🤖\n\n ${botResponse.trim()}`;
  } catch (e: any) {
    return `❌ OpenAI Response Error: ${e.response.data.error.message}`;
  }
};

const gpt = async (msg: Message, args: string[]): Promise<Message> => {
  const gptResponse = await getDavinciResponse(args.join(' '));
  return msg.reply(gptResponse);
};

export default gpt;
