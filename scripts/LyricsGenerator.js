export default class LyricsGenerator {

  // closure function that counts number of requests
  // user did during the session
  // lexical environments:
  // 1. requestsCounter { counter: 0, anonymous: fn }
  // 2. anonymous {}
  requestsCounter() {
    let counter = 0;

    return () => counter += 1
  }

  fetchLyrics(artist, title) {
    return fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
      .then(response => response.json())
      .then(data => console.log(data));
  }
}