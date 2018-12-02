const {readFileLinesToArray} = require('../utils/readFile');

const sum = readFileLinesToArray('./input.txt')
    .map(x => parseInt(x, 10))
    .reduce((a, b) => a + b);

console.log(`Result is ${sum}`);
