const axios = require('axios').default;

const getEconomyData = async sufix => {
  const response = await axios.get(
    `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${sufix}`,
  );
  const data = await response.data;
  return data;
};

module.exports = getEconomyData;
