import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { Buffer } from "node:buffer";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(scriptDir, "..");
const targetDir = process.env.PUBLISH_TARGET_DIR || "/Users/nao/Documents/Codex/mediapipe-daily-samples-pages";
const repo = "nao-matsunami/mediapipe-daily-samples-pages";
const pagesBaseUrl = process.env.PAGES_BASE_URL || "https://nao-matsunami.github.io/mediapipe-daily-samples-pages/";
const pagesWaitMs = Number(process.env.PAGES_WAIT_MS || 5 * 60 * 1000);
const pagesPollMs = Number(process.env.PAGES_POLL_MS || 10 * 1000);

function run(command, args, cwd, stdio = "inherit") {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} failed with code ${code}`));
    });
  });
}

function runCapture(command, args, cwd) {
  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";
    const child = spawn(command, args, { cwd, stdio: ["ignore", "pipe", "pipe"] });
    child.stdout.on("data", (chunk) => { stdout += chunk.toString(); });
    child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
    child.on("exit", (code) => {
      if (code === 0) resolve(stdout.trim());
      else reject(new Error(stderr.trim() || `${command} ${args.join(" ")} failed with code ${code}`));
    });
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function publicUrl(relativePath = "") {
  return new URL(relativePath.replace(/^\.\.\//, ""), pagesBaseUrl).toString();
}

async function readLatestReport() {
  const reportsDir = path.join(sourceDir, "reports");
  const files = await fs.readdir(reportsDir);
  const datedReports = files
    .filter((file) => /^\d{4}-\d{2}-\d{2}\.json$/.test(file))
    .sort();

  if (!datedReports.length) {
    throw new Error("No dated reports found.");
  }

  const file = datedReports.at(-1);
  const report = JSON.parse(await fs.readFile(path.join(reportsDir, file), "utf8"));
  const sampleLink = report.links?.find((link) => link.url?.startsWith("../outputs/") && link.url.endsWith(".html"));

  if (!report.date || !sampleLink) {
    throw new Error(`Latest report ${file} is missing date or representative sample link.`);
  }

  return {
    date: report.date,
    sampleUrl: sampleLink.url,
  };
}

async function checkUrl(url) {
  try {
    const response = await fetch(url, { method: "HEAD", redirect: "follow", cache: "no-store" });
    return response.status;
  } catch {
    try {
      const response = await fetch(url, { method: "GET", redirect: "follow", cache: "no-store" });
      return response.status;
    } catch {
      return 0;
    }
  }
}

async function waitForPublishedUrls(urls) {
  const deadline = Date.now() + pagesWaitMs;
  let statuses = [];

  while (Date.now() <= deadline) {
    statuses = await Promise.all(urls.map(async (url) => ({ url, status: await checkUrl(url) })));
    const allOk = statuses.every((item) => item.status === 200);
    console.log(statuses.map((item) => `${item.status} ${item.url}`).join("\n"));

    if (allOk) {
      console.log("GitHub Pages verification passed.");
      return { ok: true, statuses };
    }

    if (Date.now() + pagesPollMs > deadline) break;
    await sleep(pagesPollMs);
  }

  console.log("GitHub Pages verification reached the 5 minute cap.");
  return { ok: false, statuses };
}

async function copyProject() {
  await fs.rm(targetDir, { recursive: true, force: true });
  await fs.mkdir(path.dirname(targetDir), { recursive: true });
  await run("gh", ["repo", "clone", repo, targetDir], sourceDir);
  await run("rsync", ["-a", "--delete", "--exclude", ".git", "--exclude", "node_modules", `${sourceDir}/`, `${targetDir}/`], sourceDir);
}

async function main() {
  await run("node", ["scripts/build-gallery.mjs"], sourceDir);
  const latest = await readLatestReport();
  const urlsToVerify = [
    publicUrl(),
    publicUrl(`days/${latest.date}.html`),
    publicUrl(latest.sampleUrl),
  ];

  await copyProject();
  await run("git", ["add", "."], targetDir);
  try {
    await run("git", ["diff", "--cached", "--quiet"], targetDir, "ignore");
    console.log("No changes to publish.");
    await waitForPublishedUrls(urlsToVerify);
    return;
  } catch {
    // Changes are staged.
  }

  const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  await run("git", ["commit", "-m", `Publish MediaPipe daily samples ${stamp}`], targetDir);
  const commit = await runCapture("git", ["rev-parse", "--short", "HEAD"], targetDir);
  const token = await runCapture("gh", ["auth", "token"], targetDir);
  const basic = Buffer.from(`x-access-token:${token}`).toString("base64");
  const pushArgs = ["-c", `http.https://github.com/.extraheader=AUTHORIZATION: basic ${basic}`];
  await run("git", [...pushArgs, "push", "origin", "main"], targetDir);
  console.log(`Pushed commit ${commit}.`);
  await waitForPublishedUrls(urlsToVerify);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
