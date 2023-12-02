// get choose letter buttons
const chooseLetter = document.getElementsByClassName("letter-button");

// get the board buttons
const buttons = document.getElementsByClassName("button-option");
const buttonsArr = Array.from(buttons);

// get restart button element
const restartBtn = document.getElementById("restart");

// get popup message element
const popup = document.getElementById("who-win");

// player data
const player = { letter: "" };

// board matrix
const matrixButtons = {
  rows: {
    row1: [buttonsArr[0], buttonsArr[1], buttonsArr[2]],
    row2: [buttonsArr[3], buttonsArr[4], buttonsArr[5]],
    row3: [buttonsArr[6], buttonsArr[7], buttonsArr[8]]
  },
  columns: {
    column1: [buttonsArr[0], buttonsArr[3], buttonsArr[6]],
    column2: [buttonsArr[1], buttonsArr[4], buttonsArr[7]],
    column3: [buttonsArr[2], buttonsArr[5], buttonsArr[8]]
  },
  diagonals: {
    diagonal1: [buttonsArr[0], buttonsArr[4], buttonsArr[8]],
    diagonal2: [buttonsArr[2], buttonsArr[4], buttonsArr[6]]
  }
};
const matrixValues = {
  rows: {
    row1: [],
    row2: [],
    row3: []
  },
  columns: {
    column1: [],
    column2: [],
    column3: []
  },
  diagonals: {
    diagonal1: [],
    diagonal2: [],
    diagonal3: []
  }
};

// global variables
let value = "X";
let clickCount = 0;
let xWin = false;
let oWin = false;
let draw = false;

// start game logic ///////////////////////////////////////////////////////////

// choose player letter function
for (let letter of chooseLetter) {
  letter.addEventListener("click", chooseLetterfn);
}

function chooseLetterfn(event) {
  player.letter = event.target.innerHTML;
  event.target.parentElement.parentElement.classList.add("hide");
  if (player.letter === "O") {
    buttons[Math.floor(Math.random() * 9)].dataset.priority = "2";
    nextMove();
  } else if (player.letter === "X") {
    for (let button of buttons) {
      button.addEventListener("click", game);
    }
  }
  for (let letter of chooseLetter) {
    letter.removeEventListener("click", chooseLetterfn);
  }
}

// main function with all game logic
function game(event) {
  clickCount++;
  event.target.innerHTML = value;
  fillMatrix(event.target);
  winner();
  showPopup();
  value = value === "X" ? "O" : "X";
  //event.target.removeEventListener("click", game);
  if (draw === true || xWin === true || oWin === true) {
    for (let button of buttons) {
      button.removeEventListener("click", game);
    }
  } else {
    nextMove();
  }
}

// code to handle restart the game and reset all to initial values
restartBtn.addEventListener("click", restartFn);

// restart function
function restartFn() {
  for (let letter of chooseLetter) {
    letter.addEventListener("click", chooseLetterfn);
  }

  for (let button of buttons) {
    button.innerHTML = "";
  }

  value = "X";
  clickCount = 0;
  xWin = false;
  oWin = false;
  draw = false;

  matrixValues.rows.row1 = [];
  matrixValues.rows.row2 = [];
  matrixValues.rows.row3 = [];
  matrixValues.columns.column1 = [];
  matrixValues.columns.column2 = [];
  matrixValues.columns.column3 = [];
  matrixValues.diagonals.diagonal1 = [];
  matrixValues.diagonals.diagonal2 = [];

  player.letter = "";

  for (let button of buttons) {
    button.dataset.priority = "1";
  }

  if (!popup.classList.contains("hide")) {
    popup.classList.add("hide");
  }

  if (chooseLetter[0].parentElement.parentElement.classList.contains("hide")) {
    chooseLetter[0].parentElement.parentElement.classList.remove("hide");
  }
}

// helper function used in main function

// this function add values to rows and columns object
function fillMatrix(target) {
  const row = target.dataset.row;
  const column = target.dataset.column;
  switch (true) {
    case row === "1" && column === "1":
      matrixValues.rows.row1[0] = value;
      matrixValues.columns.column1[0] = value;
      matrixValues.diagonals.diagonal1[0] = value;
      break;
    case row === "1" && column === "2":
      matrixValues.rows.row1[1] = value;
      matrixValues.columns.column2[0] = value;
      break;
    case row === "1" && column === "3":
      matrixValues.rows.row1[2] = value;
      matrixValues.columns.column3[0] = value;
      matrixValues.diagonals.diagonal2[0] = value;
      break;
    case row === "2" && column === "1":
      matrixValues.rows.row2[0] = value;
      matrixValues.columns.column1[1] = value;
      break;
    case row === "2" && column === "2":
      matrixValues.rows.row2[1] = value;
      matrixValues.columns.column2[1] = value;
      matrixValues.diagonals.diagonal1[1] = value;
      matrixValues.diagonals.diagonal2[1] = value;
      break;
    case row === "2" && column === "3":
      matrixValues.rows.row2[2] = value;
      matrixValues.columns.column3[1] = value;
      break;
    case row === "3" && column === "1":
      matrixValues.rows.row3[0] = value;
      matrixValues.columns.column1[2] = value;
      matrixValues.diagonals.diagonal2[2] = value;
      break;
    case row === "3" && column === "2":
      matrixValues.rows.row3[1] = value;
      matrixValues.columns.column2[2] = value;
      break;
    case row === "3" && column === "3":
      matrixValues.rows.row3[2] = value;
      matrixValues.columns.column3[2] = value;
      matrixValues.diagonals.diagonal1[2] = value;
      break;
  }
}

// this function to know who win X or O or it is a draw
function winner() {
  for (let a in matrixValues) {
    for (let b in matrixValues[a]) {
      let xCounter = 0;
      let oCounter = 0;
      for (let value of matrixValues[a][b]) {
        if (value === "X") {
          xCounter++;
          if (xCounter === 3) {
            xWin = true;
            xCounter = 0;
          }
        } else if (value === "O") {
          oCounter++;
          if (oCounter === 3) {
            oWin = true;
            oCounter = 0;
          }
        }
      }
    }
  }
  if (clickCount === 9 && xWin === false && oWin === false) {
    draw = true;
  }
}

// show popup message function
function showPopup() {
  if (draw === true || xWin === true || oWin === true) {
    popup.classList.remove("hide");
    if (draw === true) {
      document.getElementById("win-message").innerHTML = "draw";
    } else if (player.letter === "X" && xWin === true) {
      document.getElementById("win-message").innerHTML =
        '<p>you win</p><p class="wwin">X wins</p>';
    } else if (player.letter === "X" && oWin === true) {
      document.getElementById("win-message").innerHTML =
        '<p>you lose</p><p class="wwin">O wins</p>';
    } else if (player.letter === "O" && oWin === true) {
      document.getElementById("win-message").innerHTML =
        '<p>you win</p><p class="wwin">O wins</p>';
    } else if (player.letter === "O" && xWin === true) {
      document.getElementById("win-message").innerHTML =
        '<p>you lose</p><p class="wwin">X wins</p>';
    }
  }
}

// next move function
function nextMove() {
  clickCount++;
  for (let button of buttons) {
    button.removeEventListener("click", game);
  }

  for (let a in matrixButtons) {
    for (let b in matrixButtons[a]) {
      for (let c in matrixButtons[a][b]) {
        let innerValue = matrixValues[a][b][c];
        let button = matrixButtons[a][b];
        let n = innerValue === value ? 2 : 1;
        switch (c) {
          case "0":
            // start medium mode function
            if (innerValue !== undefined) {
              button[1].dataset.priority = (
                2 + Number(button[1].dataset.priority)
              ).toString();
              button[2].dataset.priority = (
                1 + Number(button[2].dataset.priority)
              ).toString();
              // end medium mode function

              // start hard mode function
              if (innerValue === matrixValues[a][b][1]) {
                button[2].dataset.priority = (
                  2 *
                  n *
                  Number(button[2].dataset.priority)
                ).toString();
              } else if (innerValue === matrixValues[a][b][2]) {
                button[1].dataset.priority = (
                  2 *
                  n *
                  Number(button[1].dataset.priority)
                ).toString();
              }
              // end hard mode function
            }
            break;

          case "1":
            // start medium mode function
            if (innerValue !== undefined) {
              button[0].dataset.priority = (
                1 + Number(button[0].dataset.priority)
              ).toString();
              button[2].dataset.priority = (
                1 + Number(button[2].dataset.priority)
              ).toString();
              // end medium mode function

              // start hard mode function
              if (innerValue === matrixValues[a][b][0]) {
                button[2].dataset.priority = (
                  2 *
                  n *
                  Number(button[2].dataset.priority)
                ).toString();
              } else if (innerValue === matrixValues[a][b][2]) {
                button[0].dataset.priority = (
                  2 *
                  n *
                  Number(button[0].dataset.priority)
                ).toString();
              }
              // end hard mode function
            }
            break;

          case "2":
            // start medium mode function
            if (innerValue !== undefined) {
              button[0].dataset.priority = (
                1 + Number(button[0].dataset.priority)
              ).toString();
              button[1].dataset.priority = (
                2 + Number(button[1].dataset.priority)
              ).toString();
              // end medium mode function

              // start hard mode function
              if (innerValue === matrixValues[a][b][0]) {
                button[1].dataset.priority = (
                  2 *
                  n *
                  Number(button[1].dataset.priority)
                ).toString();
              } else if (innerValue === matrixValues[a][b][1]) {
                button[0].dataset.priority = (
                  2 *
                  n *
                  Number(button[0].dataset.priority)
                ).toString();
              }
              // end hard mode function
            }
            break;
        }
      }
    }
  }

  const emptyButtonsArr = buttonsArr.filter(function (value, index, arr) {
    return value.innerHTML === "";
  });

  emptyButtonsArr.sort(function (a, b) {
    return Number(b.dataset.priority) - Number(a.dataset.priority);
  });

  setTimeout(showNextMove, 1000);
  function showNextMove() {
    emptyButtonsArr[0].innerHTML = value;
    fillMatrix(emptyButtonsArr[0]);
    winner();
    showPopup();
    value = value === "X" ? "O" : "X";

    if (draw === true || xWin === true || oWin === true) {
      for (let button of buttons) {
        button.removeEventListener("click", game);
      }
    } else {
      for (let button of buttons) {
        button.innerHTML === ""
          ? button.addEventListener("click", game)
          : button.removeEventListener("click", game);
      }
    }
  }
}
