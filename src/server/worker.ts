import fs from "fs";
import path from "path";
import chai from "chai";
import Mocha, { Suite, Context } from "mocha";
import { Config, Test } from "../types";
import { getBrowser, switchStory } from "../utils";
import chaiImage from "../mocha-ui/chai-image";

// After end of each suite mocha clean all hooks and don't allow re-run tests without full re-init
// @ts-ignore see issue for more info https://github.com/mochajs/mocha/issues/2783
Suite.prototype.cleanReferences = () => {};

// define chai image
//

// TODO ui
// TODO onError, unhandlerRejection

export default async function worker(config: Config) {
  const mocha = new Mocha();
  const browserName = process.env.browser as string;
  const browser = await getBrowser(config, browserName);
  const testScope: string[] = [];

  chai.use(chaiImage(config, testScope));

  fs.readdirSync(config.testDir).forEach(file => {
    mocha.addFile(path.join(config.testDir, file));
  });

  mocha.suite.beforeAll(function(this: Context) {
    this.config = config;
    this.browser = browser;
    this.browserName = browserName;
    this.testScope = testScope;
  });
  mocha.suite.beforeEach(switchStory);

  // TODO Custom reporter => collect fail results => on end send fail results

  process.on("message", message => {
    // TODO path reverse
    const test: Test = JSON.parse(message);
    const testPath = [...test.path].reverse().join(" ");

    console.log(browserName, testPath);

    mocha.grep(testPath);
    mocha.run(failures => {
      if (process.send) {
        if (failures > 0) {
          process.send(JSON.stringify({ status: "failed" }));
        } else {
          process.send(JSON.stringify({ status: "success" }));
        }
      }
    });
  });

  console.log(browserName, "ready");
}