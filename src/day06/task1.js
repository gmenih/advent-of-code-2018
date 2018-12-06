const {readFileLinesToArray} = require('../utils/readFile');
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const lines = readFileLinesToArray('./input.txt');
const clusters = lines.map(line => {
    const [x, y] = line.split(', ').map(x => parseInt(x, 10));
    return {x, y, size: 0, infinite: false};
});

const maxY = Math.max(...clusters.map(c => c.y));
const maxX = Math.max(...clusters.map(c => c.x));

for (let y = 0; y < maxX; y++) {
    for (let x = 0; x < maxY; x++) {
        const p = {x, y};
        let minDist = Infinity;
        let close;
        for (let i = 0; i < clusters.length && minDist !== 0; i++) {
            const d = dist(p, clusters[i]);

            if (d < minDist || d === 0) {
                close = clusters[i];
                minDist = d;
            } else if (d === minDist) {
                close = undefined;
            }
        }
        if (close) {
            close.size++;
            close.infinite = close.infinite || (x <= 0 || y <= 0 || x >= maxX || y >= maxY);
        }
    }
}

const largest = clusters
    .filter(x => !x.infinite)
    .sort((a, b) => a.size - b.size)
    .pop();
console.table(`The result is ${largest.size}`);
