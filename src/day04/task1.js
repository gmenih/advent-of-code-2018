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
            guards[activeGuard] = {sleepLength: 0, minutes: [], id};
        }
        continue;
    }
    if (event[0] === 'f') {
        sleepStart = date;
    }
}

const maxSleep = Object.keys(guards).reduce((max, id) => (guards[id].sleepLength > max.sleepLength ? guards[id] : max), {sleepLength: 0});
const maxMinutes = maxSleep.minutes.reduce((max, min, i) => (min > maxSleep.minutes[max] ? i : max), 0);

console.log(`The result is ${maxSleep.id * maxMinutes}`);
