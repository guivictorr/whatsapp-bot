import { Message, MessageMedia } from 'whatsapp-web.js';
import { encode } from 'node-base64-image';

const perfil = async (msg: Message): Promise<void> => {
  const chat = await msg.getChat();
  const [contact] = await msg.getMentions();

  if (!chat.isGroup) {
    msg.reply('🤖 Comando apenas para grupos.');
    return;
  }

  if (!contact) {
    msg.reply('🤖 Contato não localizado...');
    return;
  }

  const photoURL = await contact.getProfilePicUrl();

  if (!photoURL) {
    msg.reply('🤖 Foto não localizada...');
    return;
  }

  const image = String(await encode(photoURL, { string: true }));
  const media = new MessageMedia('image/png', image, `${contact.number}.png`);

  const about = await contact.getAbout();
  const message = `Perfil do *${contact.pushname}*\n\n📱Número: ${
    contact.number
  }\n💭Status: ${about ?? 'Sem Status'}`;

  msg.reply(message, chat.id._serialized, { media });
};

export default perfil;
