#!/usr/bin/env node

import cp from "node:child_process";
import fs from "node:fs";
import svgtofont from "svgtofont";

import cfg from "./.svgtofontrc.js";

const customIconsPath = `${process.env["HOME"]}/.config/sketchybar-icons`;

// The bundled icons live next to this script, not in the cwd, because
// the CLI is meant to be run via npx from wherever the user happens to be.
await fs.promises.cp(`${import.meta.dirname}/icons`, cfg.src, {
  recursive: true,
});

// Copied on top of the bundled set on purpose: same file name wins the
// later copy, so a user can override an icon or add a missing one
// without forking the repo.
if (fs.existsSync(customIconsPath)) {
  await fs.promises.cp(customIconsPath, cfg.src, { recursive: true });
}

await svgtofont(cfg);

fs.copyFileSync(
  `${cfg.dist}/${cfg.fontName}.ttf`,
  `${process.env["HOME"]}/Library/Fonts/${cfg.fontName}.ttf`,
);

cp.execSync("sketchybar --reload");

// The font is already installed at this point, and both temp dirs are
// relative to the cwd, so leaving them behind would litter whatever
// directory the CLI was run from.
cp.execSync(`rm -rf ${cfg.src} ${cfg.dist}`);
