var socket = io();

var side = 20;

function setup() {
    // for (var y = 0; y < 20; y++) {
    //     matrix[y] = [];
    //     for (var x = 0; x < 20; x++) {
    //         matrix[y][x] = random([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, ]);
    //     }
    // }

   
    createCanvas(20 * side, 20 * side);
    background('#acacac');

  
}

function drawing(matrix) {

    for (var y = 0; y < matrix[0].length; y++) { 
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("#8B008B");
                rect(x * side, y * side, side, side);
            }
        }
    }
}
socket.on('send matrix', drawing)


function kill(){
    socket.emit("kill",kill)
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addAxjik() {
    socket.emit("add Axjik")
}
function addFlouwer() {
    socket.emit("add Flouwer")
}
function addGishatich() {
    socket.emit("add Gishatich")
}
