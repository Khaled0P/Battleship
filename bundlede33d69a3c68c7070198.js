/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
function Ship(shipLength) {
  var length = shipLength;
  var timesHit = 0;
  var isSunk = false;
  return {
    shipPosition: [],
    isHit: function isHit() {
      timesHit++;
      if (timesHit === length) {
        isSunk = true;
      }
    },
    getLength: function getLength() {
      return length;
    },
    getTimesHit: function getTimesHit() {
      return timesHit;
    },
    getShipStatus: function getShipStatus() {
      return isSunk;
    }
  };
}

/***/ }),

/***/ "./src/game-board.js":
/*!***************************!*\
  !*** ./src/game-board.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function Gameboard() {
  var _ref;
  var board = [];
  var placedShips = [];
  var attackedPositions = [];
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      board.push([j, i]);
    }
  }
  var invalidPosition = function invalidPosition(positionX, positionY) {
    if (positionX > 9 || positionY > 9 || positionX < 0 || positionY < 0) return true;
    if (placedShips.some(function (ship) {
      return ship.shipPosition.some(function (ele) {
        return JSON.stringify(ele) === JSON.stringify([positionX, positionY]);
      });
    })) return true;
  };
  var illegalMove = function illegalMove(positionX, positionY) {
    //don't allow same move twice
    if (attackedPositions.some(function (ele) {
      return JSON.stringify(ele) === JSON.stringify([positionX, positionY]);
    })) {
      return "can't attack same position twice";
    }
  };

  //check if hit or miss and return true/false accordingly
  var shotHit = function shotHit(positionX, positionY) {
    return placedShips.some(function (placement) {
      return placement.shipPosition.some(function (ele) {
        return JSON.stringify(ele) === JSON.stringify([positionX, positionY]);
      });
    });
  };

  //get the ship that received attack
  var getTargetShip = function getTargetShip(positionX, positionY) {
    return placedShips.filter(function (ship) {
      return ship.shipPosition.some(function (ele) {
        return JSON.stringify(ele) === JSON.stringify([positionX, positionY]);
      });
    })[0];
  };
  return _ref = {
    invalidPosition: invalidPosition,
    shotHit: shotHit,
    positionShip: function positionShip(shipLength, positionX, positionY, positionVertically) {
      var ship = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__["default"])(shipLength);

      //position on X or Y axis depending on positionVertically value
      for (var _i = 0; _i < shipLength; _i++) {
        if (positionVertically) {
          if (invalidPosition(positionX, positionY + _i)) return;
          ship.shipPosition.push([positionX, positionY + _i]);
        } else {
          if (invalidPosition(positionX + _i, positionY)) return;
          ship.shipPosition.push([positionX + _i, positionY]);
        }
      }
      placedShips.push(ship);
      return ship;
    },
    getShipsPlacement: function getShipsPlacement() {
      return placedShips;
    },
    receiveAttack: function receiveAttack(positionX, positionY) {
      if (illegalMove(positionX, positionY)) return illegalMove(positionX, positionY);
      attackedPositions.push([positionX, positionY]);
      if (shotHit(positionX, positionY)) {
        getTargetShip(positionX, positionY).isHit();
        return true;
      } else return false;
    },
    allShipsSunk: function allShipsSunk() {
      return placedShips.every(function (ship) {
        return ship.getShipStatus();
      });
    },
    getBoard: function getBoard() {
      return board;
    }
  }, _defineProperty(_ref, "invalidPosition", invalidPosition), _defineProperty(_ref, "getTargetShip", getTargetShip), _ref;
}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _game_board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-board */ "./src/game-board.js");

function Player(name) {
  return {
    name: name,
    board: (0,_game_board__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    playTurn: function playTurn(player, positionX, positionY) {
      player.board.recieveAttack(positionX, positionY);
    }
  };
}

/***/ }),

/***/ "./src/reload-button.js":
/*!******************************!*\
  !*** ./src/reload-button.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_reload_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/reload.png */ "./src/assets/reload.png");

var button = document.createElement('button');
button.textContent = 'Reload !';
var reloadIcon = document.createElement('img');
reloadIcon.src = _assets_reload_png__WEBPACK_IMPORTED_MODULE_0__;
button.appendChild(reloadIcon);
button.classList.add('reload');
button.addEventListener('click', function () {
  location.reload();
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (button);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Text&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Tektur:wght@500&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    padding: 1rem;
    height: 100vh;

    display: grid;
    grid-template-rows: 1fr 2fr;
}


header h1 {
    font-family: "Big Shoulders Stencil Text", cursive, sans-serif;
    font-size: 5rem;
    text-align: center;
    letter-spacing: 1rem;
}

.field {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
}

.playerField,
.aiField {
    height: 22rem;
    width: 30rem;

    display: flex;
    flex-wrap: wrap;
}


.cell {
    width: 10%;
    height: 10%;
    border: 1px solid black;
}

.cell.ship {
    background-color: blue;
}

/****************  place ship screen  ********************/

.placeShips {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: black;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.placeShips h1 {
    font-family: cursive, sans-serif;
    font-size: 5rem;
    color: white;
    z-index: 12;
}

.rotate {
    background-image: linear-gradient(#42A1EC, #0070C9);
    border: 1px solid #0077CC;
    border-radius: 4px;
    color: #FFFFFF;
    cursor: pointer;
    font-size: 17px;
    font-weight: 400;
    padding: 4px 15px;
    text-align: center;
    white-space: nowrap;
    outline: none;
    transition: transform .3s ease-in-out, filter .3s ease-in-out;
}

.rotate:hover {
    filter: brightness(110%);
    transform: scale(105%);
}

.rotate:active {
    filter: brightness(90%);
    transform: scale(90%);
}

.button-15:disabled {
    cursor: default;
    opacity: .3;
}

.button-15:hover {
    background-image: linear-gradient(#51A9EE, #147BCD);
    border-color: #1482D0;
    text-decoration: none;
}

.button-15:active {
    background-image: linear-gradient(#3D94D9, #0067B9);
    border-color: #006DBC;
    outline: none;
}

.button-15:focus {
    box-shadow: rgba(131, 192, 253, 0.5) 0 0 0 3px;
    outline: none;
}

.placeShips.hide {
    display: none;
}

.placeShips .cell {
    border: 1px solid white;

    display: flex;
    justify-content: center;
    align-items: center;
}

.placeShips .cell.hovered {
    background-color: rgba(0, 0, 255, .4);
    cursor: pointer;
}

.placeShips .cell.ship {
    background-color: blue;
}

.placeShips .cell.invalid {
    background-color: rgba(255, 0, 0, .4);
    cursor: not-allowed;
    position: relative;
}

.cell.invalid::before,
.cell.invalid::after {
    content: "";
    background-color: black;
    width: 2px;
    height: 120%;
    position: absolute;
}

.cell.invalid::before {
    transform: rotate(45deg)
}

.cell.invalid::after {
    transform: rotate(-45deg)
}

/*********** battle effects  ***************/
.aiField .cell:hover {
    cursor: pointer;
    background-color: rgba(177, 233, 177, .5);
}

.aiField .cell.hit,
.aiField .cell.miss {
    pointer-events: none
}

.cell.miss {
    background-color: rgb(177, 233, 177);
    display: flex;
    justify-content: center;
    align-items: center;
}

.cell.miss::after {
    content: "";
    display: block;
    background-color: black;
    width: 6px;
    height: 6px;
    border-radius: 50%;
}

.cell.hit {
    background-color: rgb(223, 101, 101);
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
}

.onHold {
    opacity: 0.5;
    cursor: auto;
    pointer-events: none;
}

.cell.hit::before,
.cell.hit::after,
.cell.sunk::before,
.cell.sunk::after {
    content: "";
    position: absolute;
    background-color: black;
    width: 1px;
    height: 8px;
}

.cell.hit::before {
    transform: rotate(55deg);
}

.cell.hit::after {
    transform: rotate(-55deg);
}

.cell.sunk::before,
.cell.sunk::after {
    width: 2px;
    height: 155%;
}

/***************** game end *********************/

.gameEnd {
    display: none;
    background-color: rgba(0, 0, 0, .9);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;

    flex-direction: column;
    align-items: center;
    gap: 30px;
}

.announceWinner {
    font-family: 'Tektur', cursive;
    color: white;
    font-style: italic;
    font-size: 6rem;
    margin-top: 6rem;
}

.reload {
    background-color: white;
    outline: none;
    border: none;
    cursor: pointer;
    font-family: 'Tektur', cursive;
    white-space: nowrap;
    font-size: 4rem;
    width: 25%;
    min-width: max-content;
    display: flex;
    padding: 10px 20px;
    border-radius: 8px;
    transition: transform .3s ease-in-out;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.reload:hover {
    transform: scale(110%);
}

.reload img {
    transition: transform .3s ease-in-out;
}

.reload:hover img {
    transform: rotate(160deg);
}`, "",{"version":3,"sources":["webpack://./src/styles/styles.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Text&display=swap');\r\n@import url('https://fonts.googleapis.com/css2?family=Tektur:wght@500&display=swap');\r\n\r\n\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.container {\r\n    padding: 1rem;\r\n    height: 100vh;\r\n\r\n    display: grid;\r\n    grid-template-rows: 1fr 2fr;\r\n}\r\n\r\n\r\nheader h1 {\r\n    font-family: \"Big Shoulders Stencil Text\", cursive, sans-serif;\r\n    font-size: 5rem;\r\n    text-align: center;\r\n    letter-spacing: 1rem;\r\n}\r\n\r\n.field {\r\n    display: flex;\r\n    justify-content: space-evenly;\r\n    align-items: flex-start;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.playerField,\r\n.aiField {\r\n    height: 22rem;\r\n    width: 30rem;\r\n\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n\r\n.cell {\r\n    width: 10%;\r\n    height: 10%;\r\n    border: 1px solid black;\r\n}\r\n\r\n.cell.ship {\r\n    background-color: blue;\r\n}\r\n\r\n/****************  place ship screen  ********************/\r\n\r\n.placeShips {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    z-index: 10;\r\n    background-color: black;\r\n\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    gap: 2rem;\r\n}\r\n\r\n.placeShips h1 {\r\n    font-family: cursive, sans-serif;\r\n    font-size: 5rem;\r\n    color: white;\r\n    z-index: 12;\r\n}\r\n\r\n.rotate {\r\n    background-image: linear-gradient(#42A1EC, #0070C9);\r\n    border: 1px solid #0077CC;\r\n    border-radius: 4px;\r\n    color: #FFFFFF;\r\n    cursor: pointer;\r\n    font-size: 17px;\r\n    font-weight: 400;\r\n    padding: 4px 15px;\r\n    text-align: center;\r\n    white-space: nowrap;\r\n    outline: none;\r\n    transition: transform .3s ease-in-out, filter .3s ease-in-out;\r\n}\r\n\r\n.rotate:hover {\r\n    filter: brightness(110%);\r\n    transform: scale(105%);\r\n}\r\n\r\n.rotate:active {\r\n    filter: brightness(90%);\r\n    transform: scale(90%);\r\n}\r\n\r\n.button-15:disabled {\r\n    cursor: default;\r\n    opacity: .3;\r\n}\r\n\r\n.button-15:hover {\r\n    background-image: linear-gradient(#51A9EE, #147BCD);\r\n    border-color: #1482D0;\r\n    text-decoration: none;\r\n}\r\n\r\n.button-15:active {\r\n    background-image: linear-gradient(#3D94D9, #0067B9);\r\n    border-color: #006DBC;\r\n    outline: none;\r\n}\r\n\r\n.button-15:focus {\r\n    box-shadow: rgba(131, 192, 253, 0.5) 0 0 0 3px;\r\n    outline: none;\r\n}\r\n\r\n.placeShips.hide {\r\n    display: none;\r\n}\r\n\r\n.placeShips .cell {\r\n    border: 1px solid white;\r\n\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.placeShips .cell.hovered {\r\n    background-color: rgba(0, 0, 255, .4);\r\n    cursor: pointer;\r\n}\r\n\r\n.placeShips .cell.ship {\r\n    background-color: blue;\r\n}\r\n\r\n.placeShips .cell.invalid {\r\n    background-color: rgba(255, 0, 0, .4);\r\n    cursor: not-allowed;\r\n    position: relative;\r\n}\r\n\r\n.cell.invalid::before,\r\n.cell.invalid::after {\r\n    content: \"\";\r\n    background-color: black;\r\n    width: 2px;\r\n    height: 120%;\r\n    position: absolute;\r\n}\r\n\r\n.cell.invalid::before {\r\n    transform: rotate(45deg)\r\n}\r\n\r\n.cell.invalid::after {\r\n    transform: rotate(-45deg)\r\n}\r\n\r\n/*********** battle effects  ***************/\r\n.aiField .cell:hover {\r\n    cursor: pointer;\r\n    background-color: rgba(177, 233, 177, .5);\r\n}\r\n\r\n.aiField .cell.hit,\r\n.aiField .cell.miss {\r\n    pointer-events: none\r\n}\r\n\r\n.cell.miss {\r\n    background-color: rgb(177, 233, 177);\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.cell.miss::after {\r\n    content: \"\";\r\n    display: block;\r\n    background-color: black;\r\n    width: 6px;\r\n    height: 6px;\r\n    border-radius: 50%;\r\n}\r\n\r\n.cell.hit {\r\n    background-color: rgb(223, 101, 101);\r\n    position: relative;\r\n\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.onHold {\r\n    opacity: 0.5;\r\n    cursor: auto;\r\n    pointer-events: none;\r\n}\r\n\r\n.cell.hit::before,\r\n.cell.hit::after,\r\n.cell.sunk::before,\r\n.cell.sunk::after {\r\n    content: \"\";\r\n    position: absolute;\r\n    background-color: black;\r\n    width: 1px;\r\n    height: 8px;\r\n}\r\n\r\n.cell.hit::before {\r\n    transform: rotate(55deg);\r\n}\r\n\r\n.cell.hit::after {\r\n    transform: rotate(-55deg);\r\n}\r\n\r\n.cell.sunk::before,\r\n.cell.sunk::after {\r\n    width: 2px;\r\n    height: 155%;\r\n}\r\n\r\n/***************** game end *********************/\r\n\r\n.gameEnd {\r\n    display: none;\r\n    background-color: rgba(0, 0, 0, .9);\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n    z-index: 20;\r\n\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 30px;\r\n}\r\n\r\n.announceWinner {\r\n    font-family: 'Tektur', cursive;\r\n    color: white;\r\n    font-style: italic;\r\n    font-size: 6rem;\r\n    margin-top: 6rem;\r\n}\r\n\r\n.reload {\r\n    background-color: white;\r\n    outline: none;\r\n    border: none;\r\n    cursor: pointer;\r\n    font-family: 'Tektur', cursive;\r\n    white-space: nowrap;\r\n    font-size: 4rem;\r\n    width: 25%;\r\n    min-width: max-content;\r\n    display: flex;\r\n    padding: 10px 20px;\r\n    border-radius: 8px;\r\n    transition: transform .3s ease-in-out;\r\n    justify-content: center;\r\n    align-items: center;\r\n    gap: 20px;\r\n}\r\n\r\n.reload:hover {\r\n    transform: scale(110%);\r\n}\r\n\r\n.reload img {\r\n    transition: transform .3s ease-in-out;\r\n}\r\n\r\n.reload:hover img {\r\n    transform: rotate(160deg);\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/styles.css":
/*!*******************************!*\
  !*** ./src/styles/styles.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/hit.mp3":
/*!****************************!*\
  !*** ./src/assets/hit.mp3 ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "hit.mp3";

/***/ }),

/***/ "./src/assets/miss.mp3":
/*!*****************************!*\
  !*** ./src/assets/miss.mp3 ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "miss.mp3";

/***/ }),

/***/ "./src/assets/reload.png":
/*!*******************************!*\
  !*** ./src/assets/reload.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "reload.png";

/***/ }),

/***/ "./src/assets/sink.mp3":
/*!*****************************!*\
  !*** ./src/assets/sink.mp3 ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "sink.mp3";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/styles.css */ "./src/styles/styles.css");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _assets_hit_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/hit.mp3 */ "./src/assets/hit.mp3");
/* harmony import */ var _assets_miss_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/miss.mp3 */ "./src/assets/miss.mp3");
/* harmony import */ var _assets_sink_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/sink.mp3 */ "./src/assets/sink.mp3");
/* harmony import */ var _reload_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reload-button */ "./src/reload-button.js");






var hitSound = new Audio(_assets_hit_mp3__WEBPACK_IMPORTED_MODULE_2__);
var missSound = new Audio(_assets_miss_mp3__WEBPACK_IMPORTED_MODULE_3__);
var sinkSound = new Audio(_assets_sink_mp3__WEBPACK_IMPORTED_MODULE_4__);
var placeShipsScreen = document.querySelector('.placeShips');
var gameEndScreen = document.querySelector('.gameEnd');
gameEndScreen.appendChild(_reload_button__WEBPACK_IMPORTED_MODULE_5__["default"]);
var gameEndMsg = document.querySelector('.announceWinner');
var field = document.querySelector('.field');
var playerBoardDom = document.querySelector('.playerField');
var aiBoardDom = document.querySelector('.aiField');
var rotateShipBtn = document.querySelector('.rotate');
var player = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])('any');
var computer = (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])('Ai');
var ships = [5, 4, 3, 3, 2];
var playerShipCount = 0;
var aiShipCount = 0;
var positionVertically = false;
var playerTurn = true;
rotateShipBtn.onclick = function () {
  positionVertically = !positionVertically;
};
//dynamically create board cells
function createDomCells(player, domBoard) {
  player.board.getBoard().forEach(function (ele) {
    var cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.position = ele;
    domBoard.appendChild(cell);
  });
}
createDomCells(player, playerBoardDom);
createDomCells(computer, aiBoardDom);

//apply style to related board cells while positioning
function applyStyleToArr(arr, boardDom, className) {
  arr.forEach(function (ele) {
    boardDom.querySelector("[data-position='" + ele.toString() + "']").classList.add(className);
  });
}

//click behavior while positioning
function positionOnClick(cell) {
  //get clicked cell coordinates
  var position = cell.dataset.position;
  var ship = player.board.positionShip(ships[playerShipCount], parseInt(position[0]), parseInt(position[2]), positionVertically);
  //return if position is invalid
  if (!ship) return;
  applyStyleToArr(ship.shipPosition, playerBoardDom, 'ship');
  playerShipCount++;
  if (playerShipCount === 5) {
    setTimeout(function () {
      placeShipsScreen.classList.add('hide');
      playerBoardDom.classList.add('onHold');
      field.insertBefore(playerBoardDom, aiBoardDom);
    }, 500);
  }
}

//hover effects while positioning
function positionHover(cell) {
  var hoverPositions = [];
  var position = cell.dataset.position;
  var positionX = parseInt(position[0]);
  var positionY = parseInt(position[2]);
  var ship = ships[playerShipCount];
  for (var i = 0; i < ship; i++) {
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
playerBoardDom.childNodes.forEach(function (cell) {
  cell.addEventListener('click', function () {
    positionOnClick(cell);
  });
});
playerBoardDom.childNodes.forEach(function (cell) {
  cell.addEventListener('mouseover', function () {
    positionHover(cell);
  });
  cell.addEventListener('mouseout', function () {
    playerBoardDom.childNodes.forEach(function (ele) {
      ele.classList.remove('hovered');
      ele.classList.remove('invalid');
    });
  });
});

//ai ship position
while (aiShipCount < 5) {
  var aiPosition = Math.floor(Math.random() * 2);
  var positionX = Math.floor(Math.random() * 10);
  var positionY = Math.floor(Math.random() * 10);
  var ship = computer.board.positionShip(ships[aiShipCount], positionX, positionY, aiPosition);
  if (!ship) continue;
  aiShipCount++;
}
function playerAttack(cell) {
  var position = cell.dataset.position;
  var positionX = parseInt(position[0]);
  var positionY = parseInt(position[2]);
  if (computer.board.receiveAttack(positionX, positionY)) {
    var targetShip = computer.board.getTargetShip(positionX, positionY);
    if (targetShip.getShipStatus()) {
      applyStyleToArr(targetShip.shipPosition, aiBoardDom, 'sunk');
      sinkSound.currentTime = 0;
      sinkSound.play();
    }
    if (computer.board.allShipsSunk()) {
      gameEndScreen.style.display = 'flex';
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
  var positionX = Math.floor(Math.random() * 10);
  var positionY = Math.floor(Math.random() * 10);
  var attackBoard = player.board.receiveAttack(positionX, positionY);
  if (attackBoard === "can't attack same position twice") return;
  var attackTarget = playerBoardDom.querySelector("[data-position='" + positionX.toString() + ',' + positionY.toString() + "']");
  if (attackBoard) {
    var targetShip = player.board.getTargetShip(positionX, positionY);
    if (targetShip.getShipStatus()) {
      applyStyleToArr(targetShip.shipPosition, playerBoardDom, 'sunk');
      sinkSound.currentTime = 0;
      sinkSound.play();
    }
    if (player.board.allShipsSunk()) {
      gameEndMsg.textContent = 'you lost, try again!';
      gameEndScreen.style.display = 'flex';
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
  aiBoardDom.childNodes.forEach(function (cell) {
    cell.addEventListener('click', function () {
      //allow player to attack
      playerAttack(cell);
      //prevent player attack
      if (computer.board.allShipsSunk()) return; // prevent extra ai attack after player win
      aiBoardDom.classList.add('onHold');
      playerBoardDom.classList.remove('onHold');
      setTimeout(function () {
        while (!playerTurn) {
          aiAttack();
        }
        //reset player ability to attack on each call;
        playerBoardDom.classList.add('onHold');
        aiBoardDom.classList.remove('onHold');
      }, 2000);
    });
  });
}
gameLoop();
})();

/******/ })()
;
//# sourceMappingURL=bundlede33d69a3c68c7070198.js.map