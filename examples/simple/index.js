const { Container } = require("../../lib");

const container = new Container();

const joinWords = array => array.join(" ");

// Register an object
container.add("messageChunks", ["Hello", "world!"]);

// Register a function
container.add("joinWords", () => joinWords);

// Use both (with get)
container.add("sayHello", container => {
  return container.get("joinWords")(container.get("messageChunks"));
});

// Use both (without get)
container.add("sayHelloBetter", container => {
  const { joinWords, messageChunks } = container;

  return joinWords(messageChunks);
});

console.info(container.get("sayHello"));
console.info(container.get("sayHelloBetter"));
