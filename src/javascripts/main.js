import '../styles/main.scss';
import axios from 'axios';

const getJokeData = () => new Promise((resolve, reject) => {
  axios
    .get('https://official-joke-api.appspot.com/random_joke').then((jokeResponse) => {
      resolve(jokeResponse.data);
    }).catch((error) => reject(error));
});

const displayJoke = () => {
  getJokeData().then((joke) => {
    const setup = joke.setup;
    const punchline = joke.punchline;

    $('#setup').html(`${setup}`);
    $('#punchline').html(`${punchline}`);
  });
};

const eventListener = () => {
  $('body').on('click', '#get-joke-btn', (e) => {
    displayJoke();
    e.stopImmediatePropagation();
    $('#joke-container').css({ display: 'block' });
    $('#get-joke').css({ display: 'none' });
  });

  $('body').on('click', '#get-punchline-btn', (e) => {
    displayJoke();
    e.stopImmediatePropagation();
    $('#joke-container').css({ display: 'none' });
    $('#get-joke').css({ display: 'block' });
  });
};

const init = () => {
  getJokeData();
  eventListener();
};

init();
