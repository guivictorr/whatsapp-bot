import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

import config from './config/config.json';

const client = new Client({
  authStrategy: new LocalAuth(),
  ffmpegPath: 'FFMPEG PATH HERE',
});

client.on('qr', (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log(config.buildMessage);
});

client.initialize();

export default client;
