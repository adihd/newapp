
console.clear();

// let points = 3;
var app = new Vue({
	el: '#app',
	data: {
		points: 1,
    newNameText: true,
    once: false
		// today: 0
	},methods: {
        formSubmit: function (event) {
          // alert(this.newNameText)
            // console.log(this.newNameText)
            // todo name must contain letters :)
            if (app.once){
              alert("nice try :) you can get more points tomorrow")
              document.getElementById("switch3").disabled = true;
              

            }else{
if (this.newNameText == true) {
                // this.guestName.push(this.newNameText)
                // this.newNameText = ""
                
                this.points = this.points - 1
                document.getElementById("secret").style.display = "none";
                app2.points -= 20
                console.log(this.points)
                
                
            } else {
                // alert("you have to enter a name darling :")
                this.points += 1
                document.getElementById("secret").style.display = "block";
                app2.points += 20
                console.log(this.points)
            }
            }
            

        }

	}}
)

var app2 = new Vue({
	el: '#app2',
	data: {
		points: 600 ,
		// today: 0
	}
})



let size = 5; // size x size tiles
let bombFrequency = 0.2; // percentage of bombs
let tileSize = 34;



const board = document.querySelectorAll('.board')[0];
let tiles;
let boardSize;

const restartBtn = document.querySelectorAll('.btn')[0];
const endscreen = document.querySelectorAll('.endscreen')[0]

// settings
const boardSizeBtn = document.getElementById('boardSize');
const tileSizeBtn = document.getElementById('tileSize');
const difficultyBtns = document.querySelectorAll('.difficulty');

let bombs = [];
let numbers = [];
let numberColors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e', '#7f8c8d', ];
let endscreenContent = {
	win: '<span>✔</span> you won!',
	loose: '💣 Booom! Game over.'
};

let gameOver = false;

/* clear board */
const clear = () => {
	// console.clear();
	gameOver = false;
	bombs = [];
	numbers = [];
	endscreen.innerHTML = '';
	endscreen.classList.remove('show');
	tiles.forEach(tile => {
		tile.remove();
	});

	setup();
}



/* setup the game */
const setup = () => {
	for (let i = 0; i < Math.pow(size, 2); i++) {
		const tile = document.createElement('div');
		tile.classList.add('tile');
		board.appendChild(tile);
	}
	adiBtn = document.getElementById("adi")
	tiles = document.querySelectorAll('.tile');
	boardSize = Math.sqrt(tiles.length);
	board.style.width = boardSize * tileSize + 'px';

	document.documentElement.style.setProperty('--tileSize', `${tileSize}px`);
	document.documentElement.style.setProperty('--boardSize', `${boardSize * tileSize}px`);

	let x = 0;
	let y = 0;
	tiles.forEach((tile, i) => {
		// set tile coordinates
		tile.setAttribute('data-tile', `${x},${y}`);

		// add bombs
		let random_boolean = Math.random() < bombFrequency;
		if (random_boolean) {
			bombs.push(`${x},${y}`);
			if (x > 0) numbers.push(`${x-1},${y}`);
			if (x < boardSize - 1) numbers.push(`${x+1},${y}`);
			if (y > 0) numbers.push(`${x},${y-1}`);
			if (y < boardSize - 1) numbers.push(`${x},${y+1}`);

			if (x > 0 && y > 0) numbers.push(`${x-1},${y-1}`);
			if (x < boardSize - 1 && y < boardSize - 1) numbers.push(`${x+1},${y+1}`);

			if (y > 0 && x < boardSize - 1) numbers.push(`${x+1},${y-1}`);
			if (x > 0 && y < boardSize - 1) numbers.push(`${x-1},${y+1}`);
		}

		x++;
		if (x >= boardSize) {
			x = 0;
			y++;
		}

		/* leftclick */
		if (app.points > 0) {
      
			tile.addEventListener('click', function () {
				if (app.points > 0) {
					let coordinate = tile.getAttribute('data-tile');
					if (!(bombs.includes(coordinate))) {
						// alert("hi")
						app.points -= 1
            document.getElementById("secret").style.display = "none";
            app.once = true
						// alert(app.points)
					}
					clickTile(tile);

				}
			});

		} else {
      document.getElementById("secret").style.display = "none";
			console.log("sdfsdfs")
		}

	});

	numbers.forEach(num => {
		let coords = num.split(',');
		let tile = document.querySelectorAll(`[data-tile="${parseInt(coords[0])},${parseInt(coords[1])}"]`)[0];
		let dataNum = parseInt(tile.getAttribute('data-num'));
		if (!dataNum) dataNum = 0;
		tile.setAttribute('data-num', dataNum + 1);
	});
}


/* check if bomb or not */
const clickTile = (tile) => {
	if (gameOver) return;
	if (tile.classList.contains('tile--checked') || tile.classList.contains('tile--flagged')) return;
	let coordinate = tile.getAttribute('data-tile');
	if (bombs.includes(coordinate)) {
		// endGame(tile);

		alert("💣you got some bonus points!💣");
		// app.points = 20
		tile.classList.add('tile--checked');
		// app.points += 1
    app2.points += 15
	} else {

		/* check if nearby bomb */
		let num = tile.getAttribute('data-num');

		if (num != null) {

			tile.classList.add('tile--checked');
			tile.innerHTML = num;

			tile.style.color = numberColors[num - 1];
			setTimeout(() => {
				checkVictory();
			}, 100);

			return;
		}

		// checkTile(tile, coordinate);

	}
	tile.classList.add('tile--checked');
}


/* clicked the right one */
const checkTile = (tile, coordinate) => {

	console.log('✔');
	let coords = coordinate.split(',');
	let x = parseInt(coords[0]);
	let y = parseInt(coords[1]);

	/* check nearby tiles */
	setTimeout(() => {
		if (x > 0) {
			let targetW = document.querySelectorAll(`[data-tile="${x-1},${y}"`)[0];
			clickTile(targetW, `${x-1},${y}`);
		}
		if (x < boardSize - 1) {
			let targetE = document.querySelectorAll(`[data-tile="${x+1},${y}"`)[0];
			clickTile(targetE, `${x+1},${y}`);
		}
		if (y > 0) {
			let targetN = document.querySelectorAll(`[data-tile="${x},${y-1}"]`)[0];
			clickTile(targetN, `${x},${y-1}`);
		}
		if (y < boardSize - 1) {
			let targetS = document.querySelectorAll(`[data-tile="${x},${y+1}"]`)[0];
			clickTile(targetS, `${x},${y+1}`);
		}

		if (x > 0 && y > 0) {
			let targetNW = document.querySelectorAll(`[data-tile="${x-1},${y-1}"`)[0];
			clickTile(targetNW, `${x-1},${y-1}`);
		}
		if (x < boardSize - 1 && y < boardSize - 1) {
			let targetSE = document.querySelectorAll(`[data-tile="${x+1},${y+1}"`)[0];
			clickTile(targetSE, `${x+1},${y+1}`);
		}

		if (y > 0 && x < boardSize - 1) {
			let targetNE = document.querySelectorAll(`[data-tile="${x+1},${y-1}"]`)[0];
			clickTile(targetNE, `${x+1},${y-1}`);
		}
		if (x > 0 && y < boardSize - 1) {
			let targetSW = document.querySelectorAll(`[data-tile="${x-1},${y+1}"`)[0];
			clickTile(targetSW, `${x-1},${y+1}`);
		}
	}, 10);
}


/* Bomb clicked -> end game */
// const endGame = (tile) => {
// 	console.log('💣 Booom! Game over.');
// 	endscreen.innerHTML = endscreenContent.loose;
// 	endscreen.classList.add('show');
// 	gameOver = true;
// 	tiles.forEach(tile => {
// 		let coordinate = tile.getAttribute('data-tile');
// 		if (bombs.includes(coordinate)) {
// 			tile.classList.remove('tile--flagged');
// 			tile.classList.add('tile--checked', 'tile--bomb');
// 			tile.innerHTML = '💣';
// 		}
// 	});
// }

const checkVictory = () => {
	let win = true;
	tiles.forEach(tile => {
		let coordinate = tile.getAttribute('data-tile');
		if (!tile.classList.contains('tile--checked') && !bombs.includes(coordinate)) win = false;
	});
	if (win) {
		endscreen.innerHTML = endscreenContent.win;
		endscreen.classList.add('show');
		gameOver = true;
	}
}



/* start game */
setup();

// adi strauss
// var clicked = false;
// var once = false;
// var x = document.getElementById("myDIV")

// function toggleBtnClick() {
//   // var img = document.getElementById('baseImg');
//   if (clicked) {
//     app.points -= 1
//     app2.points -= 20
//     x.innerHTML = "click me"

//     // img.src = 'http://via.placeholder.com/350x150/e9e9e9/000000';
//     clicked = false;
//   } else {
//     app.points += 1;
//     app2.points += 20;
//     // img.src = 'http://via.placeholder.com/350x150/3fafed/000000';
//     clicked = true;
//     once = false;
//     x.innerHTML = "good job"
//   }
// }

// $('button').on('click', function() {
//     $(this).disable();
// });

// settings



boardSizeBtn.addEventListener('change', function (e) {
	console.log(this.value);
	size = this.value;
	clear();
});

tileSizeBtn.addEventListener('change', function (e) {
	console.log(this.value);
	tileSize = this.value;
	clear();
});

difficultyBtns.forEach(btn => {
	btn.addEventListener('click', function () {
		console.log(this.value);
		bombFrequency = this.value;
		clear();
	});
});
// /* click button for new game */
// restartBtn.addEventListener('click', function (e) {
// 	e.preventDefault();
// 	clear();
// });


// console.log(`${boardSize} x ${boardSize} tiles`);
// console.log('bombs');
// console.log(bombs);
// console.log('numbers');
// console.log(numbers);

