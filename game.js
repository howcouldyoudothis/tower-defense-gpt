let canvas = document.getElementById("game-canvas");
let ctx = canvas.getContext("2d");

let money = 500;
let towers = [];
let enemies = [];
let selectedTower = null;
let gameStarted = false;
let enemySpeed = 2; // Speed at which the enemies move

// Set canvas size
canvas.width = 600;
canvas.height = 600;

// Define grid size (each cell is 60x60)
let gridSize = 60;

// Function to draw the grid
function drawGrid() {
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    ctx.strokeStyle = "#ddd";
    ctx.stroke();
}

// Function to handle placing towers
canvas.addEventListener("click", function(event) {
    if (!selectedTower || money <= 0 || !gameStarted) return;

    // Get grid position based on click
    let x = Math.floor(event.offsetX / gridSize) * gridSize;
    let y = Math.floor(event.offsetY / gridSize) * gridSize;

    // Check if the tower already exists at that location
    if (towers.some(tower => tower.x === x && tower.y === y)) return;

    // Place the selected tower
    towers.push({ x, y, color: selectedTower });
    money -= 50; // Decrease money for placing a tower
    updateMoneyDisplay();
    drawTowers();
});

// Function to update the money display
function updateMoneyDisplay() {
    document.getElementById("money").textContent = `Money: $${money}`;
}

// Draw towers on the grid
function drawTowers() {
    towers.forEach(tower => {
        ctx.fillStyle = tower.color;
        ctx.fillRect(tower.x, tower.y, gridSize, gridSize);
    });
}

// Event listeners for tower selection from the sidebar
let towerElements = document.querySelectorAll(".tower");
towerElements.forEach(towerElement => {
    towerElement.addEventListener("click", function() {
        selectedTower = this.dataset.tower;
    });
});

// Function to start the game (spawn enemies, etc.)
document.getElementById("start").addEventListener("click", function() {
    if (!gameStarted) {
        gameStarted = true;
        startGame();
    }
});

// Example: Spawn enemies and move them
function startGame() {
    let enemy = { 
        x: 0, 
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
        direction: 1  // Move right initially
    };
    enemies.push(enemy);
    spawnEnemies();
}

// Spawn enemies randomly and move them along the path
function spawnEnemies() {
    let interval = setInterval(function() {
        if (!gameStarted) {
            clearInterval(interval);
            return;
        }
        
        // Update enemy positions
        enemies.forEach(enemy => {
            enemy.x += enemySpeed;

            // Check for enemies reaching the end (right side of the screen)
            if (enemy.x > canvas.width) {
                enemies = enemies.filter(e => e !== enemy);  // Remove the enemy
                money += 100;  // Reward for killing an enemy
                updateMoneyDisplay();
            }
        });

        // Redraw game elements
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        drawTowers();
        drawEnemies();
    }, 100);
}

// Draw enemies on the grid
function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.fillStyle = "#FF0000"; // Red color for enemies
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, 20, 0, 2 * Math.PI);
        ctx.fill();
    });
}

// Initialize the game screen
drawGrid();
