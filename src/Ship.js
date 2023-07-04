export default function Ship(shipLength) {
  const length = shipLength;
  let timesHit = 0;
  let isSunk = false;
  return {
    isHit: () => {
      timesHit++;
      if (timesHit === length) {
        isSunk = true;
      }
    },
    getTimesHit: () => {
      return timesHit;
    },
    getShipStatus: () => {
      return isSunk;
    },
  };
}
