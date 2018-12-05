const {readFileToBuffer} = require('../utils/readFile');

const insensitiveEquals = (a, b) => Math.abs(a - b) === 32;
const buffer = readFileToBuffer('./input.txt');

let final = [];
let offset = 0;

buffer.forEach(c => {
    if (insensitiveEquals(final[final.length - 1 - offset], c)) {
        offset++;
        return;
    }
    if (offset !== 0) {
        final.splice(-offset);
        offset = 0;
    }
    final.push(c);
});

console.log(`The result is ${final.length}`);
