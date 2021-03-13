import { Message, GroupParticipant, GroupChat } from 'whatsapp-web.js';

const ban = async (msg: Message): Promise<void> => {
  const chat = (await msg.getChat()) as GroupChat;
  const memberList: GroupParticipant[] = chat.participants;

  const [bannedUser] = await msg.getMentions();
  const msgContact = await msg.getContact();

  if (!chat.isGroup) {
    msg.reply('🤖 Comando apenas para grupos.');
    return;
  }

  if (!bannedUser) {
    msg.reply('🤖 Usuário não localizado...');
    return;
  }

  const userIndex: number = memberList.findIndex(
    (participant: GroupParticipant) =>
      participant.id.user === msgContact.id.user,
  );

  const isAdmin: boolean = memberList[userIndex].isAdmin;

  if (!isAdmin) {
    msg.reply('🤖 Só admin pode utilizar o comando...');
    return;
  }

  await chat.removeParticipants([bannedUser.id._serialized]);
};

export default ban;
