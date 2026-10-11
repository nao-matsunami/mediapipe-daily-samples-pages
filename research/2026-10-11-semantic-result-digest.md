# 2026-10-11 Semantic Result Digest

## 参照した一次情報

- Google AI Edge: Image embedding task guide
- Google AI Edge API: ImageEmbedder JavaScript class
- Google AI Edge: Image classification task guide
- GitHub: google-ai-edge/mediapipe releases
- GitHub: google-ai-edge/mediapipe-samples-web
- Official MediaPipe Tasks Web demo

## 制作メモ

Image Embedder の cosine similarity と Image Classifier の score threshold を、アプリ側の semantic digest へ変換する小さな検証にした。外部デモ一覧ではなく、今日の公開カードはこのワークスペース内の `Semantic Result Digest Board` を代表サンプルにする。

派生として、digest を外部アクションへ渡す直前に payload field を減らす `Action Payload Minimizer` を追加した。raw image / full embedding / landmark sketch から始めず、label / score / short digest を基準にして必要な情報だけを足す設計を可視化する。
