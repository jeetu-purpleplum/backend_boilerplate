import { Before } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";

Before(async function (this: CustomWorld, scenario) {
  if (scenario.pickle.tags.some(tag => tag.name === "@auth")) {
    await this.authenticate();
    console.log("🔐 Authenticated for:", scenario.pickle.name);
  }
});
