import { board } from '../commands/jogo-da-velha/';
import questions from '../data/questions.json';

export type IQuestionsKeys = keyof typeof questions;
export type IBoardKeys = keyof typeof board;

export type ICurrencyProps = {
  name: string;
  code: string;
  bid: number;
  high: number;
  low: number;
  create_date: string;
};

export type IDataProps = {
  USD: ICurrencyProps;
  EUR: ICurrencyProps;
  BTC: ICurrencyProps;
};

export type ICovidData = {
  cases: number;
  deaths: number;
  refuses: number;
  state: string;
  datetime: string;
  error: string;
};

export type IPlayerProps = {
  name: string;
  id: string;
  symbol: string;
};
