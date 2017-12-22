import app from '../app';

describe('/app', () => {
  it('should be function', () => {
    expect(app).toBeInstanceOf('Function');
  });
});