export default function getQuote() {
  return fetch('https://api.kanye.rest')
    .then(response => response.json())
}