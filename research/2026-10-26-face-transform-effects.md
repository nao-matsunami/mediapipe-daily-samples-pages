# 2026-10-26 調査メモ

- [MediaPipe v1.1.1 release](https://github.com/google-ai-edge/mediapipe/releases/tag/v1.1.1) を公開済み基準として確認。WASM 資産更新、JavaScript Retrieval SDK snippet 更新を含む。
- [FaceLandmarkerOptions API reference](https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/vision/FaceLandmarkerOptions) は `min_face_detection_confidence`、`min_face_presence_confidence`、`min_tracking_confidence` と facial transformation matrix 出力オプションを記載する。
- [MediaPipe Web Tasks demos](https://google-ai-edge.github.io/mediapipe-samples-web/) は動作観察の参照にとどめ、公開アーカイブには外部デモを掲載しない。

この日の2本は、実カメラ・実モデル・ネットワークを使わずに、変換行列を消費する表示側の契約（品質、表示余白、結果年齢、座標変換）を試すオリジナルHTMLである。
