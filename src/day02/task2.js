const {readFileLinesToArray} = require('../utils/readFile');

const lines = readFileLinesToArray('./input.txt');
const common = [];

for (let i = 0; i < lines.length; i++) {
    const line = [...lines[i]];
    for (let j = i + 1; j < lines.length; j++) {
        const ljne = [...lines[j]];
        const diff = line.reduce((c, p, k) => c + (line[k] === ljne[k] ? 0 : 1), 0);
        if (diff === 1) {
            common.push([...lines[i]]);
            common.push([...lines[j]]);
            i = lines.length;
            break;
        }
    }
}

console.log('BoxIDs');
console.table(common);

const result = common[0].reduce((p, c, i) => p + (c === common[1][i] ? c : ''), '');

console.log(`Result is ${result}`);
