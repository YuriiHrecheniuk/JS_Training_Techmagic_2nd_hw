import ErrorHandler from "./ErrorHandler.js";
import NodeBuilder from "./NodeBuilder.js";

export default class LyricsGenerator {

  // self-memoized function to fetch lyrics from API
  fetchLyrics(artist, title) {
    if (!this.fetchLyrics.lyricsCache) {
      this.fetchLyrics.lyricsCache = new Map();
    }

    if (this.fetchLyrics.lyricsCache.get(artist + title)) {
      return this.fetchLyrics.lyricsCache.get(artist + title);
    }

    return fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
      .then(ErrorHandler.fetchLyricsErr)
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
      node.appendChild(NodeBuilder.createParagraph('No lyrics found.'))
    } else {
      this.transformLyrics(lyrics)
        .forEach(paragraph => node.appendChild(paragraph))
    }

    return node;
  }

  transformLyrics(lyrics) {
    const paragraphs = [];
    const lyricsRows = lyrics
      .split('\n')
      .map(row => row.replace(/\r/, ''));

    lyricsRows.forEach(row => paragraphs.push(NodeBuilder.createParagraph(row)))

    return paragraphs;
  }
}
