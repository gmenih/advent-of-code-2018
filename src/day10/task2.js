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
    const fontHeight = 8;
    const points = parsePoints(readFileLinesToArray('./input.txt'));
    let seconds = 0;
    while (true) {
        seconds++;
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
    return seconds;
}

const solution = renderUntilWithinThreshold();

console.log(`The result is ${solution}`);
