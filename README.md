# deico

Simple **De**ndency **I**njection **Co**ntainer for Node.js

- Register dependencies:
  - Common values: Numbers, strings, arrays, functions, objects, everything.
  - Factories: Fresh created object instances every time you need it.

## How to use it

### Install

```bash
npm i deico -S

// or

yarn add deico
```

### Getting started

deico it's easy to use:

1. Add dependencies with `add` method.
2. Use that dependencies with `get` method.
3. Add factories using `addFactory` method.

> **All** dependencies must be added with an anonymous function:
>
> - If the dependency it's a common one, the container will execute **one time** that anonoymous function and will store the result.
> - If the dependency its a factory, the container will execute that anonymous function every time it's used `get`, and returns that result.

> You can access to your dependencies like a object parameter, to use destructuring and make your code cleaner. The factories will keep working.

```js
const { Container } = require("deico");

// Create the container
const container = new Container();

const joinWords = array => array.join(" ");

// Add a value
container.add("messageChunks", ["Hello", "world!"]);

// Add a function
container.add("joinWords", () => joinWords);

// Use both
container.add("sayHello", container => {
  return container.get("joinWords")(container.get("messageChunks"));
});

// Use both (with destructuring)
container.add("sayHelloBetter", container => {
  const { joinWords, messageChunks } = container;

  return joinWords(messageChunks);
});

console.info(container.get("sayHello")); // "Hello world!"
console.info(container.get("sayHelloBetter")); // "Hello world!"
```

### Usage with factories

```js
const { Container } = require("deico");

const container = new Container();

const randomNumber = () => Math.round(Math.random(1, 100) * (100 - 1) + 1);

// Common
container.add("commonDependency", () => randomNumber());

// Factory
container.addFactory("factoryDependency", () => randomNumber());

// Call multiple times to see the result

for (let i = 0; i < 5; i++) {
  console.info(container.get("commonDependency"));
}
// You will see the same number every time.

for (let i = 0; i < 5; i++) {
  console.info(container.get("factoryDependency"));
}
// The number is different every time.
```

## Author

- Enrique Bernabeu

## License

This project is licensed under the MIT License
