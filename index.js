import { ask } from './utils';

runPromiseGenerator(app);

function* app() {
  const answer = yield ask('Do you want to play? (y)');
  console.log('--' + answer);
  const answer2 = yield ask('Do you want to play? 2 (y)');
  console.log('--' + answer2);
  const answer3 = yield ask('Do you want to play? 3 (y)');
  console.log('--' + answer3);
}

function runPromiseGenerator(generator) {
  const iterator = generator();

  run(iterator.next());

  function run(next) {
    return next.done
      ? next.value
      : next.value.then(v => run(iterator.next(v)))
        .catch(e => iterator.throw(e));
  }
}