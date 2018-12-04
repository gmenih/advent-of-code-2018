const {readFileLinesToArray} = require('../utils/readFile');

// ID      Y   X    W  H
// #1407 @ 699,840: 28x17
const parseLine = line => {
    const trimText = x => x.map(y => y.trim());
    const [id, rest] = trimText(line.split('@'));
    const [coordinates, size] = trimText(rest.split(':'));
    const [y, x] = trimText(coordinates.split(',')).map(x => parseInt(x, 10));
    const [w, h] = trimText(size.split('x')).map(x => parseInt(x, 10));

    return {id, x, y, w, h};
};
const makeGrid = (w, h) => [...Array(w)].map(() => Array(h));

const lines = readFileLinesToArray('./input.txt');
const rects = lines.map(parseLine);
// from observation, it seems that no rect goes beyond 1000 inches
const grid = makeGrid(1000, 1000);

rects.forEach(({x, y, w, h}) => {
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if (!grid[y + j][x + i]) {
                grid[y + j][x + i] = 1;
            } else {
                grid[y + j][x + i]++;
            }
        }
    }
});

const gridSum = grid.reduce((sum, row) => sum + row.reduce((inch, cell) => inch + (cell >= 2 ? 1 : 0), 0), 0);

console.log(`The solution is ${gridSum}`);
