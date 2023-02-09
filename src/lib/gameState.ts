interface GameState {
  gameOver: boolean;
  score: number;
  lifes: number;
}

const newGameState: GameState = {
  gameOver: false,
  lifes: 3,
  score: 0,
};

const gameState: GameState = newGameState;

export function resetGameState(): void {
  gameState.gameOver = false;
  gameState.lifes = 3;
  gameState.score = 0;
}

export default gameState;
