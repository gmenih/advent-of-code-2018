const {readFileLinesToArray} = require('../utils/readFile');
//|x1 - x2| + |y1 - y2|.
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const lines = readFileLinesToArray('./input.txt');
const clusters = lines.map(line => {
    const [x, y] = line.split(', ').map(x => parseInt(x, 10));
    return {x, y};
});

const maxY = Math.max(...clusters.map(c => c.y));
const maxX = Math.max(...clusters.map(c => c.x));
const SUM_THRESHOLD = 10000;

let region = 0;
for (let y = 0; y < maxX; y++) {
    for (let x = 0; x < maxY; x++) {
        const p = {x, y};
        let sum = 0;
        for (let i = 0; i < clusters.length && sum <= SUM_THRESHOLD; i++) {
            sum += dist(p, clusters[i]);
        }
        if (sum < SUM_THRESHOLD) {
            region++;
        }
    }
}

console.table(`The result is ${region}`);
