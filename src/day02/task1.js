const {readFileLinesToArray} = require('../utils/readFile');

const countChar = (str, c) => {
    const matches = str.match(new RegExp(c, 'g'));
    return matches ? matches.length : 0;
};

const lines = readFileLinesToArray('./input.txt');
const repetitions = [0, 0];
lines.forEach(line => {
    const charSet = new Set([...line]);
    const done = [false, false];
    for (const c of charSet) {
        const count = countChar(line, c);
        if (!count) {
            continue;
        } else if (count === 2 && !done[0]) {
            repetitions[0]++;
            done[0] = true;
        } else if (count === 3 && !done[1]) {
            repetitions[1]++;
            done[1] = true;
        }
    }
});

console.log(`Result is ${repetitions[0] * repetitions[1]}`);
