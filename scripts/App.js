import LyricsGenerator from "./LyricsGenerator.js";

const lyricsGenerator = new LyricsGenerator();

const searchField = document.getElementById('search-field');
const artistInput = searchField.querySelector('#artist-input');
const titleInput = searchField.querySelector('#title-input');

const lyricsField = document.getElementById('lyrics-field');

searchField.addEventListener('submit', renderLyrics);

async function renderLyrics(event) {
  event.preventDefault();

  if (lyricsField.children.length > 1) {
    lyricsField.removeChild(lyricsField.lastChild);
  }

  const artist = artistInput.value;
  const title = titleInput.value;

  const lyrics = await lyricsGenerator.fetchLyrics(artist, title);

  await lyricsField.appendChild(lyricsGenerator.makeLyricsNode(lyrics));
}

searchField.addEventListener('submit', updateCounter);

const requestsNumber = document.getElementById('requests-number');

let requestsCounter;

function updateCounter(event) {
  event.preventDefault()

  if (!requestsCounter) {
    requestsCounter = lyricsGenerator.requestsCounter();
  }

  requestsNumber.innerText = requestsCounter();
}