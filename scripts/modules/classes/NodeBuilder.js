export default class NodeBuilder {
  static createParagraph(text) {
    const paragraph = document.createElement('p');
    paragraph.innerText = text;

    return paragraph;
  }
}