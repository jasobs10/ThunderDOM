import DOMNodeCollection from './dom_node_collection';

let functions = [];

window.$td = (selector) => {
  if (typeof selector !== 'function') {
    const selectorArray = [];
    const nodeCollection = new DOMNodeCollection();

    if (selector instanceof HTMLElement) {

      nodeCollection.htmlElements = [selector];

    } else {
      document.querySelectorAll(selector).forEach((el) => selectorArray.push(el));
      nodeCollection.htmlElements = selectorArray;
    }
    return nodeCollection;
  } else {
    if (document.readyState === 'complete') {
      func();
    } else {
      functions.push(selector);
    }
  }


};

document.addEventListener("DOMContentLoaded", () => {
  functions.forEach((func) => func());
});
