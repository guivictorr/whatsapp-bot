import { GroupChat, GroupParticipant, Message } from 'whatsapp-web.js';

const isAdmin = async (msg: Message): Promise<boolean> => {
  const { participants } = (await msg.getChat()) as GroupChat;
  const { id } = await msg.getContact();

  const userIndex = participants.findIndex(
    (participant: GroupParticipant) =>
      participant.id._serialized === id._serialized,
  );

  const isAdmin = participants[userIndex].isAdmin;

  return isAdmin;
};

export default isAdmin;
