declare namespace Mocha {
  // NOTE @types/mocha don't have `retries` method in MochaGlobals
  interface MochaGlobals {
    retries: (n: number) => MochaGlobals;
  }

  interface Context {
    config: import("creevey/lib/types").Config;
    browser: import("selenium-webdriver").WebDriver;
    browserName: string;
    testScope: string[];
  }

  interface SuiteFunction {
    (title: string, fn: (this: Suite) => void): Suite | Suite[];
    only: ExclusiveSuiteFunction;
    skip: PendingSuiteFunction;
  }

  interface ExclusiveSuiteFunction {
    (browsers: string[], title: string, fn: (this: Suite) => void): Suite | Suite[];
  }

  interface PendingSuiteFunction {
    (browsers: string[], title: string, fn: (this: Suite) => void): Suite | Suite[];
  }

  interface TestFunction {
    only: ExclusiveTestFunction;
    skip: PendingTestFunction;
  }

  interface ExclusiveTestFunction {
    (browsers: string[], title: string, fn?: AsyncFunc): Test;
  }

  interface PendingTestFunction {
    (browsers: string[], title: string, fn?: AsyncFunc): Test;
  }
}