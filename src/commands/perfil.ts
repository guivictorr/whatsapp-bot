import { Contact, Message, MessageMedia } from 'whatsapp-web.js';
import { encode } from 'node-base64-image';

const sendProfile = async (
  contact: Contact,
  msg: Message,
): Promise<Message> => {
  const chat = await msg.getChat();

  const photoURL = await contact.getProfilePicUrl();

  if (!photoURL) {
    return msg.reply('🤖 Foto não localizada...');
  }

  const image = String(await encode(photoURL, { string: true }));
  const media = new MessageMedia('image/png', image, `${contact.number}.png`);

  const about = await contact.getAbout();
  const message = `Perfil do *${contact.pushname}*\n\n📱Número: ${
    contact.number
  }\n💭Status: ${about ?? 'Sem Status'}`;

  return msg.reply(message, chat.id._serialized, { media });
};

const perfil = async (msg: Message): Promise<Message> => {
  const sender = await msg.getContact();
  const [mention] = await msg.getMentions();

  if (!mention) {
    return sendProfile(sender, msg);
  }

  return sendProfile(mention, msg);
};

export default perfil;
