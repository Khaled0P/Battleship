export default function Ship(shipLength) {
  const length = shipLength;
  let timesHit = 0;
  let isSunk = false;
  return {
    shipPosition: [],

    isHit: () => {
      timesHit++;
      if (timesHit === length) {
        isSunk = true;
      }
    },
    getLength: () => {
      return length;
    },
    getTimesHit: () => {
      return timesHit;
    },
    getShipStatus: () => {
      return isSunk;
    },
  };
}
