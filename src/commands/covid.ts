import { Message } from 'whatsapp-web.js';
import { ICovidData } from '../types';
import getData from '../utils/getData';
import formatDate from '../utils/formatDate';
import formatNumber from '../utils/formatNumber';

const covid = async (msg: Message, args: string[]): Promise<Message> => {
  const sufix = args[1];
  const url = `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${sufix}`;
  const data = await getData<ICovidData>(url);

  if (data.error) {
    return msg.reply(
      'Coopera com o desenvolvedor e usa o comando direito.\n\nO certo é: *!covid uf*',
    );
  }

  const { cases, deaths, refuses, state, datetime } = data;

  const message = `*${state}:* \n🦠Casos: ${formatNumber(
    cases,
  )} \n⚰Mortes: ${formatNumber(deaths)}\n💚Recuperados: ${formatNumber(
    refuses,
  )} \n📅Data: ${formatDate(datetime)}`;

  return msg.reply(message);
};

export default covid;
