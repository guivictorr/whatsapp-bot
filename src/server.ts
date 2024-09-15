import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import commandHandler from './commands';

const client = new Client({
  authStrategy: new LocalAuth(),
  ffmpegPath: process.env.FFMPAG_PATH,
});

client.on('qr', (qr: string) => {
  qrcode.generate(qr, { small: true });
});
client.on('ready', () => {
  console.log('🎊 Client is ready!');
});
client.on('disconnected', () => {
  console.log('🤖 Turning off the lights');
});

client.on('message_create', commandHandler);

client.initialize();

export default client;
