class DOMNodeCollection {
  constructor(elements) {
    this.htmlElements = elements;
  }

  each(callback) {
    this.htmlElements.forEach(callback);
  }

  html(string) {
    if (typeof string === 'string') {
      this.each((el) => {
        el.innerHTML = string;
      });
    } else {
      if (this.htmlElements.length > 0) {
        return this.htmlElements[0].innerHTML;
      }
    }
  }

  empty() {
    this.each((el) => {
      el.innerHTML = "";
    });
  }

  append(arg) {
    if (this.htmlElements.length === 0) return;

    if (typeof arg === HTMLElement) {
      arg = $td(el);
    }

    if (typeof arg === 'string') {
      this.each((el) => el.innerHTML += arg);
    } else if (arg instanceof DOMNodeCollection) {
      this.each((el) => {
        el.each((el2) => {
          let el2Clone = el2.cloneNode(true);
          el.appendChild(el2Clone);
        });
      });
    }

    // if (typeof arg === 'string') {
    //     let inner = el.innerHTML;
    //     el.innerHTML = inner + arg;
    //   }
    //   else if (typeof arg === HTMLElement){
    //     el.appendChild(arg);
    //   }
    //   else{
    //     arg.htmlElements.forEach(el2 => {
    //       let elClone = el2.cloneNode(true);
    //       // debugger
    //       el.appendChild(elClone);
    //     });
    //   }
  }

  attr(...string) {
    if (string.length === 1) {
      return this.htmlElements[0].getAttribute(string[0]);
    } else {
      this.each((el) => el.setAttribute(string[0], string[1]));
    }

  }

  addClass(arg) {
    this.each((el) => el.classList.add(arg));
  }

  removeClass(arg) {
    this.each((el) => el.classList.remove(arg));
  }

  toggleClass(arg) {
    this.each((el) => e.classList.toggle(arg));
  }

  children() {
    let children = new DOMNodeCollection([]);
    this.each((parent) => {
      children.htmlElements.push(parent.getElementsByTagName("*"));
    });
    return children;
  }

  parent() {
    let parent = new DOMNodeCollection([]);
    this.each((el) => parent.htmlElements.push((el.parentNode)));
    return parent;
    // fix so multiple children of same parent don't all return parents
  }

  find(selector) {
    let found = new DOMNodeCollection([]);
    let children = this.children();
    this.each((el) => {
      el.querySelectorAll(selector).forEach(el2 => {
        found.htmlElements.push(el2);
      });
    });
    return found;
  }

  remove() {
    this.each((el) => {
      el.outerHTML = "";
    });
    this.htmlElements = [];

  }

  on(type, eventCallback) {

    this.each((el) => {
      el.addEventListener(type, eventCallback);
      let key = `new${type}`;
      // debugger
      if (el[key] === undefined) {

        el[key] = [];
      }

      el[key].push(eventCallback);
    });
  }

  off(type) {
    this.each((el) => {
      let key = `new${type}`;
      if (el[key]) {
        el[key].forEach((callback) => {
          el.removeEventListener(type, callback);
        });
      }
      el[key] = [];
    });
  }


}

export default DOMNodeCollection;
