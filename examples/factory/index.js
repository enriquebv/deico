const { Container } = require("../../lib");

const container = new Container();

const randomNumber = () => Math.round(Math.random(1, 100) * (100 - 1) + 1);

// Common dependency
container.add("commonDependency", () => randomNumber());

// Factory dependency
container.addFactory("factoryDependency", () => randomNumber());

// Now call multiple times to see the result
console.info("Common dependency:");
for (let i = 0; i < 5; i++) {
  console.info(container.get("commonDependency"));
}
console.info("\n");

console.info("Factory dependency:");
for (let i = 0; i < 5; i++) {
  console.info(container.factoryDependency);
}
