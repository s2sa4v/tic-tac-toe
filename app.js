import utils, { ask, createBoard } from "./utils";

const emptyCharacter = '-';

export default function* app() {
  let wannaPlay = true;

  while (wannaPlay) {
    console.log('Tic Tac Toe Game');

    // let's choose characters first
    let userCharacter = yield ask('Choose your character to play');
    userCharacter = userCharacter.toString().slice(0, 1);
    let computerCharacter;

    while (!computerCharacter) {
      computerCharacter = yield ask('Choose a character for computer');
      computerCharacter = computerCharacter.toString().slice(0, 1);
      if (!computerCharacter || computerCharacter === userCharacter) {
        computerCharacter = false;
      }
    }
    let currentMarker = userCharacter;
    let gameIsInProcess = true;
    const board = createBoard();
    // print board
    board.toString();

    while (gameIsInProcess) {

      // do user turn
      let userTurn = 0;

      while (userTurn < 1) {
        userTurn = yield ask('It\'s your turn. Choose one of the range from 1 to 9 that is empty');
        if (userTurn > 9 || userTurn < 1 || board.get(userTurn) === computerCharacter) {
          userTurn = 0;
        }
      }

      // set user turn to board
      board.setTurn(userTurn, userCharacter);
      // print board
      board.print();

      // check if he is winner
      if (utils.isWinner(board, userCharacter)) {
        console.log('Congratulations!');

        gameIsInProcess = false;
      } else {
        currentMarker = currentMarker === userCharacter ? computerCharacter : userCharacter;
      }
      // do computer turn
      board.setTurn(computerTurn(board, emptyCharacter), computerCharacter);
      // set computer turn
      // print board
      board.print();
      // check if he is winner
      if (utils.isWinner(board, computerCharacter)) {
        console.log('You loose');
        gameIsInProcess = false;
      }
    }


    let answer = yield ask('Do you want to play again? (y/n)');
    wannaPlay = (answer === 'yes' || answer === 'ye' || answer === 'y');
  }

  process.exit();
}

function computerTurn(board, emptyChar) {
  let turn = 0;
  while (board.get(turn) !== emptyChar) {
    turn = Math.floor(Math.random() * board.length());
  }
  return turn;
}