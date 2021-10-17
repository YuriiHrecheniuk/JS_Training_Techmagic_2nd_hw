import LyricsGenerator from "./modules/classes/LyricsGenerator.js";
import counter from "./modules/counter.js"
import getQuote from "./modules/getQuote.js";

// ----------Session time----------
// 1st asynchronous operation
const sessionTime = document.getElementById('session-time');
let sessionTimeCounter = counter();
const time = {
  min: 0,
  sec: 0
}

setInterval(() => {
  if (time.sec === 59) {
    sessionTimeCounter = counter();
    time.min += 1;
  }
  time.sec = sessionTimeCounter() - 1;
  sessionTime.innerText = `${time.min} min ${time.sec} sec`;
  }, 1000);
// --------------------------

// ------------Get lyrics---------
// 2nd asynchronous operations
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
// ----------------------------------


// ------------Requests Counter-----
searchField.addEventListener('submit', updateCounter);

const requestsNumber = document.getElementById('requests-number');

let requestsCounter;

function updateCounter(event) {
  event.preventDefault()

  if (!requestsCounter) {
    requestsCounter = counter();
  }

  requestsNumber.innerText = requestsCounter();
}

// --------------------------------

// -------Get random Kanye quote----
// 3rd asynchronous operation

const randomKanyeQuoteBtn = document.getElementById('random-kanye-quote');

randomKanyeQuoteBtn.addEventListener('click', () => getQuote().then(data => alert(data.quote)));
