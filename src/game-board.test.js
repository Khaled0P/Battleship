import Gameboard from './game-board';

const gameboard = Gameboard();

test('should return all ship placements', () => {
  gameboard.positionShip(4, 0, 0);
  expect(gameboard.getShipsPlacement()[0].shipPosition).toStrictEqual([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ]);
});

test('should return true when coordinates match ship position', () => {
  expect(gameboard.receiveAttack(0, 0)).toBe(true);
});

test("should return false when coordinates don't match ship position", () => {
  expect(gameboard.receiveAttack(4, 5)).toBe(false);
});

test('should identify a ship has sunk and return the sunk ship', () => {
  gameboard.receiveAttack(1, 0);
  gameboard.receiveAttack(2, 0);
  expect(gameboard.receiveAttack(3, 0)).toBe('[object Object] has sunk');
});

test("should return 'can't attack same position twice' when coordinates already entered before", () => {
  expect(gameboard.receiveAttack(4, 5)).toBe(
    "can't attack same position twice"
  );
});

test('should return "attack not allowed" when coordinates not on board', () => {
  expect(gameboard.receiveAttack(10, 15)).toBe('attack not allowed');
});
