# 2026-09-20 MediaPipe v1 Web release triage notes

- GitHub の `google-ai-edge/mediapipe` release notes で MediaPipe v1.0.0 が latest として掲載され、JavaScript 項目に IIFE bundles、MediaPipe Tasks Privacy Notice、Text Embedder for Web の Gecko 対応、InteractiveSegmenter method export、Web LLM Inference の `.litertlm` 対応、experimental `disableRewinding`、VisionTaskRunner の running mode cache が並んでいることを確認した。
- Google AI Edge の Web setup guide は、Tasks Web が vision / text / audio / genai パッケージに分かれ、CDN script tag と npm install の両方を案内している。v1.0.0 の IIFE bundle 追加は、ビルドなしの検証ページや fallback path を扱いやすくする材料として見た。
- Google AI Edge の LLM Inference Web guide は、LLM Inference API が maintenance-only mode で、Web project には LiteRT-LM JavaScript API への移行を推奨していること、Gemma 3n 系では image / audio input も対象にしていることを確認した。
- npm の `@mediapipe/tasks-vision` は 1.0.1 latest、`@mediapipe/tasks-genai` は 0.10.29 latest として公開されており、MediaPipe 本体 v1.0.0 と個別 JS package version は同一ではない前提で version pin / CDN probe を入れるべきだと判断した。
- `google-ai-edge/mediapipe-samples-web` はブラウザ内で動く MediaPipe Task demos をまとめており、vision / audio / text の横断タスクを確認できる一次情報として参照した。

今日の実装:

- `outputs/2026-09-20_mediapipe_v1_web_release_triage.html`
  - v1.0.0 の Web 関連変更を IIFE bundle、Text Embedder Gecko、Privacy Notice、`.litertlm` Web LLM、running mode cache の5項目に分解し、アプリ profile と privacy weight で優先度を再計算する。
  - 次に足すなら実 package manifest の export map 検査、IIFE / ESM の実 import 比較、Firefox 実機 smoke test、privacy notice copy checklist、VisionTaskRunner の runningMode 切替テストを追加する。
- `outputs/2026-09-20_llm_rewind_context_budget_sandbox.html`
  - `disableRewinding` と `.litertlm` 対応から発想し、LLM の長文 context が limit を超える時に auto rewind / disableRewinding / summarize first を切り替えて token pressure を観察する。
  - 次に足すなら実 `@mediapipe/tasks-genai` load、WebGPU adapter probe、`.task` / `.litertlm` model file header check、LiteRT-LM 移行 checklist、IndexedDB prompt summary cache を追加する。
