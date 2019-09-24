/*

    Writing an assertion library.

    1. Create a function called `expect` that accepts an "actual value"
    2. Return an object with a `toBe` method that accepts an "expected value".
    3. Replace the `if` blocks with the new `expect` function.

    Example usage:

    > expect(actual).toBe(expected)

    You can run the code with `node 2.todo.js`
    Make sure you are in the right directory!

    Inspired by Kent C. Dodds

*/

const { sum, subtract } = require("./math");

let result = sum(1, 2);
let expected = 3;
if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}

result = subtract(4, 3);
expected = 1;
if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}
