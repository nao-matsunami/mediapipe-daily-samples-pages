# 2026-10-12 MediaPipe decision handoff readiness

## 参照した一次情報

- Google AI Edge / MediaPipe Web setup guide: MediaPipe Tasks の Web 利用では vision / text / audio / genai の prebuilt library と `BaseOptions`、`modelAssetPath`、delegate を整理している。
- Google AI Edge Gesture Recognizer Web guide: Web では `IMAGE` / `VIDEO` の running mode、`recognize()` / `recognizeForVideo()`、timestamp による video frame 処理が中心。
- Google AI Edge GestureRecognizer JavaScript API: `recognizeForVideo(videoFrame, timestamp, imageProcessingOptions)` は video mode で同期的に結果を返す。
- GitHub google-ai-edge/mediapipe releases: 2026-10-07 時点で MediaPipe v1.1.0 が最新として見え、LiteRT dependency 更新などが含まれる。
- GitHub google-ai-edge/mediapipe-samples-web: ブラウザ内で動く Tasks API サンプル集。Vision、Audio、Text に加え、Decision Maker、Semantic Retriever、Universal Embedder などのデモが並んでいる。
- Official MediaPipe Tasks Web demo: Decision Maker、Decision Maker Dino Game、Semantic Retriever、Universal Embedder が Web ML の後段アプリ設計の参考になる。

## 今日の制作判断

10月11日は分類・埋め込み結果を semantic digest と payload 最小化へまとめた。今日はその次段として、MediaPipe Tasks の出力を rule / decision / retrieval に渡す直前の gate を作る。

本命サンプルは `Decision Handoff Readiness Board`。Gesture、Object、Image Embedder、Classifier の合成 evidence lane から readiness を作り、action risk と freshness に応じて fire / review / hold / block に分ける。

派生サンプルは `Retrieval Context Budget Router`。MediaPipe 由来の小さな digest を Semantic Retriever / Universal Embedder 風の文脈に渡す前に、byte budget、novelty、privacy strictness で send / compress / hold / drop に分ける。

## 次に足すなら

- 実 Gesture Recognizer の `recognizeForVideo()` 結果を readiness lane に接続する。
- Object Detector / Image Classifier / Image Embedder の result object を共通 event schema にそろえる。
- Decision Maker に渡す前の explanation token を JSON として保存する。
- Retrieval 用 digest を IndexedDB に保存し、短い user query で再利用できるようにする。
- high risk route ではユーザー承認 UI と監査ログを必須にする。
