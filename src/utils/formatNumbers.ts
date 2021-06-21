const formatNumbers = (numbers: number[]): string[] => {
  return numbers.map(number =>
    new Intl.NumberFormat('pt-br', { maximumFractionDigits: 2 }).format(number),
  );
};

export default formatNumbers;
