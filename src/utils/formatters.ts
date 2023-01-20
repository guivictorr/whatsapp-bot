export const formatDate = (date: string | number | Date): string => {
  return new Intl.DateTimeFormat('pt-br').format(new Date(date));
};

export const formatNumbers = (numbers: number[]): string[] => {
  return numbers.map(number =>
    new Intl.NumberFormat('pt-br', { maximumFractionDigits: 2 }).format(number),
  );
};
