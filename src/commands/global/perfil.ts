import { encode } from 'node-base64-image';
import { ChatId, Contact, Message, MessageMedia } from 'whatsapp-web.js';
import client from '../../server';

const sendProfile = async (contact: Contact, id: ChatId): Promise<Message> => {
  const about = await contact.getAbout();
  const contactName = contact.pushname;
  const contactNumber = contact.number;
  const photoURL = await contact.getProfilePicUrl();

  const message = `Perfil do *${contactName}*\n\n📱Número: ${contactNumber}\n💭Status: ${
    about ?? 'Sem Status'
  }`;

  if (!photoURL) {
    return client.sendMessage(id._serialized, message);
  }

  const image = String(await encode(photoURL, { string: true }));
  const media = new MessageMedia('image/png', image, `${contact.number}.png`);
  return client.sendMessage(id._serialized, message, { media });
};

const perfil = async (msg: Message): Promise<Message> => {
  const { id } = await msg.getChat();
  const sender = await msg.getContact();
  const [mention] = await msg.getMentions();

  if (!mention) {
    return sendProfile(sender, id);
  }

  return sendProfile(mention, id);
};

export default perfil;
