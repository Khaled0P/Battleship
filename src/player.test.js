import Player from './player';

const playerOne = Player('Khaled');

test('should return correct player name', () => {
  expect(playerOne.name).toBe('Khaled');
});
