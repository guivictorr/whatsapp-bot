import axios from 'axios';
import { Message } from 'whatsapp-web.js';

import { formatDate, formatNumbers } from '../../utils/formatters';

type ICovidData = {
  cases: number;
  deaths: number;
  refuses: number;
  state: string;
  datetime: string;
  error: string;
};

const covid = async (msg: Message, args: string[]): Promise<Message> => {
  const uf = args[0];
  const url = `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${uf}`;
  const { data } = await axios.get<ICovidData>(url);

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
