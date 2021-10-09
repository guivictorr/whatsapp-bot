import { ClientSession, Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import fs from 'fs';
import path from 'path';

import config from './config/config.json';

const sessionFile = path.resolve('src', 'data', 'session.json');

const sessionData = fs.existsSync(sessionFile) ? require(sessionFile) : null;

const client = new Client({
  session: sessionData,
  ffmpegPath: 'FFMPEG PATH HERE',
});

client.on('qr', (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session: ClientSession) => {
  fs.writeFile(
    sessionFile,
    JSON.stringify(session),
    (err: string | unknown) => {
      if (err) console.log(err);
    },
  );
});

client.on('ready', () => {
  console.log(config.buildMessage);
});

client.initialize();

export default client;
