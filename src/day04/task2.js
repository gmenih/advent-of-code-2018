const {readFileLinesToArray} = require('../utils/readFile');

// [1518-09-20 00:43] falls asleep
const parseLine = line => {
    const date = new Date(line.substr(1, 16));
    const event = line.substr(19);
    return {date, event};
};

const lines = readFileLinesToArray('./input.txt');
const events = lines.map(parseLine).sort((a, b) => a.date.getTime() - b.date.getTime());
const guards = {};

let activeGuard = '';
let sleepStart = null;
for (const {date, event} of events) {
    if (activeGuard && sleepStart) {
        guards[activeGuard].sleepLength += date.getMinutes() - sleepStart.getMinutes();
        for (let i = sleepStart.getMinutes(); i < date.getMinutes(); i++) {
            guards[activeGuard].minutes[i] = guards[activeGuard].minutes[i] ? guards[activeGuard].minutes[i] + 1 : 1;
        }
        sleepStart = null;
    }
    if (event[0] === 'G') {
        const id = event.match(/#(\d{3,4})/)[1];
        activeGuard = id;
        if (!guards[activeGuard]) {
            guards[activeGuard] = {sleepLength: 0, minutes: {}, id};
        }
        continue;
    }
    if (event[0] === 'f') {
        sleepStart = date;
    }
}

const maxGuard = Object.values(guards)
    .filter(({minutes}) => Object.keys(minutes).length > 0)
    .sort(({minutes: minutesA}, {minutes: minutesB}) => Math.max(...Object.values(minutesA)) - Math.max(...Object.values(minutesB)))
    .pop();
const maxMinute = Object.keys(maxGuard.minutes).reduce((maxMin, curr) =>
    maxGuard.minutes[maxMin] > maxGuard.minutes[curr] ? maxMin : curr,
);

console.log(`The result is ${maxGuard.id * maxMinute}`);
