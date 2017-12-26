import utils from '../utils';

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
        expect(utils.createBoard().get(0)).toEqual('-');
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
      })
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
      toString: () => ``
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

        set.map(section => board.setTurn(section, marker));

        expect(utils.isWinner(board, marker)).toEqual(true);
      });
    });
  });
});

