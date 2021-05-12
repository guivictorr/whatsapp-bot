import { ContactId, GroupParticipant } from 'whatsapp-web.js';

const isAdmin = (id: ContactId, members: GroupParticipant[]): boolean => {
  const userIndex = members.findIndex(
    (participant: GroupParticipant) => participant.id.user === id.user,
  );

  const isAdmin = members[userIndex].isAdmin;

  return isAdmin;
};

export default isAdmin;
