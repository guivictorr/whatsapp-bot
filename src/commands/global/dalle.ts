import { Message, MessageMedia } from 'whatsapp-web.js';
import { openai } from '../../lib/openai';

const gpt = async (msg: Message, args: string[]): Promise<void> => {
  try {
    const response = await openai.createImage({
      prompt: args.join(' '),
      n: 1,
      size: '1024x1024',
    });

    const image = await MessageMedia.fromUrl(response.data.data[0].url ?? '', {
      unsafeMime: true,
    });

    msg.reply(image, undefined, {
      media: image,
    });
  } catch (e: any) {
    msg.reply(`❌ OpenAI Response Error: ${e.response.data.error.message}`);
  }
};

export default gpt;
