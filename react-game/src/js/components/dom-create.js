export default class Create {
  constructor(tagName = 'div', parent, classNames = '', content = '') {
    const element = document.createElement(tagName);
    if (classNames) {
      const classList = classNames.split(',');
      classList.forEach((className) => {
        element.classList.add(className.trim());
      });
    }
    if (content !== '') element.innerHTML = content;
    if (parent) parent.appendChild(element);
    this.node = element;
  }
}
