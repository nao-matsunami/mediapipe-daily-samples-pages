import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { Buffer } from "node:buffer";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(scriptDir, "..");
const targetDir = "/Users/nao/Documents/Codex/mediapipe-daily-samples-pages";
const repo = "nao-matsunami/mediapipe-daily-samples-pages";

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

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

async function ensureClone() {
  const hasGit = await pathExists(path.join(targetDir, ".git"));
  if (hasGit) return;
  await fs.rm(targetDir, { recursive: true, force: true });
  await fs.mkdir(path.dirname(targetDir), { recursive: true });
  await run("gh", ["repo", "clone", repo, targetDir], sourceDir);
}

async function copyProject() {
  await fs.rm(targetDir, { recursive: true, force: true });
  await run("gh", ["repo", "clone", repo, targetDir], sourceDir);
  await run("rsync", ["-a", "--delete", "--exclude", ".git", "--exclude", "node_modules", `${sourceDir}/`, `${targetDir}/`], sourceDir);
}

async function main() {
  await run("node", ["scripts/build-gallery.mjs"], sourceDir);
  await ensureClone();
  await copyProject();
  await run("git", ["add", "."], targetDir);
  try {
    await run("git", ["diff", "--cached", "--quiet"], targetDir, "ignore");
    console.log("No changes to publish.");
    return;
  } catch {
    // Changes are staged.
  }

  const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  await run("git", ["commit", "-m", `Publish MediaPipe daily samples ${stamp}`], targetDir);
  const token = await runCapture("gh", ["auth", "token"], targetDir);
  const basic = Buffer.from(`x-access-token:${token}`).toString("base64");
  const pushArgs = ["-c", `http.https://github.com/.extraheader=AUTHORIZATION: basic ${basic}`];
  await run("git", [...pushArgs, "push", "origin", "main"], targetDir);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
