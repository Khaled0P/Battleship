import Ship from './Ship';

export default function Gameboard() {
  const board = [];
  const placedShips = [];
  const attackedPositions = [];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board.push([j, i]);
    }
  }

  const invalidPosition = (positionX, positionY) => {
    if (positionX > 9 || positionY > 9 || positionX < 0 || positionY < 0)
      return true;
    if (
      placedShips.some((ship) => {
        return ship.shipPosition.some(
          (ele) =>
            JSON.stringify(ele) === JSON.stringify([positionX, positionY])
        );
      })
    )
      return true;
  };

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
    invalidPosition,
    shotHit,
    positionShip: (shipLength, positionX, positionY, positionVertically) => {
      const ship = Ship(shipLength);

      //position on X or Y axis depending on positionVertically value
      for (let i = 0; i < shipLength; i++) {
        if (positionVertically) {
          if (invalidPosition(positionX, positionY + i)) return;
          ship.shipPosition.push([positionX, positionY + i]);
        } else {
          if (invalidPosition(positionX + i, positionY)) return;
          ship.shipPosition.push([positionX + i, positionY]);
        }
      }
      placedShips.push(ship);
      return ship;
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
    getBoard: () => board,
    invalidPosition,
  };
}
