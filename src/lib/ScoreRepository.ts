interface ScoreRepository {
  storeHighscore: (score: number, storage: Storage) => number;
}

const HIGHSCORE_KEY = 'HIGHSCORE';

function storeHighscore(score: number, storage: Storage): number {
  const currentHighScore = storage.getItem(HIGHSCORE_KEY);

  if (currentHighScore === null || score > parseInt(currentHighScore)) {
    storage.setItem(HIGHSCORE_KEY, score.toString());
    return score;
  }

  return parseInt(currentHighScore);
}

const scoreRepository: ScoreRepository = {
  storeHighscore: storeHighscore,
};

export default scoreRepository;
