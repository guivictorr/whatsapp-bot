import { Message } from 'whatsapp-web.js';
import { ICurrencyProps, IDataProps } from '../types';
import getData from '../utils/getData';
import formatNumber from '../utils/formatNumber';

const cotacao = async (msg: Message): Promise<void> => {
  const url =
    'https://economia.awesomeapi.com.br/json/all/USD-BRL,EUR-BRL,BTC-BRL';

  const data = await getData<IDataProps>(url);

  const type = (currency: ICurrencyProps) => {
    const { name, code, bid, high, low } = currency;

    return `\n *${name} (${code})* \nValor atual: R$ ${formatNumber(
      bid,
    )} \nValor mais alto: R$ ${formatNumber(
      high,
    )} \nValor mais baixo: R$ ${formatNumber(low)}\n`;
  };

  const message = `Cotação atual: \n${type(data.USD)} ${type(data.EUR)} ${type(
    data.BTC,
  )}`;

  msg.reply(message);
};

export default cotacao;
