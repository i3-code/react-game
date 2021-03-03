const cookieVersion = 1;
const cookieName = 'react-game-settings-2021q1';
const scoreName = 'react-game-score-2021q1';

export function loadSettings() {
  const settings = JSON.parse(localStorage.getItem(cookieName)) || {
    sound: 20,
    music: 10,
    difficulty: 0,
    color: 'primary',
    locale: 'en',
    level: 1,
    score: 0,
    time: 30,
    lives: 3,
    cookieVersion,
  };
  const savedVersion = settings.cookieVersion;
  if (savedVersion !== cookieVersion) localStorage.clear();
  return settings;
}

export function saveSettings(settingsPatch = {}) {
  const settings = loadSettings();
  const newSettings = { ...settings, ...settingsPatch };
  localStorage.setItem(cookieName, JSON.stringify(newSettings));
}

export function loadScore() {
  const score = JSON.parse(localStorage.getItem(scoreName)) || [
    { score: 0, level: 1, difficulty: 0 },
    { score: 0, level: 1, difficulty: 0 },
    { score: 0, level: 1, difficulty: 0 },
    { score: 0, level: 1, difficulty: 0 },
    { score: 0, level: 1, difficulty: 0 },
    { score: 0, level: 1, difficulty: 0 },
    { score: 0, level: 1, difficulty: 0 },
    { score: 0, level: 1, difficulty: 0 },
    { score: 0, level: 1, difficulty: 0 },
    { score: 0, level: 1, difficulty: 0 },
  ];
  return score;
}

export function saveScore(newScore = { score: 0, level: 1, difficulty: 0 }) {
  const score = loadScore();
  score.shift();
  score.push(newScore);
  localStorage.setItem(scoreName, JSON.stringify(score));
}
