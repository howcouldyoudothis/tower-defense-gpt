let canvas = document.getElementById("game-canvas");
let ctx = canvas.getContext("2d");

// Define game variables
let score = 0;
let health = 100;
let resources = 500;

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Game loop function
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update game elements here (e.g., towers, enemies, etc.)
    updateTowers();
    updateEnemies();

    // Draw the game elements
    drawGameUI();

    requestAnimationFrame(gameLoop);
}

// Example function to update and draw game UI
function drawGameUI() {
    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
    ctx.fillText(`Health: ${health}`, 10, 40);
    ctx.fillText(`Resources: ${resources}`, 10, 60);
}

// Start game loop
gameLoop();
