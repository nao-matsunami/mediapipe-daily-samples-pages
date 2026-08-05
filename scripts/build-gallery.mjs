import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const outputDir = path.join(rootDir, "outputs");
const reportsDir = path.join(rootDir, "reports");
const daysDir = path.join(rootDir, "days");
const pagesDir = path.join(rootDir, "pages");
const indexPath = path.join(rootDir, "index.html");
const pageSize = 12;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function titleFromHtml(html, fallback) {
  return html.match(/<title>(.*?)<\/title>/i)?.[1]?.trim() || fallback;
}

function descriptionFromHtml(html) {
  return html.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1]?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() || "";
}

function dateFromFile(fileName) {
  return fileName.match(/^(\d{4}-\d{2}-\d{2})_/)?.[1] || null;
}

function fileNameFromUrl(url = "") {
  const match = String(url).match(/outputs\/([^/?#]+\.html)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function primarySample(day) {
  const linkedFile = day.report?.links?.map((link) => fileNameFromUrl(link.url)).find(Boolean);
  return day.samples.find((sample) => sample.fileName === linkedFile) || day.samples[0];
}

async function readJson(file) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return null;
  }
}

function renderLinks(links = []) {
  if (!links.length) return "";
  return `<ul class="link-list">${links.map((link) => `<li><a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a></li>`).join("")}</ul>`;
}

function categoryOf(day) {
  return day.report?.category || "MediaPipe";
}

function pageShell(title, body, basePath = "") {
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    :root { color-scheme: dark; font-family: Inter, "Hiragino Sans", "Yu Gothic", system-ui, sans-serif; color: #f4fbff; background: #071014; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; background: linear-gradient(135deg, rgba(81, 214, 157, .14), transparent 38%), linear-gradient(315deg, rgba(95, 166, 255, .12), transparent 42%), #071014; }
    main { width: min(1160px, 100%); margin: 0 auto; padding: 28px 18px 48px; }
    header { display: flex; justify-content: space-between; gap: 18px; align-items: end; padding-bottom: 18px; border-bottom: 1px solid rgba(194, 244, 224, .18); }
    h1 { margin: 0; font-size: clamp(1.7rem, 4vw, 3.2rem); line-height: 1.05; letter-spacing: 0; }
    h2, h3 { letter-spacing: 0; }
    p, li { color: #b8c8c3; line-height: 1.7; }
    a { color: #8df2c8; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; margin-top: 22px; }
    .card, .block { border: 1px solid rgba(194, 244, 224, .18); background: rgba(9, 18, 22, .78); padding: 16px; box-shadow: 0 20px 60px rgba(0, 0, 0, .3); }
    .date { color: #8df2c8; font-size: .82rem; text-transform: uppercase; }
    .meta { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 0 0 8px; }
    .badge { border: 1px solid rgba(141, 242, 200, .32); color: #f4fbff; background: rgba(141, 242, 200, .09); padding: 4px 8px; font-size: .72rem; text-transform: uppercase; }
    .actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }
    .actions a { border: 1px solid rgba(141, 242, 200, .34); padding: 9px 11px; text-decoration: none; }
    iframe { width: 100%; height: min(720px, 80vh); border: 1px solid rgba(194, 244, 224, .18); background: #05080b; }
    .sample-frame { margin-top: 18px; }
    .en { color: #8fa39d; }
    .link-list { padding-left: 20px; }
    @media (max-width: 700px) { header { align-items: start; flex-direction: column; } main { padding-inline: 14px; } }
  </style>
</head>
<body>
  <main>
    ${body}
  </main>
</body>
</html>`;
}

function renderIndex(days, basePath = "") {
  const categories = [...new Set(days.map(categoryOf))].sort();
  const categorySummary = categories.map((category) => `<span class="badge">${escapeHtml(category)}</span>`).join("");
  const cards = days.map((day) => {
    const sample = primarySample(day);
    return `<article class="card">
      <p class="meta"><span class="date">${escapeHtml(day.date)}</span><span class="badge">${escapeHtml(categoryOf(day))}</span></p>
      <h2>${escapeHtml(day.report?.headline || sample.title)}</h2>
      ${day.report?.headlineEn ? `<p class="en">${escapeHtml(day.report.headlineEn)}</p>` : ""}
      <p>${escapeHtml(day.report?.summary || sample.description)}</p>
      <div class="actions">
        <a href="${basePath}days/${escapeHtml(day.date)}.html">日付ページ</a>
        <a href="${basePath}outputs/${encodeURIComponent(sample.fileName)}">サンプル</a>
      </div>
    </article>`;
  }).join("");
  return pageShell("Browser Vision Daily Samples", `<header><div><h1>Browser Vision Daily Samples</h1><p>MediaPipe、OpenCV.js、WebGL、XR などの公式情報を参考にした日次の自作ブラウザビジョン最小サンプル集。</p><p class="meta">${categorySummary}</p></div><p class="date">${days.length} samples</p></header><div class="grid">${cards}</div>`, basePath);
}

function renderDay(day) {
  const sample = primarySample(day);
  const topics = day.report?.keyTopics?.map((topic, index) => `<li>${escapeHtml(topic)}${day.report.keyTopicsEn?.[index] ? `<p class="en">${escapeHtml(day.report.keyTopicsEn[index])}</p>` : ""}</li>`).join("") || "";
  const sections = day.report?.sections?.map((section) => `<section class="block"><h2>${escapeHtml(section.title)}</h2>${section.titleEn ? `<p class="en">${escapeHtml(section.titleEn)}</p>` : ""}${section.body ? `<p>${escapeHtml(section.body)}</p>` : ""}${section.bodyEn ? `<p class="en">${escapeHtml(section.bodyEn)}</p>` : ""}${renderLinks(section.links)}</section>`).join("") || "";
  return pageShell(`${day.report?.headline || sample.title} | ${day.date}`, `<header><div><p class="meta"><span class="date">${escapeHtml(day.date)}</span><span class="badge">${escapeHtml(categoryOf(day))}</span></p><h1>${escapeHtml(day.report?.headline || sample.title)}</h1>${day.report?.headlineEn ? `<p class="en">${escapeHtml(day.report.headlineEn)}</p>` : ""}<p>${escapeHtml(day.report?.summary || sample.description)}</p></div><div class="actions"><a href="../index.html">一覧</a><a href="../outputs/${encodeURIComponent(sample.fileName)}">代表サンプルを開く</a></div></header><section class="sample-frame"><iframe src="../outputs/${encodeURIComponent(sample.fileName)}" title="${escapeHtml(sample.title)}"></iframe></section><section class="block"><h2>今日の重要トピック</h2><ol>${topics}</ol>${renderLinks(day.report?.links)}</section>${sections}`, "../");
}

async function main() {
  await fs.mkdir(daysDir, { recursive: true });
  await fs.mkdir(pagesDir, { recursive: true });
  const outputFiles = (await fs.readdir(outputDir)).filter((file) => file.endsWith(".html")).sort().reverse();
  const byDate = new Map();
  for (const fileName of outputFiles) {
    const date = dateFromFile(fileName);
    if (!date) continue;
    const html = await fs.readFile(path.join(outputDir, fileName), "utf8");
    const sample = { fileName, title: titleFromHtml(html, fileName), description: descriptionFromHtml(html) };
    if (!byDate.has(date)) byDate.set(date, { date, samples: [] });
    byDate.get(date).samples.push(sample);
  }
  const days = [...byDate.values()].sort((a, b) => b.date.localeCompare(a.date));
  for (const day of days) {
    day.report = await readJson(path.join(reportsDir, `${day.date}.json`));
    await fs.writeFile(path.join(daysDir, `${day.date}.html`), renderDay(day), "utf8");
  }
  await fs.writeFile(indexPath, renderIndex(days), "utf8");
  const totalPages = Math.ceil(days.length / pageSize);
  for (let i = 2; i <= totalPages; i += 1) {
    const pageDays = days.slice((i - 1) * pageSize, i * pageSize);
    await fs.writeFile(path.join(pagesDir, `${i}.html`), renderIndex(pageDays, "../"), "utf8");
  }
  console.log(`Built ${days.length} browser vision daily page(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
