# 2026-10-24 — confidence と session boundary

一次情報の確認メモです。MediaPipe v1.1.1 は現行公開リリースであり、v1.1.0 は Web Tasks の landmark presence score 公開、WASM embedding の重複呼び出し防止、Web stats logging を含みます。リポジトリの privacy notice は、入力が端末内処理でも Tasks の利用・性能メトリクスが送信され得ることと、アプリ側の同意責任を明記しています。

- Release v1.1.1: https://github.com/google-ai-edge/mediapipe/releases/tag/v1.1.1
- Release v1.1.0: https://github.com/google-ai-edge/mediapipe/releases/tag/v1.1.0
- MediaPipe repository / privacy notice: https://github.com/google-ai-edge/mediapipe
- Official Web Tasks demos: https://google-ai-edge.github.io/mediapipe-samples-web/
- Public proposal #6346 (live FaceLandmarker thresholds): https://github.com/google-ai-edge/mediapipe/pull/6346
- Public proposal #6345 (FaceLandmarker reset): https://github.com/google-ai-edge/mediapipe/pull/6345

PR #6346/#6345 は公開提案であり、公開版 API としては扱わない。本日の HTML は外部依存・カメラ・モデルを使わない合成データの設計検証である。
