# 2026-09-19 Text Embedder pair similarity notes

- Google AI Edge の `@mediapipe/tasks-text` API reference は、Text package が `FilesetResolver`、`LanguageDetector`、`TextClassifier`、`TextEmbedder` を提供し、TextEmbedder が text embedding 抽出を担当することを示している。
- `Embedding` interface は `floatEmbedding` と `quantizedEmbedding` のどちらか一方を持つ構造を説明しており、量子化を UI 側の類似度しきい値でどう吸収するかが実装上の焦点になる。
- `TextEmbedder` class reference は `createFromModelPath()`、`createFromModelBuffer()`、`createFromOptions()`、同期的に結果を待つ `embed(text)`、`TextEmbedder.cosineSimilarity()` を確認できる。
- `google-ai-edge/mediapipe-samples-web` には Text Embedding demo と worker 実装が含まれ、worker では `TextEmbedder.createFromOptions()` と `TextEmbedder.cosineSimilarity()` を使って2文の similarity を返す構成が見える。
- npm の `@mediapipe/tasks-text` は latest 1.0.1 として公開され、README は Language Detector、Text Classifier、Text Embedder の CDN / model path usage をまとめている。

今日の実装:

- `outputs/2026-09-19_text_embedder_pair_similarity_console.html`
  - Text Embedder 風の synthetic embedding、cosine similarity、float / quantized 差分、同期 cost、pair accept / review routing、Tasks Text import probe を可視化。
  - 次に足すなら実 `FilesetResolver.forTextTasks()`、Universal Sentence Encoder model、`TextEmbedder.createFromModelPath()`、worker handoff、実 embedding の quantized / float 切り替えを足す。
- `outputs/2026-09-19_semantic_cache_route_lab.html`
  - Text Embedder の派生案として、問い合わせ文を cache に近似照合し、TTL decay、cache gate、reuse / re-embed / review を合成 stream で試す。
  - 次に足すなら実 TextEmbedder、IndexedDB cache、worker-side LRU、検索結果の provenance 表示、privacy notice を足す。
