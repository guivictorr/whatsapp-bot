const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('pt-br').format(num);
};

export default formatNumber;
