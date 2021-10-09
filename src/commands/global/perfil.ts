import { Message } from 'whatsapp-web.js';
import sendProfile from '../../utils/sendProfile';

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
