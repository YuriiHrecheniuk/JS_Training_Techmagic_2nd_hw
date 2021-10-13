export default class ErrorHandler {
  static fetchLyricsErr(response) {
    if (!response.ok)
      throw Error(response.statusText);

    return response.json();
  }
}