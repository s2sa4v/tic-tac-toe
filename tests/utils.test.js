import utils, { createBoard } from '../utils';

expect.extend({
  toBeA(received, argument) {
    const initialType = typeof received;
    const type = initialType === 'object'
      ? Array.isArray(received)
        ? 'array'
        : initialType
      : initialType;
    return type === argument ? {
      message: () => `expected ${received} to be type ${argument}`,
      pass: true,
    } : {
      message: () => `expected ${received} to be type ${argument}`,
      pass: false,
    };
  },
});

describe('/utils', () => {
  describe('#.runGeneratorWithPromises', () => {
    test('it exists', () => {
      expect(utils).toHaveProperty('runGeneratorWithPromises');
    });
  });

  describe('#.ask', () => {
    test('it exists`', () => {
      expect(utils).toHaveProperty('ask');
    });
  });

  describe('#.createBoard', () => {
    test('it exists', () => {
      expect(utils).toHaveProperty('createBoard');
    });

    describe('.get', () => {
      test('property', () => {
        expect(utils.createBoard()).toHaveProperty('get');
      });

      test('returns actual value', () => {
        expect(utils.createBoard().get(1)).toEqual('-');
      });
    });

    describe('.setTurn', () => {
      test('has such method', () => {
        expect(utils.createBoard()).toHaveProperty('setTurn');
      });

      test('setTurn', () => {
        let board = utils.createBoard();
        let marker = 'm';

        board.setTurn(0, marker);

        expect(board.get(0)).toBe(marker);
      });
    });

    describe('.print', () => {
      test('has such method', () => {
        expect(utils.createBoard()).toHaveProperty('print');
      });
    });

    describe('.length', () => {
      test('returns valid length', () => {
        expect(utils.createBoard().length()).toEqual(9);
      });
    });

    describe('#isVacant', () => {
      test('to a be a function', () => {
        expect(createBoard().isVacant).toBeA('function');
      });

      test('it should return `true` when slot is not taken', () => {
        const board = utils.createBoard();
        board.setTurn(1, 'x');
        expect(board.isVacant(2)).toBe(true);
      });

      test('it should return `false` when slot is taken', () => {
        const board = utils.createBoard();
        board.setTurn(1, 'x');
        expect(board.isVacant(1)).toBe(false);
      });
    });
  });

  describe('#.isWinner', () => {
    test('it exists', () => {
      expect(utils).toHaveProperty('isWinner');
    });

    test('returns false when is not winner', () => {
      const board = utils.createBoard();
      expect(utils.isWinner(board, 'm')).toEqual(false);
    });

    const Identity = (val) => ({
      map: fn => Identity(fn(val)),
      toString: () => ``,
    });
    const sets = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    sets.map((set) => {
      test(`returns "true" for ${set} markers`, () => {
        const marker = 'm';
        const board = utils.createBoard();

        set.map(section => board.setTurn(section + 1, marker));

        expect(utils.isWinner(board, marker)).toEqual(true);
      });
    });
  });
});

