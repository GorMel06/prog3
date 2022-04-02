var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3004);

matrix = [];
flouwerArr = [];
grassArr = [];
grassEaterArr = [];
gishatichArr = [];
axjikArr = [];

var n = 50;

Grass = require("./Grass")
GrassEater = require("./GrassEater")
Axjik = require("./Axjik")
Flouwer = require("./Flouwer")
Gishatich = require("./Gishatich")

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 6))

    }
}

io.sockets.emit('send matrix', matrix)



function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 2);
                grassEaterArr.push(ge);
            }
            else if (matrix[y][x] == 3) {
                var fl = new Flouwer(x, y, 3);
                flouwerArr.push(fl);
            }
            else if (matrix[y][x] == 4) {
                var gi = new Gishatich(x, y, 4);
                gishatichArr.push(gi);
            }
            else if (matrix[y][x] == 5) {
                var ax = new Axjik(x, y, 5);
                axjikArr.push(ax);
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}

function kill() {
    grassArr = [];
    grassEaterArr = [];
    axjikArr = [];
    flouwerArr = [];
    gishatichArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrassEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0, 1) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addFlouwer() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            flouwerArr.push(new Flouwer(x, y, 3))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addAxjik() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
            axjikArr.push(new Axjik(x, y, 5))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGishatich() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
            gishatichArr.push(new Gishatich(x, y, 4))
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function game() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in gishatichArr) {
        gishatichArr[i].eat();
    }
    for (var i in axjikArr) {
        axjikArr[i].eat();
    }
    for(var i in gishatichArr) {
        gishatichArr[i].die();
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)



io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add Axjik", addAxjik);
    socket.on("add Flouwer", addFlouwer);
    socket.on("add Gishatich", addGishatich);
});

var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.gishatic = gishatichArr.length;
    statistics.axjik = axjikArr.length;
    statistics.flouwer = flouwerArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)