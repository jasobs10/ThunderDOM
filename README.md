# ThunderDOM

![Demo Screenshot](/assets/demo.gif)

ThunderDOM is a lightweight JavaScript DOM Manipulation Library with tools to create, traverse, and manipulate DOM elements, set event handlers, and make front-end API requests. It reduces file size and loading speed by only implementing essential function.

[Live Demo](http://thunderdom.bitballoon.com/) which uses ThunderDOM to make AJAX requests and manipulate/traverse DOM elements.



## Installation

To use ThunderDOM, include the following script tag in the header of your document:

```html
<script src="https://gitcdn.link/repo/jasobs10/ThunderDOM/master/lib/thunderdom.min.js" type="text/javascript"></script>
```

## Usage

### Object Methods

##### `$td`
- Can accept a string selector
  ```javascript
  const heading = $td('h1');
  ```

- Can accept a function to be added as Ready callbacks
  ```javascript
  $td(() => {
    console.log("Content Loaded");
  });
  ```

##### `extend`
- Merges objects

  ```javascript
  const objectA = {a: 'a', b: 'a', c: 'a'};
  const objectB = {b: 'b', c: 'b'};
  const objectC = {c: 'c'};
  $td.extend(objectA, objectB, objectC); //=> {a: 'a', b: 'b', c: 'c'}
  objectA //=> {a: 'a', b: 'b', c: 'c'}
  ```

##### `ajax`
- Creates an asynchronous call and returns a `Promise` object

  ```javascript
  $td.ajax({
    method: 'get',
    url: 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true',
    success: (res) => console.log('success'),
    error: (res) => console.log('error')
  }).then(
    () => console.log('promise resolved'),
    () => console.log('promise rejected')
  );
  ```

### Manipulation Methods

##### `html(string)`
- Sets the content of the element

  ```javascript
    $td('p').html('This is a paragraph'); // <p>This is a paragraph</p>
  ```

##### `empty()`
- Empties the content of the element
```javascript
  $td('p').empty(); // <p></p>
```

##### `remove()`
- Removes the element from the document
```javascript
  $td('p').remove();
```

##### `append(string) / append(object)`
- Adds a child element or object to parent
```javascript
  $td('ul').append('<li>list item</li>');

  const parent = $td('ul');
  const child = $td('li');
  parent.append(child);
```

##### `addClass(className)`
- Adds a class to an element
```javascript
  $td('div').addClass('hidden'); // <div class='hidden' />
```

##### `removeClass(className)`
- Removes a class from an element
```javascript
  $td('div').removeClass('hidden'); // <div />
```

##### `toggleClass(className)`
- Toggles a class for an element
```javascript
  $td('div').toggleClass('hidden'); // <div class='hidden' />
  $td('div').toggleClass('hidden'); // <div />
```

### Traversal Methods

##### `parent`
- Returns DOMNode object of the node's parents
```javascript
  $td('li').parent(); // [ul]
```

##### `children`
- Returns DOMNode object of the node's children
```javascript
  $td('ul').children(); // [li, li, li]
```

##### `find`
- Returns a DOMNode of all the nodes matching the selector passed in as an argument that are descendants of the nodes
```javascript
  $td('ul').find('li'); // [li, li, li]
```

### Event Handlers

##### `on(event, callback)`
- Adds an event listener to the element
- Event listeners can be chained
```javascript
  $td('li').on('click', () => console.log('clicked!'))
          .on('hover', () => console.log('hovered!'));
```

##### `off(event)`
- Removes an event listener from the element
```javascript
  $td('li').off('click');
```
