import './styles/styles.css';
import Player from './player';

const placeShipsScreen = document.querySelector('.placeShips');
const field = document.querySelector('.field');
const playerBoardDom = document.querySelector('.playerField');
const aiBoardDom = document.querySelector('.aiField');
const rotateShipBtn = document.querySelector('.rotate');
const player = Player('any');
const computer = Player('Ai');
const ships = [5, 4, 3, 3, 2];
let placedShipCount = 0;
let positionVertically = false;

rotateShipBtn.onclick = () => {
  positionVertically = !positionVertically;
};
//dynamically create board cells
function createDomCells(player, domBoard) {
  player.board.getBoard().forEach((ele) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.position = ele;
    domBoard.appendChild(cell);
  });
}

createDomCells(player, playerBoardDom);
createDomCells(computer, aiBoardDom);

function applyStyleToArr(arr, className) {
  arr.forEach((ele) => {
    playerBoardDom
      .querySelector("[data-position='" + ele.toString() + "']")
      .classList.add(className);
  });
}

function positionOnClick(cell) {
  const position = cell.dataset.position;
  const ship = player.board.positionShip(
    ships[placedShipCount],
    parseInt(position[0]),
    parseInt(position[2]),
    positionVertically
  );
  if (!ship) return;
  applyStyleToArr(ship.shipPosition, 'ship');
  placedShipCount++;
  if (placedShipCount === 5) {
    setTimeout(() => {
      placeShipsScreen.classList.add('hide');
      field.insertBefore(playerBoardDom, aiBoardDom);
    }, 500);
  }
}

function positionHover(cell) {
  const hoverPositions = [];
  const position = cell.dataset.position;
  const positionX = parseInt(position[0]);
  const positionY = parseInt(position[2]);
  const ship = ships[placedShipCount];
  for (let i = 0; i < ship; i++) {
    if (positionVertically) {
      if (player.board.invalidPosition(positionX, positionY + i)) {
        applyStyleToArr(hoverPositions, 'invalid');
        return;
      }
      hoverPositions.push([positionX, positionY + i]);
    } else {
      if (player.board.invalidPosition(positionX + i, positionY)) {
        applyStyleToArr(hoverPositions, 'invalid');
        return;
      }
      hoverPositions.push([positionX + i, positionY]);
    }
  }
  applyStyleToArr(hoverPositions, 'hovered');
}

playerBoardDom.childNodes.forEach((cell) => {
  cell.addEventListener('click', () => {
    positionOnClick(cell);
  });
});

playerBoardDom.childNodes.forEach((cell) => {
  cell.addEventListener('mouseover', () => {
    positionHover(cell);
  });
  cell.addEventListener('mouseout', () => {
    playerBoardDom.childNodes.forEach((ele) => {
      ele.classList.remove('hovered');
      ele.classList.remove('invalid');
    });
  });
});
