const formatDate = date => {
  const formatedDate = new Date(date).toLocaleDateString('pt-br');
  return formatedDate;
};

module.exports = formatDate;
