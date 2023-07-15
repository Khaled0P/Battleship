import './styles/styles.css';
import Player from './player';
import hit from './assets/hit.mp3';
import miss from './assets/miss.mp3';
import sink from './assets/sink.mp3';

const hitSound = new Audio(hit);
const missSound = new Audio(miss);
const sinkSound = new Audio(sink);
const placeShipsScreen = document.querySelector('.placeShips');
const gameEndScreen = document.querySelector('.gameEnd');
const gameEndMsg = document.querySelector('.announceWinner');
const field = document.querySelector('.field');
const playerBoardDom = document.querySelector('.playerField');
const aiBoardDom = document.querySelector('.aiField');
const rotateShipBtn = document.querySelector('.rotate');
const player = Player('any');
const computer = Player('Ai');
const ships = [5, 4, 3, 3, 2];
let playerShipCount = 0;
let aiShipCount = 0;
let positionVertically = false;
let playerTurn = true;

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

//apply style to related board cells while positioning
function applyStyleToArr(arr, boardDom, className) {
  arr.forEach((ele) => {
    boardDom
      .querySelector("[data-position='" + ele.toString() + "']")
      .classList.add(className);
  });
}

//click behavior while positioning
function positionOnClick(cell) {
  //get clicked cell coordinates
  const position = cell.dataset.position;
  const ship = player.board.positionShip(
    ships[playerShipCount],
    parseInt(position[0]),
    parseInt(position[2]),
    positionVertically
  );
  //return if position is invalid
  if (!ship) return;
  applyStyleToArr(ship.shipPosition, playerBoardDom, 'ship');
  playerShipCount++;
  if (playerShipCount === 5) {
    setTimeout(() => {
      placeShipsScreen.classList.add('hide');
      playerBoardDom.classList.add('onHold');
      field.insertBefore(playerBoardDom, aiBoardDom);
    }, 500);
  }
}

//hover effects while positioning
function positionHover(cell) {
  const hoverPositions = [];
  const position = cell.dataset.position;
  const positionX = parseInt(position[0]);
  const positionY = parseInt(position[2]);
  const ship = ships[playerShipCount];
  for (let i = 0; i < ship; i++) {
    //position error hover effect
    if (positionVertically) {
      if (player.board.invalidPosition(positionX, positionY + i)) {
        applyStyleToArr(hoverPositions, playerBoardDom, 'invalid');
        return;
      }
      hoverPositions.push([positionX, positionY + i]);
    } else {
      if (player.board.invalidPosition(positionX + i, positionY)) {
        applyStyleToArr(hoverPositions, playerBoardDom, 'invalid');
        return;
      }
      hoverPositions.push([positionX + i, positionY]);
    }
  }
  //valid position hover effect
  applyStyleToArr(hoverPositions, playerBoardDom, 'hovered');
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

//ai ship position
while (aiShipCount < 5) {
  let aiPosition = Math.floor(Math.random() * 2);
  const positionX = Math.floor(Math.random() * 10);
  const positionY = Math.floor(Math.random() * 10);
  const ship = computer.board.positionShip(
    ships[aiShipCount],
    positionX,
    positionY,
    aiPosition
  );
  if (!ship) continue;
  aiShipCount++;
}

function playerAttack(cell) {
  const position = cell.dataset.position;
  const positionX = parseInt(position[0]);
  const positionY = parseInt(position[2]);
  if (computer.board.receiveAttack(positionX, positionY)) {
    const targetShip = computer.board.getTargetShip(positionX, positionY);
    if (targetShip.getShipStatus()) {
      applyStyleToArr(targetShip.shipPosition, aiBoardDom, 'sunk');
      sinkSound.currentTime = 0;
      sinkSound.play();
    }
    if (computer.board.allShipsSunk()) {
      gameEndScreen.style.display = 'block';
    }
    cell.classList.add('hit');
    hitSound.currentTime = 0;
    hitSound.play();
  } else {
    cell.classList.add('miss');
    missSound.currentTime = 0;
    missSound.play();
  }
  playerTurn = false;
}
function aiAttack() {
  const positionX = Math.floor(Math.random() * 10);
  const positionY = Math.floor(Math.random() * 10);
  const attackBoard = player.board.receiveAttack(positionX, positionY);
  if (attackBoard === "can't attack same position twice") return;

  const attackTarget = playerBoardDom.querySelector(
    "[data-position='" +
      positionX.toString() +
      ',' +
      positionY.toString() +
      "']"
  );
  if (attackBoard) {
    const targetShip = player.board.getTargetShip(positionX, positionY);
    if (targetShip.getShipStatus()) {
      applyStyleToArr(targetShip.shipPosition, playerBoardDom, 'sunk');
      sinkSound.currentTime = 0;
      sinkSound.play();
    }
    if (player.board.allShipsSunk()) {
      gameEndMsg.textContent;
      gameEndScreen.style.display = 'block';
    }
    attackTarget.classList.add('hit');
    hitSound.currentTime = 0;
    hitSound.play();
  } else {
    attackTarget.classList.add('miss');
    missSound.currentTime = 0;
    missSound.play();
  }
  playerTurn = true;
}

function gameLoop() {
  aiBoardDom.childNodes.forEach((cell) => {
    cell.addEventListener('click', () => {
      //allow player to attack
      playerAttack(cell);
      //prevent player attack
      // if (computer.board.allShipsSunk()) return; // prevent extra ai attack after player win
      aiBoardDom.classList.add('onHold');
      playerBoardDom.classList.remove('onHold');
      setTimeout(() => {
        aiAttack();
        //reset player ability to attack on each call;
        playerBoardDom.classList.add('onHold');
        aiBoardDom.classList.remove('onHold');
      }, 2000);
    });
  });
}

gameLoop();
