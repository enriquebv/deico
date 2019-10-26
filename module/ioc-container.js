import isFunction from "is-function";

export default class IocContainer {
  constructor() {
    this.dependencies = {};

    return this;
  }

  /**
   * Get a dependency from the container.
   * @param {String} name The name of the registered dependency.
   */
  get(name) {
    const { dependencies } = this;

    if (dependencies[name] === undefined) {
      throw new Error(`Dependecy ${name} not exists in the container.`);
    }

    return dependencies[name](this);
  }

  /**
   * Registers a dependency in the container.
   * @param {String} name The name to use the dependency later.
   * @param {Function} factory The function who returns the dependency.
   */
  register(name, factory) {
    const { dependencies } = this;

    if (name === undefined || factory === undefined) {
      throw new Error(
        `You need to provide a name and a factory function to register a dependency.`
      );
    }

    if (
      name === "register" ||
      name === "remove" ||
      name === "update" ||
      name === "get"
    ) {
      throw new Error(
        `Can't register ${name} as dependency, it's a container reserved keword.`
      );
    }

    if (dependencies[name] !== undefined) {
      throw new Error(
        `Dependecy ${name} is already in the container. Use container method "udpate" to override the factory of ${name}.`
      );
    }

    if (!isFunction(factory)) {
      throw new Error(
        `Can't register ${name} if the second parameter it's not a function.`
      );
    }

    dependencies[name] = factory;
    this[name] = this.get(name);
  }

  /**
   * Removes a depedency from the container.
   * @param {String} name The name of the dependency to remove it.
   */
  remove(name) {
    const { dependencies } = this;

    if (dependencies[name] === undefined) {
      throw new Error(`Dependecy ${name} not exists in the container.`);
    }

    delete dependencies[name];
  }

  /**
   * Overrides a dependency from the container.
   * @param {String} name The already registered depedency.
   * @param {Function} factory The new dependency.
   */
  update(name, factory) {
    const { dependencies } = this;

    if (dependencies[name] === undefined) {
      throw new Error(`Dependecy ${name} not exists in the container.`);
    }

    dependencies[name] = factory;
  }
}
