import Gameboard from './game-board';

export default function Player(name) {
  return {
    name: name,
    board: Gameboard(),
    playTurn: (player, positionX, positionY) => {
      player.board.recieveAttack(positionX, positionY);
    },
  };
}
