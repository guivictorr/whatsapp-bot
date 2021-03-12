import { Message } from 'whatsapp-web.js';
import { ICovidData } from '../types';
import getData from '../utils/getData';

const covid = async (msg: Message, args: string[]): Promise<void> => {
  const sufix = args[0];
  const url = `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${sufix}`;
  const data = await getData<ICovidData>(url);

  if (data.error) {
    msg.reply(
      'Coopera com o desenvolvedor e usa o comando direito.\n\nO certo é: *!covid uf*',
    );
    return;
  }

  const { cases, deaths, refuses, state, datetime } = data;

  const message = `*${state}:* \n🦠Casos: ${cases} \n⚰Mortes: ${deaths}\n💚Recuperados: ${refuses} \n📅Data: ${datetime}`;

  msg.reply(message);
};

export default covid;
