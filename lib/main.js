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

window.$td.extend = (...args) => {
  let finalObj = {};
  args.forEach(obj =>{
    for(let key in obj){
      finalObj[key] = obj[key];
    }
  });
  return finalObj;
};

window.$td.ajax = (options) => {
  const req = new XMLHttpRequest();

  let defaults = {
    method: 'GET',
    url: `${window.location.href}`,
    dataType: "JSON",

    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: (r) => {console.log('success');},
    error: (r) => {console.log('error');},
    data: {}
  };

  options = $td.extend(defaults,options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET" && Object.keys(options.data).length > 0) {
    options.url += "?" + $td._query(options.data);
  }


  return new Promise((resolve, reject) => {
    req.open(`${options.method}`, `${options.url}`, true);
    req.onload = (e) => {

      if (req.status === 200) {
        const response = JSON.parse(req.response);
        options.success(response);
        resolve(response);
      } else {
        const response = JSON.parse(req.response);
        options.error(response);
        reject(response);
      }
    };

    req.send(JSON.stringify(options.data));

  });



};


//helper

$td._query = (data) => {
  let result = '';

  for(let el in data) {
    if (data.hasOwnProperty(el)) {
      result += el + '=' + data[el] + '&';
    }
  }
  return result.substring(0, result.length - 1);
};
