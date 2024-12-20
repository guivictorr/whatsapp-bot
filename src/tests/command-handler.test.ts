import { Message, MessageContent } from 'whatsapp-web.js';
import commandHandler from '../command-handler';

export const createMockMessage = (body: string): Partial<Message> => ({
  body,
  reply: jest.fn(async (content: MessageContent) => {
    // Return a new mock message as the reply
    return createMockMessage(
      typeof content === 'string' ? content : 'mock reply',
    ) as Message;
  }),
});

describe('commandHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return a message if the command does not exist', async () => {
    const message = createMockMessage('!command');
    const result = await commandHandler(message as Message);
    expect(result.body).toBe('🤖 Esse comando não existe meu chapa!');
  });

  // Idk how i'm going to test this, I need to mock the commands folder with a fake command maybe.
  it.skip('should execute the command if the file exist', async () => {
    const message = createMockMessage('!command');
    const result = await commandHandler(message as Message);
    expect(result.body).toBe('Hello World');
  });
});
