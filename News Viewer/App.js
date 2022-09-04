// do something!
'use strict';

import { Nav, NewsList } from './components/index.js';

const get = (element) => document.querySelector(element);
const $root = get('#root');



let handlers = Symbol('handlers');

function makeObservable(target) {
  target[handlers] = [];
  target.observeFromProxy = function(handler) {
    this[handlers].push(handler);
  };

  return new Proxy(target, {
    set(target, property, value) {
      let success = Reflect.set(...arguments);
      if (success) {
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}



let categoryState = {category : 'all'};
categoryState = makeObservable(categoryState);


Nav($root, categoryState);
NewsList($root, categoryState);

