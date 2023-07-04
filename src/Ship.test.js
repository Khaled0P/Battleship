import Ship from './Ship';

const newShip = Ship(5);

test('should increase ship times hit by 1', () => {
  newShip.isHit();
  expect(newShip.getTimesHit()).toBe(1);
});

test('should change isSunk to true', () => {
  for (let i = 0; i < 5; i++) {
    newShip.isHit();
  }
  expect(newShip.getShipStatus()).toBeTruthy();
});
