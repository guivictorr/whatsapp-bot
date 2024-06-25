import { Client, LocalAuth } from 'whatsapp-web.js';
import dotenv from 'dotenv';
import qrcode from 'qrcode-terminal';
import { prisma } from './lib/prisma';

dotenv.config();

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
  prisma.$disconnect();
  console.log('🤖 Turning off the lights');
});

client.initialize();

export default client;
