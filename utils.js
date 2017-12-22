import readline from 'readline';

export default {
  ask,
  runGeneratorWithPromises,
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