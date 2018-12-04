const {readFileLinesToArray} = require('../utils/readFile');

const lines = readFileLinesToArray('./input.txt').map(x => parseInt(x, 10));
const rep = new Set();
let i = 0;
let frequency = 0;

while (true) {
    rep.add(frequency);
    frequency += lines[i % lines.length];
    if (rep.has(frequency)) {
        break;
    }
    i++;
}
console.log(`Result is ${frequency}`);
