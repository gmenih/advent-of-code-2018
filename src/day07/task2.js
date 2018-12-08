const {readFileLinesToArray} = require('../utils/readFile');
const ALPHABET = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

function makeWorkers (count) {
    return [...Array(count)].map(() => ({
        timeToSolution: 0,
        solving: null,
    }));
}

/**
 * @returns {[{char: string, depends: string[], time: number}]} graph
 */
function makeGraph (lines) {
    const instructions = lines.map(line => {
        const [, pre, step] = line.match(/^Step ([A-Z]) must be finished before step ([A-Z]) can begin.$/);
        return {pre, step};
    });
    const g = [];
    for (const char of ALPHABET) {
        g.push({
            char,
            time: char.charCodeAt(0) - 4,
            solving: false,
            depends: instructions.filter(x => x.step === char).map(x => x.pre),
        });
    }
    return g;
}

/**
 * @param {[{char: string, depends: string[], time: number}]} graph
 * @param {[{solving: null | number, timeToSolution: number}]} workers
 */
function getSolutionTime (lines, workerCount) {
    const workers = makeWorkers(workerCount);
    const graph = makeGraph(lines);
    let time = 0;
    while (graph.length !== 0) {
        const availableWorkers = workers.filter(w => w.solving === null);
        const availableNodes = graph.filter(g => g.depends.length === 0 && g.solving === false).slice(0, availableWorkers.length);
        availableNodes.forEach((node, i) => {
            availableWorkers[i].solving = node.char;
            availableWorkers[i].timeToSolution = node.time;
            node.solving = true;
        });
        const workingWorkers = workers.filter(x => x.solving !== null);
        const nextSolve = Math.min(...workingWorkers.map(x => x.timeToSolution));
        time += nextSolve;
        for (const worker of workingWorkers) {
            worker.timeToSolution -= nextSolve;
            if (worker.timeToSolution <= 0) {
                const g = graph.findIndex(g => g.char === worker.solving);
                for (const char of graph) {
                    const i = char.depends.indexOf(worker.solving);
                    if (i !== -1) {
                        char.depends.splice(i, 1);
                    }
                }
                graph.splice(g, 1);
                worker.solving = null;
            }
        }
    }
    return time;
}

const solution = getSolutionTime(readFileLinesToArray('./input.txt'), 5);

console.log(`The result is ${solution}`);
