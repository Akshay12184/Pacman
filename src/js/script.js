document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');

    let playerPosition = { x: 1, y: 1, z: 0 };
    let score = 0;

    const grid = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1],

        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],

        [1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const createGrid = () => {
        grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellDiv = document.createElement('div');
                if (cell === 1) {
                    cellDiv.classList.add('wall');
                } else if (cell === 0) {
                    cellDiv.classList.add('empty');
                    const random = Math.random();
                    if (random < 0.1) {
                        cellDiv.classList.add('small-pellet');
                    } else if (random < 0.15) {
                        cellDiv.classList.add('power-pellet');
                    }
                }
                gridContainer.appendChild(cellDiv);

                if (rowIndex === playerPosition.y && colIndex === playerPosition.x) {
                    cellDiv.classList.add('player');
                    cellDiv.style.zIndex = playerPosition.z;
                }
            });
        });
    };

    const renderPlayer = () => {
        gridContainer.querySelectorAll('.player').forEach(cell => {
            cell.classList.remove('player');
        });

        const playerCell = gridContainer.querySelector(`.grid div:nth-child(${playerPosition.y * grid[0].length + playerPosition.x + 1})`);
        if (playerCell.classList.contains('small-pellet')) {
            score += 10;
            playerCell.classList.remove('small-pellet');
        } else if (playerCell.classList.contains('power-pellet')) {
            score += 50;
            playerCell.classList.remove('power-pellet');
        }

        playerCell.classList.add('player');
        playerCell.style.zIndex = playerPosition.z;

        scoreDisplay.innerText = `Score: ${score}`;
    };

    const calculateNewZIndex = () => {
        return playerPosition.z;
    };

    const movePlayer = (dx, dy) => {
        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;

        if (isValidMove(newX, newY)) {
            playerPosition.x = newX;
            playerPosition.y = newY;
            playerPosition.z = calculateNewZIndex();
            renderPlayer();
        } else {
            console.log(`Cannot move to: (${newX}, ${newY})`);
        }
    };

    const isValidMove = (x, y) => {
        return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length && grid[y][x] !== 1;
    };

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'w':
                movePlayer(0, -1);
                break;
            case 'a':
                movePlayer(-1, 0);
                break;
            case 's':
                movePlayer(0, 1);
                break;
            case 'd':
                movePlayer(1, 0);
                break;
            default:
                break;
        }
    });

    createGrid();
    renderPlayer();
});
