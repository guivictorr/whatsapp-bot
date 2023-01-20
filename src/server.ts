import { Client, LocalAuth } from 'whatsapp-web.js';
import dotenv from 'dotenv';
import qrcode from 'qrcode-terminal';

import config from './config/config.json';

dotenv.config();

const client = new Client({
  authStrategy: new LocalAuth(),
  ffmpegPath: process.env.FFMPAG_PATH,
});

client.on('qr', (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log(config.buildMessage);
});

client.initialize();

export default client;
