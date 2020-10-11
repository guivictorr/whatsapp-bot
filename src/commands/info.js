const getCovidData = require('../utils/getCovidData');
const formatNumber = require('../utils/formatNumber');
const formatDate = require('../utils/formatDate');

const info = async msg => {
  try {
    if (msg.body.startsWith('!covid')) {
      const sufix = await msg.body.split('!covid')[1].trim();
      const data = await getCovidData(sufix);

      const { cases, deaths, refuses, state, datetime } = data;

      msg.reply(
        `*${state}:* \nCasos: ${formatNumber(cases)} \nMortes: ${formatNumber(
          deaths,
        )}\nRecuperados: ${formatNumber(refuses)} \nData: ${formatDate(
          datetime,
        )}`,
      );
      return;
    }
  } catch (err) {
    msg.reply('Bota o código do estado direito *seu jegue*');
  }
};

module.exports = info;
