const {readFileLinesToArray} = require('../utils/readFile');
const ALPHABET = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

function makeGraph (lines) {
    const instructions = lines.map(line => {
        const [, pre, step] = line.match(/^Step ([A-Z]) must be finished before step ([A-Z]) can begin.$/);
        return {pre, step};
    });
    const g = [];
    for (const char of ALPHABET) {
        g.push({
            char,
            depends: instructions.filter(x => x.step === char).map(x => x.pre),
        });
    }
    return g;
}

function getSolvedSteps (lines) {
    const graph = makeGraph(lines);
    let solution = '';
    while (solution.length < ALPHABET.length) {
        const nextStepIndex = graph.findIndex(x => !x.depends || x.depends.length === 0);
        const nextStep = graph[nextStepIndex];
        solution += nextStep.char;
        for (const char of graph) {
            const i = char.depends.indexOf(nextStep.char);
            if (i !== -1) {
                char.depends.splice(i, 1);
            }
        }
        graph.splice(nextStepIndex, 1);
    }
    return solution;
}

const solution = getSolvedSteps(readFileLinesToArray('./input.txt'));

console.log(`The result is ${solution}`);
