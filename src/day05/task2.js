const {readFileToBuffer} = require('../utils/readFile');

const insensitiveEquals = (a, b) => Math.abs(a - b) === 32;
const buffer = readFileToBuffer('./input.txt');

let min = Infinity;
for (let i = 65; i < 91; i++) {
    let final = [];
    let offset = 0;

    buffer.forEach(c => {
        if (insensitiveEquals(c, i) || c === i) {
            return;
        }
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
    if (final.length < min) {
        min = final.length;
    }
}

console.log(`Result is ${min}`);
