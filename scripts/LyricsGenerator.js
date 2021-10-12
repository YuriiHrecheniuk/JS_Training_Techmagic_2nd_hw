export default class LyricsGenerator {

  // closure function that counts number of requests
  // user did during the session
  // lexical environments:
  // 1. requestsCounter { counter: 0, anonymous: fn }
  // 2. anonymous {}
  requestsCounter() {
    let counts = 0;

    return () => counts += 1;
  }


  // self-memoized function to fetch lyrics from API
  fetchLyrics(artist, title) {
    if (!this.fetchLyrics.lyricsCache) {
      this.fetchLyrics.lyricsCache = new Map();
    }

    if (this.fetchLyrics.lyricsCache.get(artist + title)) {
      return this.fetchLyrics.lyricsCache.get(artist + title);
    }

    return fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
      .then(response => {
        if (!response.ok)
          throw Error(response.statusText)

        return response.json()
      })
      .then(data => data.lyrics)
      .catch(() => 'No lyrics found')
      .then(lyrics => {
        this.fetchLyrics.lyricsCache.set(artist + title, lyrics);
        return lyrics;
      })
  }

  makeLyricsNode(lyrics) {
    const node = document.createElement('div');

    if (lyrics === 'No lyrics found') {
      node.appendChild(this.createParagraph('No lyrics found.'))
    } else {
      this.transformLyrics(lyrics)
        .forEach(paragraph => node.appendChild(paragraph))
    }

    return node;
  }

  createParagraph(text) {
    const paragraph = document.createElement('p');
    paragraph.innerText = text;

    return paragraph;
  }

  transformLyrics(lyrics) {
    const paragraphs = [];
    const lyricsRows = lyrics
      .split('\n')
      .map(row => row.replace(/\r/, ''));

    lyricsRows.forEach(row => paragraphs.push(this.createParagraph(row)))

    return paragraphs;
  }
}
