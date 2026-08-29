# 2026-08-29 MediaPipe Tasks Vision import / WASM probe

## 今日見た一次情報

- Google AI Edge / MediaPipe Tasks Vision README: `FilesetResolver.forVisionTasks()` と各 Vision Task の `createFromModelPath()` / `createFromOptions()` の最小導線を確認。
- google-ai-edge/mediapipe-samples-web: 公式のWebデモ集。Audio、Vision、TextのTasksをブラウザ上で動かす構成を確認。
- mediapipe-samples-web interactive segmenter implementation: worker処理、stroke UI、処理中フラグ、再計算キューの設計が参考になる。
- npm `@mediapipe/tasks-vision`: latestが `1.0.1`、nightly系rcが継続していることを確認。
- GitHub issue #6033: package root import と default export の期待違いが実装破断点になりやすいことを確認。
- Google I/O 2026 session: Google AI Edge stackでMediaPipe Tasks、Gemma、LiteRTを使い分ける説明を確認。

## 今日の自作サンプル方針

外部公式デモをカード化するのではなく、実Taskロードの前段で起きる import / WASM / version pin の小さな破断点を、ブラウザ単体で検査するHTMLにした。2本目は、レポート内の発展案である「version pin判断」をUIとして独立させた。

## 参考リンク

- https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md
- https://github.com/google-ai-edge/mediapipe-samples-web
- https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/tasks/interactive-segmenter.ts
- https://www.npmjs.com/package/%40mediapipe/tasks-vision
- https://github.com/google-ai-edge/mediapipe/issues/6033
- https://io.google/2026/explore/technical-session-36
- https://google-ai-edge.github.io/mediapipe-samples-web/
