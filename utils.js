import readline from 'readline';

export default {
  createBoard,
  ask,
  runGeneratorWithPromises,
  isWinner,
};

function isWinner(board, marker) {
  return firstRow() || secondRow() || thirdRow()
    || firstCol() || secondCol() || thirdCol()
    || diagonalLeft() || diagonalRight();

  function firstRow() {
    return [0, 1, 2].every(hasMarker);
  }

  function secondRow() {
    return [3, 4, 5].every(hasMarker);
  }

  function thirdRow() {
    return [6, 7, 8].every(hasMarker);
  }

  function diagonalLeft() {
    return [0, 4, 8].every(hasMarker);
  }

  function diagonalRight() {
    return [2, 4, 6].every(hasMarker);
  }

  function firstCol() {
    return [0, 3, 6].every(hasMarker);
  }

  function secondCol() {
    return [1, 4, 7].every(hasMarker);
  }

  function thirdCol() {
    return [2, 5, 8].every(hasMarker);
  }

  function hasMarker(section) {
    return board.get(section + 1) === marker;
  }
}

const BoardIdentity = (board, emptySlotChar = '-') => {
  const get = (v = 1) => board[v - 1];

  return {
    emptySlotChar,
    get,
    toString: () => printBoard(board),
    setTurn: (turn, marker) => {
      board[turn - 1] = marker;
    },
    length: () => board.length,
    print: () => printBoard(board),
    isVacant: (slot) => get(slot) === emptySlotChar,
  };
};

export function createBoard(emptyCharacter = '-') {
  let board = Array(9).fill(emptyCharacter);
  return BoardIdentity(board, emptyCharacter);
}

export function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

export function runGeneratorWithPromises(generator) {
  const iterator = generator();

  run(iterator.next());

  function run(next) {
    return next.done
      ? next.value
      : next.value.then(v => run(iterator.next(v)))
        .catch(e => iterator.throw(e));
  }
}

function printBoard(board) {
  process.stdout.write('\n');

  for (let i = 0; i < 9; i++) {
    process.stdout.write(`| ${board[i]} `);
    if ((i + 1) % 3 === 0) {
      process.stdout.write('|\n');
    }
  }

  process.stdout.write('\n');
}
