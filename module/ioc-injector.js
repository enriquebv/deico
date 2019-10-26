export default class IocInjector {
  constructor(container) {
    if (container === undefined) {
      throw new Error(
        "Class extending from Ioc needs to have container."
      );
    }
    
    this.container = container;
  }
}
