const { getCovidData } = require('../utils/getData');
const { formatNumber, formatDate } = require('../utils/utils');

module.exports = async (msg, args) => {
  try {
    const sufix = args[0];
    const data = await getCovidData(sufix);

    const { cases, deaths, refuses, state, datetime } = data;

    const message = `*${state}:* \n🦠Casos: ${formatNumber(
      cases,
    )} \n⚰Mortes: ${formatNumber(deaths)}\n💚Recuperados: ${formatNumber(
      refuses,
    )} \n📅Data: ${formatDate(datetime)}`;

    msg.reply(message);
  } catch (err) {
    msg.reply('Bota o código do estado direito *seu jegue*');
  }
};
