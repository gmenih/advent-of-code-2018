const {readFileLinesToArray} = require('../utils/readFile');

class MovingPoint {
    constructor (x, y, dX, dY) {
        this.x = x;
        this.y = y;
        this.dX = dX;
        this.dY = dY;
    }

    update () {
        this.x += this.dX;
        this.y += this.dY;
    }

    insideGrid (w, h) {
        return this.x >= 0 && this.x <= w && this.y >= 0 && this.y <= h;
    }
}

function makeGrid (w, h) { return [...Array(w)].map(() => Array(h)); }
function parsePoints (lines) {
    return lines.map((line) => {
        const [x, y, dX, dY] = line.match(/^position=<([- ]?\d+), ([- ]?\d+)> velocity=<([- ]?\d+), ([- ]?\d+)>$/)
            .slice(1)
            .map(x => +x);
        return new MovingPoint(x, y, dX, dY);
    });
}

function renderUntilWithinThreshold () {
    const grid = makeGrid(10, 100);
    const fontHeight = 8;
    const points = parsePoints(readFileLinesToArray('./input.txt'));
    while (true) {
        points.forEach(x => x.update());
        let currentY = points[0].y;
        let allTrue = true;
        for (const point of points) {
            if (Math.abs(point.y - currentY) > fontHeight) {
                allTrue = false;
                break;
            }
        }
        if (allTrue) {
            break;
        }
    }
    const minY = Math.min(...points.map(p => p.y));
    const minX = Math.min(...points.map(p => p.x));
    points.forEach(p => {
        grid[p.y - minY][p.x - minX] = '#';
    });
    for (let y = 0; y < grid.length; y++) {
        let line = '';
        for (let x = 0; x < grid[0].length; x++) {
            line += grid[y][x] || '.';
        }
        console.log(line);
    }
}

renderUntilWithinThreshold();
console.log('The solution is above. Please use human OCR to deterermine the text');
