import Create from './dom-create';

export default class Image extends Create {
  constructor(src, parent, classNames = '') {
    super('div', parent, classNames);
    const image = new Create('img', this.node);
    image.node.src = src;
    this.image = image;
  }
}
