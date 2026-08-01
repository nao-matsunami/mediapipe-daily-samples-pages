import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const reportsDir = path.join(rootDir, "reports");

function parseArgs(argv) {
  const options = { file: null, publish: false };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--file") {
      options.file = argv[i + 1] || null;
      i += 1;
    } else if (argv[i] === "--publish") {
      options.publish = true;
    }
  }
  return options;
}

function ensureString(value, name) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing or invalid string field: ${name}`);
  }
}

function validateReport(report) {
  ensureString(report.date, "date");
  ensureString(report.headline, "headline");
  ensureString(report.summary, "summary");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(report.date)) {
    throw new Error(`Invalid date format: ${report.date}`);
  }
  if (!Array.isArray(report.keyTopics) || report.keyTopics.length < 3) {
    throw new Error("keyTopics must contain at least 3 items");
  }
  if (!Array.isArray(report.sections) || report.sections.length < 8) {
    throw new Error("sections must contain the daily report sections");
  }
}

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} failed with code ${code}`));
    });
  });
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!options.file) throw new Error("Usage: node scripts/upsert-report.mjs --file reports/YYYY-MM-DD.json");
  const report = JSON.parse(await fs.readFile(path.resolve(options.file), "utf8"));
  validateReport(report);
  await fs.mkdir(reportsDir, { recursive: true });
  const target = path.join(reportsDir, `${report.date}.json`);
  await fs.writeFile(target, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`Saved report: ${target}`);
  await run("node", ["scripts/build-gallery.mjs"], rootDir);
  if (options.publish) {
    await run("node", ["scripts/publish-pages.mjs"], rootDir);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
