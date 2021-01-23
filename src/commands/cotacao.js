const { getEconomyData } = require('../utils/getData');

module.exports = async (msg, args) => {
  const data = await getEconomyData();

  const type = currency => {
    return `\n *${currency.name} (${currency.code})* \nValor atual: R$ ${currency.bid} \nValor mais alto: R$ ${currency.high} \nValor mais baixo: R$ ${currency.low}\n`;
  };

  const message = `Cotação atual: \n${type(data.USD)} ${type(data.EUR)} ${type(
    data.BTC,
  )}`;

  msg.reply(message);
};
