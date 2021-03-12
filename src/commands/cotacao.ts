import { Message } from 'whatsapp-web.js';
import { ICurrencyProps, IDataProps } from '../types';
import getData from '../utils/getData';

const cotacao = async (msg: Message): Promise<void> => {
  const url =
    'https://economia.awesomeapi.com.br/json/all/USD-BRL,EUR-BRL,BTC-BRL';

  const data = await getData<IDataProps>(url);

  const type = (currency: ICurrencyProps) => {
    return `\n *${currency.name} (${currency.code})* \nValor atual: R$ ${currency.bid} \nValor mais alto: R$ ${currency.high} \nValor mais baixo: R$ ${currency.low}\n`;
  };

  const message = `Cotação atual: \n${type(data.USD)} ${type(data.EUR)} ${type(
    data.BTC,
  )}`;

  msg.reply(message);
};

export default cotacao;
