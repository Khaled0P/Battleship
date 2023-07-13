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
    //don't allow same move twice
    if (
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
  //get the ship that received attack
  const getTargetShip = (positionX, positionY) => {
    return placedShips.filter((ship) => {
      return ship.shipPosition.some((ele) => {
        return JSON.stringify(ele) === JSON.stringify([positionX, positionY]);
      });
    })[0];
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
        getTargetShip(positionX, positionY).isHit();
        return true;
      } else return false;
    },
    getShipIfSunk: (positionX, positionY) => {
      const targetShip = getTargetShip(positionX, positionY);
      if (targetShip.getShipStatus()) {
        return targetShip;
      }
    },
    getBoard: () => board,
    invalidPosition,
    getTargetShip,
  };
}
