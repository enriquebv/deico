import { IocContainer, IocInjector } from "./module";

const container = new IocContainer();

const hash = string => `52345234-${string}-5234523`;

container.register("hasher", container => hash);

class Test extends IocInjector {
  test() {
    return this.container.get("hasher")("test");
  }
}

container.register("test", container => new Test(container));

const tist = new Test(container);

console.info(tist.test());
