const {readFileToBuffer} = require('../utils/readFile');

class ListNode {
    constructor (value, previous = null, next = null) {
        this.value = value;
        this.previous = previous || this;
        this.next = next || this;
        this.previous.next = this;
        this.next.previous = this;
    }

    getClockwise (nr) {
        let node = this;
        for (let i = 0; i < nr; i++) {
            node = node.next;
        }
        return node;
    }

    getCounterClockwise (nr) {
        let node = this;
        for (let i = 0; i < nr; i++) {
            node = node.previous;
        }
        return node;
    }

    remove () {
        this.previous.next = this.next;
        this.next.previous = this.previous;
    }
}

function getHighScore (input) {
    const [players, lastMarble] = input
        .match(/(\d+) players; last marble is worth (\d+) points/)
        .splice(1)
        .map(x => +x);
    const scores = new Uint32Array(players);
    let currentPlayer = 0;
    let currentValue = 0;
    let currentNode = new ListNode(0);
    while (currentNode.value < lastMarble) {
        currentValue++;
        if (currentValue % 23 !== 0) {
            currentNode = new ListNode(currentValue, currentNode.getClockwise(1), currentNode.getClockwise(2));
        } else {
            currentNode = currentNode.getCounterClockwise(7);
            scores[currentPlayer] += currentNode.value;
            scores[currentPlayer] += currentValue;
            currentNode.remove();
            currentNode = currentNode.next;
        }
        currentPlayer = (currentPlayer + 1) % players;
    }
    return Math.max(...scores);
}

const solution = getHighScore(readFileToBuffer('./input.txt', 'utf-8'));

console.log(`The result is ${solution}`);
