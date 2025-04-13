#!/usr/bin/env node

import cp from "node:child_process";
import fs from "node:fs";
import svgtofont from "svgtofont";

import cfg from "./.svgtofontrc.js";

const customIconsPath = `${process.env["HOME"]}/.config/sketchybar-icons`;

await fs.promises.cp(`${import.meta.dirname}/icons`, cfg.src, {
  recursive: true,
});

if (fs.existsSync(customIconsPath)) {
  await fs.promises.cp(customIconsPath, cfg.src, { recursive: true });
}

await svgtofont(cfg);

fs.copyFileSync(
  `${cfg.dist}/${cfg.fontName}.ttf`,
  `${process.env["HOME"]}/Library/Fonts/${cfg.fontName}.ttf`,
);

cp.execSync("sketchybar --reload");
cp.execSync(`rm -rf ${cfg.src} ${cfg.dist}`);
