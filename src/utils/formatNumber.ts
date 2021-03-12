const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('pt-br', { maximumFractionDigits: 2 }).format(
    num,
  );
};

export default formatNumber;
