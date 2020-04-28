let canvas = document.querySelector('canvas');

canvas.width = 1000;
canvas.height = 300;

let c = canvas.getContext('2d');

let digit = 0;
let count = 0;
let m2;
let timeStep;
let block1, block2;

let counter = document.querySelector('#pi');
let inputValue = document.getElementById('input');
let sound = document.getElementById('audio');
let btn = document.querySelector('button');

let getInput;

inputValue.addEventListener('change', function() {
	count = 0;
	getInput = parseInt(this.value);
	digit = getInput;
	m2 = Math.pow(100, digit - 1);
	timeStep = Math.pow(10, digit - 1);

	block1 = new Block(200, 249, 50, 0, 1);
	block2 = new Block(400, 149, 150, -2 / timeStep, m2);
});


function list() {
	c.clearRect(0, 0, canvas.width, canvas.height);
	block1.move();
	block1.drawBlock(c, '#6E9B29');
	block2.move();
	block2.drawBlock(c, '#F29E24');
	counter.textContent = `Number: ${count}`;
}

function playAudio() {
	sound.volume = 0.1;
	sound.play();
}

function pauseAudio() {
	sound.volume = 0.1;
	sound.pause();
}

function animate() {
	requestAnimationFrame(animate);
	for (let i = 0; i < timeStep; i++) {
		list();
		if (block1.hit(block2)) {
			let v1 = block1.bounce(block2);
			let v2 = block2.bounce(block1);
			block1.v = v1;
			block2.v = v2;
			count++;
			playAudio();
		}
		if (block1.hitWall()) {
			block1.bounceWall();
			count++;
			playAudio();
		}
	}
}

btn.addEventListener('click', function(){
	count = 0;
	animate();
});
