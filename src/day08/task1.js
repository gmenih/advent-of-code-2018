const {readSingleLineToArray} = require('../utils/readFile');

/** @param {Array<number>} lines  */
function getMetaSum (lines, offset = 0) {
    let sum = 0;
    const [children, meta] = lines.slice(offset, offset + 2);
    let internalOffset = 2;
    for (let i = 0; i < children; i++) {
        // ✨ RECURSION ✨
        const [childSum, childOffset] = getMetaSum(lines, offset + internalOffset);
        internalOffset += childOffset;
        sum += childSum;
    }
    for (let i = 0; i < meta; i++) {
        sum += lines[offset + internalOffset];
        internalOffset++;
    }
    return offset > 0 ? [sum, internalOffset] : sum;
}

const solution = getMetaSum(readSingleLineToArray('./input.txt', ' ').map(x => parseInt(x, 10)));

console.log(`The result is ${solution}`);
