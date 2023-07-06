import Ship from './Ship';

export default function Gameboard() {
  const board = [];
  const placedShips = [];
  const attackedPositions = [];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board.push([i, j]);
    }
  }
  let positionVertically = false;

  const illegalMove = (positionX, positionY) => {
    // don't allow if coordinates not on gameboard
    if ((positionX || positionY) > 9 || (positionX || positionY) < 0) {
      return 'attack not allowed';
    } else if (
      //don't allow same move twice
      attackedPositions.some(
        (ele) => JSON.stringify(ele) === JSON.stringify([positionX, positionY])
      )
    ) {
      return "can't attack same position twice";
    }
  };

  //check if hit or miss and return true/false accordingly
  const shotHit = (positionX, positionY) => {
    return placedShips.some((placement) => {
      return placement.shipPosition.some((ele) => {
        return JSON.stringify(ele) === JSON.stringify([positionX, positionY]);
      });
    });
  };

  //determine if attacked ship has sunk
  const sinkShip = (ship) => {
    return ship.getTimesHit() === ship.getLength();
  };
  return {
    shotHit,
    positionShip: (shipLength, positionX, positionY) => {
      const ship = Ship(shipLength);

      //position on X or Y axis depending on positionVertically value
      for (let i = 0; i < shipLength; i++) {
        positionVertically
          ? ship.shipPosition.push([positionX, positionY + i])
          : ship.shipPosition.push([positionX + i, positionY]);
      }
      placedShips.push(ship);
    },
    getShipsPlacement: () => {
      return placedShips;
    },
    receiveAttack: (positionX, positionY) => {
      if (illegalMove(positionX, positionY))
        return illegalMove(positionX, positionY);

      attackedPositions.push([positionX, positionY]);

      if (shotHit(positionX, positionY)) {
        //get the ship that received attack
        const targetShip = placedShips.filter((ship) => {
          return ship.shipPosition.filter((ele) => {
            return (
              JSON.stringify(ele) === JSON.stringify([positionX, positionY])
            );
          });
        });
        targetShip[0].isHit();
        if (sinkShip(targetShip[0])) {
          return `${targetShip[0]} has sunk`;
        }
        return true;
      } else return false;
    },
  };
}
