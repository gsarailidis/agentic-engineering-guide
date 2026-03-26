#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const filePath = path.join(root, "AgenticEngineeringGuide.md");
const contentsHeading = "## Contents";
const nextSectionHeading = "# Introduction";

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const source = fs.readFileSync(filePath, "utf8");
const lines = source.split("\n");

let inCodeFence = false;
const tocLines = [];

for (const line of lines) {
  if (line.startsWith("```")) {
    inCodeFence = !inCodeFence;
    continue;
  }

  if (inCodeFence) continue;
  if (!line.startsWith("#")) continue;

  const match = /^(#{1,4})\s+(.*)$/.exec(line);
  if (!match) continue;

  const level = match[1].length;
  const title = match[2].trim();

  if (title === "Contents") continue;

  const slug = title
    .toLowerCase()
    .replace(/[`"]/g, "")
    .replace(/[().:,]/g, "")
    .replace(/\s+/g, "-");

  const indent = "  ".repeat(Math.max(0, level - 1));
  tocLines.push(`${indent}- [${title}](#${slug})`);
}

const startIndex = source.indexOf(`${contentsHeading}\n`);
const endIndex = source.indexOf(`\n${nextSectionHeading}`);

if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
  throw new Error("Could not locate contents section boundaries in AgenticEngineeringGuide.md");
}

const before = source.slice(0, startIndex + `${contentsHeading}\n`.length);
const after = source.slice(endIndex);
const tocBody = `\n${tocLines.join("\n")}\n`;
const updated = `${before}${tocBody}${after}`;
fs.writeFileSync(filePath, updated);
