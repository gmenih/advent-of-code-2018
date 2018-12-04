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
const grid = makeGrid(1000, 1000);

rects.forEach(({x, y, w, h}) => {
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if (!grid[y + j][x + i]){ 
                grid[y + j][x + i] = 1;
            } else {
                grid[y + j][x + i]++;
            }
        }
    }
});

// just make another pass over the grid
for (let {x, y, w, h, id} of rects) {
    let allOne = true;
    for (let i = 0; i < h && allOne; i++) {
        for (let j = 0; j < w && allOne; j++) {
            allOne = grid[y + j][x + i] === 1;
        }
    }
    if (allOne) {
        console.log(`And the winner is ${id}`);
        break;
    }
}
