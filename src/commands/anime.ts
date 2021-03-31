import { encode } from 'node-base64-image';
import { Message, MessageMedia } from 'whatsapp-web.js';
import { IAnimeData } from '../types';
import formatDate from '../utils/formatDate';
import getData from '../utils/getData';

type IDataResults = {
  results: IAnimeData[];
};

const anime = async (msg: Message, args: string[]): Promise<Message> => {
  const animeName = args[1];
  const { id } = await msg.getChat();

  if (!animeName) {
    return msg.reply(`🤖 Não encontrei esse anime...`);
  }

  const { results } = await getData<IDataResults>(
    `https://api.jikan.moe/v3/search/anime?q=${animeName}`,
  );

  if (!results[0]) {
    return msg.reply(`🤖 Não encontrei esse anime...`);
  }

  const { image_url, title, episodes, url, start_date } = results[0];

  const image = String(await encode(image_url, { string: true }));
  const media = new MessageMedia('image/png', image, `${title}.png`);

  return msg.reply(
    `Nome: ${title}\nEpisódios: ${episodes}\n\nLançamento: ${formatDate(
      start_date,
    )}\n\nMais sobre: ${url}`,
    id._serialized,
    { media },
  );
};

export default anime;
