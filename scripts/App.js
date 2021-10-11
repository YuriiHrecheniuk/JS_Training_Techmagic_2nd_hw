import LyricsGenerator from "./LyricsGenerator.js";

const lyricsGenerator = new LyricsGenerator();

const request = await lyricsGenerator.fetchLyrics('Bones', 'HDMI');


// console.log(request)
const lyricsNode = document.getElementById('lyrics-div')

lyricsNode.appendChild(lyricsGenerator.makeLyricsNode(request))