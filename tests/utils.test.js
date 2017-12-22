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
});

