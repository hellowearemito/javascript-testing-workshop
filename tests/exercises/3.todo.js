/*

    Writing a testing framework.

    1. Create a function called `test` that accepts a title and a callback
    2. Add try / catch block and log the title with a note of success or error.
    3. Wrap each of your tests in a `test` function.

    Example usage:
    test('title', () => {
        // arrange
        // act
        // assert
    })

    You can run the code with `node 3.todo.js`
    Make sure you are in the right directory!

    Inspired by Kent C. Dodds

*/

const { sum, subtract } = require("./math");

let result = sum(1, 2);
let expected = 3;
expect(result).toBe(expected);

result = subtract(4, 3);
expected = 1;
expect(result).toBe(expected);

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    }
  };
}
