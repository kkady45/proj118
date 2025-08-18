const canvas = document.getElementById('interaction');
console.log('v1.0.1')
const canvContext = canvas.getContext('2d');

var FPS = 30;
var amountOfBalls = 4;
var ballSize = 30;
var horizontalDistance = 300;
var verticalDistance = 300;
var iteration = 1
    
function draw() {
    console.log('Updating balls..')
    canvContext.clearRect(0, 0, canvas.width, canvas.height);
    canvContext.fillStyle = 'black';
    canvContext.fillRect(0, 0, canvas.width, canvas.height);
    canvContext.fillStyle = 'green';
    leftBorder = (0.5 * canvas.width - 0.5 * canvas.height);
    for (i = 1; i <= amountOfBalls; i++) { //rows
        if (i == 1) {
            currentHeight = (canvas.height / amountOfBalls) - ((canvas.height / amountOfBalls) / 2);
        } else {
            currentHeight = currentHeight + (verticalDistance / 1000) * (canvas.height / amountOfBalls);
        }
        for (j = 0; j <= amountOfBalls - 1; j++) { //columns
            if (j == 0) {
                currentWidth = leftBorder;
            } else {
                currentWidth = currentWidth + (horizontalDistance / 1000) * (canvas.height / amountOfBalls);
            }
            canvContext.beginPath();
            canvContext.arc(currentWidth, currentHeight, (0.005 * ballSize * canvas.height) / amountOfBalls, 0, 2 * Math.PI); 
            canvContext.fill();
        }
    }
    console.log('Updated balls')

    // loot 1: horizontal (i<4): loop 2: vertical (i<4) = 4x4 grid
    //requestAnimationFrame(draw);
}

//setInterval(draw(), 1000);
console.log(0.005*circleSize*canvas.height)
draw();


