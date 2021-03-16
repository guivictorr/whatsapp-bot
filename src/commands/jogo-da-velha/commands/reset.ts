import { resetBoard } from '../components/board';
import { resetPlayerList } from '../components/playerList';
import { resetTurn } from './playTurn';
import { resetProgress } from './start';

const reset = (): void => {
  resetProgress();
  resetTurn();
  resetPlayerList();
  resetBoard();
};

export default reset;
