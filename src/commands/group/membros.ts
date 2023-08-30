import { GroupChat, GroupParticipant, Message } from 'whatsapp-web.js';
import client from '../../server';

const membros = async (msg: Message): Promise<Message> => {
  const chat = (await msg.getChat()) as GroupChat;

  const memberList: GroupParticipant[] = chat.participants;
  let message = '';

  for (const member of memberList) {
    const { id } = member;
    const { pushname } = await client.getContactById(id._serialized);
    const botName = process.env.BOT_NAME as string;
    message += `${pushname || botName}\n`;
  }

  return msg.reply(message);
};

export default membros;
