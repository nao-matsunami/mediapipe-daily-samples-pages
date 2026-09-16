# 2026-09-16 MediaPipe Image Segmenter delegate watchdog

## 調査メモ

- Google AI Edge の Image Segmenter Web guide は、`@mediapipe/tasks-vision` の `ImageSegmenter`、`FilesetResolver.forVisionTasks()`、`createFromOptions()`、`outputCategoryMask`、`outputConfidenceMasks`、`segment()` / `segmentForVideo()` を確認する一次情報として使った。
- 同 guide は `segment()` / `segmentForVideo()` が同期的に UI thread を block し得るため、camera stream では Web Worker 実装を検討する必要があると説明している。
- Setup guide for web は Vision tasks の npm / CDN 導入と `BaseOptions` の `modelAssetPath`、`modelAssetBuffer`、`delegate: CPU / GPU` を確認する入口になる。
- GitHub issues では ImageSegmenter + GPU delegate + WebGL float/half-float capability、MPMask close、Worker postMessage 境界、performance / sync point に関する未解決・関連論点が見える。
- npm の `@mediapipe/tasks-vision` は latest 1.0.1、nightly / rc 系も継続しているため、公開 HTML 側は 1.0.1 import probe と、CDN が塞がれても動く synthetic fallback を併置した。

## 今日作ったもの

- `outputs/2026-09-16_segmenter_delegate_watchdog.html`
  - GPU / CPU delegate 選択、mask 種別、mask size、GPU pressure、close discipline を変えながら、fallback と retained masks を観察する synthetic watchdog。
  - WebGL float / half-float capability と `@mediapipe/tasks-vision@1.0.1` の `ImageSegmenter` export を簡易 probe する。
- `outputs/2026-09-16_mask_backpressure_scheduler.html`
  - `segmentForVideo()` を毎 frame で呼ばず、input FPS、segment interval、worker cost、queue capacity、transfer cost を分けて backpressure を観察する派生試作。
  - latest-wins policy と quality-queue policy を切り替え、drop / latency / stale mask のトレードオフを見る。

## 次に足すなら

- 実 `ImageSegmenter.createFromOptions()` と DeepLab / selfie segmentation model を接続し、synthetic cost を実測 cost に置き換える。
- Worker 内で ImageBitmap / OffscreenCanvas / mask close の責務を分け、postMessage 可能な payload と close すべき payload をログする。
- GPU delegate requested でも WebGL format probe が弱い端末では CPU fallback を先に選ぶ preflight を実装する。
