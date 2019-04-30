process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////
const moves = [
    { name: 'UL', value: { y: -2, x: -1 } },
    { name: 'UR', value: { y: -2, x: 1 } },
    { name: 'R', value: { y: 0, x: 2 } },
    { name: 'LR', value: { y: 2, x: 1 } },
    { name: 'LL', value: { y: 2, x: -1 } },
    { name: 'L', value: { y: 0, x: -2 } }
];

const getDistance = (from, to) => Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
const sumPoints = (p1, p2) => ({ x: p1.x + p2.x, y: p1.y + p2.y })
const sortPath = (path) => {
    const result = [];
    for (let i = 0; i < moves.length; i++) {
        path.forEach(e => e === moves[i].name && result.push(e));
    }
    return result;
}

const getStep = (position, goal) => {
    const currentDistance = getDistance(position, goal);
    let result = null;
    for (let i = 0; i < moves.length; i++) {
        let newPosition = sumPoints(position, moves[i].value);
        const newDistance = getDistance(newPosition, goal);
        if (newDistance < currentDistance && (result === null || newDistance < result.newDistance)) {
            result = { newPosition, newDistance, step: moves[i] };
        }
    }

    return result;
}

function printShortestPath(n, i_start, j_start, i_end, j_end) {
    const start = { y: i_start, x: j_start };
    const end = { y: i_end, x: j_end };
    let path = [];
    let nextStep = getStep(start, end);
    while (nextStep !== null) {
        path.push(nextStep.step.name);
        if (nextStep.newDistance === 0) {
            break;
        }
        nextStep = getStep(nextStep.newPosition, end);
    }

    if (path.length === 0 || nextStep === null) {
        console.log('Impossible');
        return;
    } else {
        path = sortPath(path);
        console.log(path.length);
        console.log(path.join(' '));
    }
}

function main() {
    var n = parseInt(readLine());
    var i_start_temp = readLine().split(' ');
    var i_start = parseInt(i_start_temp[0]);
    var j_start = parseInt(i_start_temp[1]);
    var i_end = parseInt(i_start_temp[2]);
    var j_end = parseInt(i_start_temp[3]);
    printShortestPath(n, i_start, j_start, i_end, j_end);

}
