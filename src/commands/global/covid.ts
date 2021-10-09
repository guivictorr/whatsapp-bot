import { Message } from 'whatsapp-web.js';

import { ICovidData } from '../../types';

import getData from '../../utils/getData';
import formatDate from '../../utils/formatDate';
import formatNumbers from '../../utils/formatNumbers';

const covid = async (msg: Message, args: string[]): Promise<Message> => {
  const uf = args[0];
  const url = `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${uf}`;
  const data = await getData<ICovidData>(url);

  if (data.error) {
    return msg.reply(
      '🤖 Algo deu errado, veja se digitou o comando certo...\nEx: *!covid sp*',
    );
  }

  const message = formatMessage(data);

  return msg.reply(message);
};

const formatMessage = ({
  cases,
  datetime,
  deaths,
  refuses,
  state,
}: ICovidData) => {
  const formatedDate = formatDate(datetime);
  const [formatedCases, formatedDeaths, formatedRefuses] = formatNumbers([
    cases,
    deaths,
    refuses,
  ]);

  const message = `*${state}:* \n🦠Casos: ${formatedCases} \n⚰Mortes: ${formatedDeaths}\n💚Recuperados: ${formatedRefuses} \n📅Data: ${formatedDate}`;
  return message;
};

export default covid;
