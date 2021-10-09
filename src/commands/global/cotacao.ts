import { Message } from 'whatsapp-web.js';

import getData from '../../utils/getData';
import formatNumbers from '../../utils/formatNumbers';
import formatDate from '../../utils/formatDate';

type ICurrencyProps = {
  name: string;
  code: string;
  bid: number;
  high: number;
  low: number;
  create_date: string;
};

type IDataProps = {
  USD: ICurrencyProps;
  EUR: ICurrencyProps;
  BTC: ICurrencyProps;
};

const cotacao = async (msg: Message): Promise<Message> => {
  const url =
    'https://economia.awesomeapi.com.br/json/all/USD-BRL,EUR-BRL,BTC-BRL';

  const data = await getData<IDataProps>(url);

  const message = `Cotação atual: \n${type(data.USD)} ${type(data.EUR)} ${type(
    data.BTC,
  )}`;

  return msg.reply(message);
};

const type = ({ bid, code, create_date, high, low, name }: ICurrencyProps) => {
  const formatedDate = formatDate(create_date);
  const [formatedBid, formatedHigh, formatedLow] = formatNumbers([
    bid,
    high,
    low,
  ]);

  const message = `\n 💸*${name} (${code})* \nValor atual: R$ ${formatedBid} \nValor mais alto: R$ ${formatedHigh} \nValor mais baixo: R$ ${formatedLow}\n\n📅Data: ${formatedDate}`;

  return message;
};

export default cotacao;
