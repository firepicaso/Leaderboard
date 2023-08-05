import './style.css';

const name = document.getElementById('user');
const score = document.getElementById('score');
const submit = document.querySelector('.form');
const refresh = document.querySelector('.refresh');
const scoreList = document.querySelector('.score-list');

const submitScore = async (event) => {
  event.preventDefault();
  const userData = {
    user: name.value,
    score: score.value,
  };

  if (!name.value || !score.value) {
    return;
  }

  await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/A1L7fWrCX6woYaIwlf9P/scores/', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  });

  name.value = '';
  score.value = '';
};

const refreshScores = async () => {
  const apiObject = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/A1L7fWrCX6woYaIwlf9P/scores/');
  const scoreData = await apiObject.json();
  const scores = scoreData.result;

  scoreList.innerHTML = '';
  scores.forEach((score) => {
    const scoreLine = `<li class="score-list">${score.user}: ${score.score}</li>`;
    scoreList.insertAdjacentHTML('beforeend', scoreLine);
  });
};

submit.addEventListener('submit', submitScore);
refresh.addEventListener('click', refreshScores);