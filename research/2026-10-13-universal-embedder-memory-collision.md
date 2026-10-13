# 2026-10-13 Research: Universal Embedder memory collision gate

## 一次情報メモ

- GitHub の MediaPipe releases では v1.1.0 が latest として見え、Universal Embedder、Semantic Retriever、MediaPipe Decision、LiteRT-LM 連携が追加・拡張されている。
- `google-ai-edge/mediapipe-samples-web` は、ブラウザ内で動く MediaPipe Task API の公式サンプル集で、README 上でも Vision / Audio / Decision / Retrieval / Text のタスクが並ぶ。
- 公式 Web Task demo には Semantic Retriever と Universal Embedder が追加され、検索・埋め込み・Decision へつなぐ後段 UI が前面に出ている。
- Google AI Edge の Universal Embedder Web guide は、音声・テキスト・画像を単一サービスで扱うタスクとして説明し、cosine similarity で embedding 間の近さを計算できることを示している。
- MediaPipe Studio / Instant Demos は、モデル設定、結果数、confidence threshold などをブラウザで試せる公式入口として参照できる。

## 今日の制作判断

昨日の `Decision / Retrieval handoff` から一歩進めて、今日は Retriever に保存する前の「似すぎた embedding」「privacy が高すぎる digest」「token 予算を超える chunk」を可視化する日にした。実 Task を呼ぶサンプルではなく、Universal Embedder / Semantic Retriever / Decision の間に必要になる保存前 gate を、合成ベクトルと chunk 予算で触れる自作サンプルにした。

## サンプル

- `outputs/2026-10-13_universal_embedder_memory_collision_lab.html`
  - 合成 multimodal embedding を nearest memory と比較し、new / merge / review / drop に分ける。
  - 次に足すなら実 Universal Embedder の embedding、IndexedDB 保存、Semantic Retriever への投入、重複 merge UI。
- `outputs/2026-10-13_semantic_retriever_chunk_budget_probe.html`
  - Retriever chunk 候補を token budget、freshness、priority、privacy risk で send / trim / hold / drop に分ける。
  - 次に足すなら実 query、cross-modal score、検索結果説明、監査ログ。
