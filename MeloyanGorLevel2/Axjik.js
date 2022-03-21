var LivingCreature = require("./Living")

module.exports = class Axjik extends LivingCreature {

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    // mul() {
    //     var emptyCells = this.chooseCell(0);
    //     var newCell = random(emptyCells);

    //     if (newCell && this.energy >= 14) {
    //         var newX = newCell[0];
    //         var newY = newCell[1];
    //         matrix[newY][newX] = this.index;

    //         var newAxjik = new Axjik(newX, newY, this.index);
    //         axjikArr.push(newAxjik);
    //     }
    // }

    move() {
        var emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            //  this.energy--;
        }

        this.die();
    }
    eat() {
        var emptyCells = this.chooseCell(3);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            this.energy++;

            console.log("minchev", flouwerArr.length);

            for (var i in flouwerArr) {
                if (newX == flouwerArr[i].x && newY == flouwerArr[i].y) {
                    flouwerArr.splice(i, 1);
                    console.log("heto", flouwerArr.length);

                    break;
                }
            }

            // this.mul();
        } else {
            this.move();
        }
    }

    die() {
        if (flouwerArr.length == 0) {
            for (var i in axjikArr) {
                if (this.x == axjikArr[i].x && this.y == axjikArr[i].y) {
                    axjikArr.splice(i, 1);
                    matrix[this.y][this.x] = 0;
                }
            }
        }
    }
}