# 2026-09-17 Image Embedder ROI drift notes

- Google AI Edge の Image Embedder Web guide は、Image Embedder を画像の数値表現生成と cosine similarity 比較に使う task と説明している。Web 版では `@mediapipe/tasks-vision`、`FilesetResolver.forVisionTasks()`、`ImageEmbedder.createFromOptions()`、`mobilenet_v3_small.tflite` の構成が示される。
- 同 guide は `running_mode`、`l2Normalize`、`quantize` を Web configuration として示し、ROI 指定で画像全体ではなく領域 embedding を取れる点を説明している。
- `embed()` と `embedForVideo()` は同期的に実行され UI thread を block し得るため、video frame から特徴ベクトルを取る場合は worker 化を検討する、と guide が明記している。
- Tasks Vision Web README は Image Embedder の JS 例、Object Detector / Segmenter / Landmarker など同一 package 内 task の初期化例をまとめている。
- npm の `@mediapipe/tasks-vision` は latest 1.0.1、nightly / rc も継続しているため、サンプル側は import version、WASM path、model path を固定して観察する設計がよい。

今日の実装:

- `outputs/2026-09-17_embedder_roi_drift_dashboard.html`
  - ROI drift、synthetic embedding vector、cosine similarity、reuse gate、同期 cost risk、Tasks Vision import probe を可視化。
  - 次に足すなら実 `ImageEmbedder.createFromOptions()`、`mobilenet_v3_small`、`ImageProcessingOptions` の ROI、worker handoff。
- `outputs/2026-09-17_embedding_cache_eviction_playground.html`
  - embedding cache の LRU / similarity-first eviction、TTL、hit rate、stale slot を触る派生試作。
  - 次に足すなら IndexedDB cache、実サムネイル画像、query-by-example UI、Web Worker。
