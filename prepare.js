import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");
const { scripts, ...rest } = pkg;
writeFileSync("./dist/package.json", JSON.stringify(rest));
