import { ask } from "./utils";

export default function* app() {
  const answer = yield ask('Do you want to play? (y)');
  console.log('--' + answer);
  const answer2 = yield ask('Do you want to play? 2 (y)');
  console.log('--' + answer2);
  const answer3 = yield ask('Do you want to play? 3 (y)');
  console.log('--' + answer3);
}