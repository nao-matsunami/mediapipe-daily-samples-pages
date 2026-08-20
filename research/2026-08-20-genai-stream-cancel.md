# 2026-08-20 MediaPipe / Google AI Edge research

## Focus

MediaPipe LLM Inference Web の streaming callback、`cancelProcessing()`、Gemma-3n の multimodal prompt、`@mediapipe/tasks-genai` の WebGPU 前提を確認した。今日の自作サンプルは、外部公式デモの一覧ではなく、実モデルなしでも UI 設計を検証できる `GenAI Stream Cancel Console` にした。

## Primary sources

- Google AI Edge: LLM Inference guide for Web
  - https://developers.google.com/edge/mediapipe/solutions/genai/llm_inference/web_js
  - API は maintenance-only で、Web projects は LiteRT-LM JavaScript API への移行が推奨されている。
  - Web 版は WebGPU compatibility が必要。
  - `@mediapipe/tasks-genai`、`FilesetResolver.forGenAiTasks()`、`LlmInference.createFromOptions()`、`generateResponse()`、streaming callback が示されている。
  - Gemma-3n では ordered array に text / image / audio data を混ぜられる。
  - `maxNumImages` と `supportAudio` で multimodal input を有効化する。

- Official sample application: google-ai-edge/mediapipe-samples `examples/llm_inference/js/index.html`
  - https://github.com/google-ai-edge/mediapipe-samples/blob/main/examples/llm_inference/js/index.html
  - local model file を読み込み、`modelAssetBuffer` から `LlmInference` を作る。
  - streaming callback で partial result を textarea に追記する。
  - cancel button から `llmInference.cancelProcessing()` を呼ぶ。
  - Gemma 3 prompt template へのコメントがある。

- npm: `@mediapipe/tasks-genai`
  - https://www.npmjs.com/package/%40mediapipe/tasks-genai
  - MediaPipe Tasks GenAI package。LLM Inference は text response を生成し、Gemma 3n は image / audio も扱える。

- MediaPipe Solutions guide
  - https://www.mediapipe.dev/
  - Tasks / Models / Model Maker / Studio の位置づけと、LLM Inference API が Web を含む複数プラットフォームにあることを確認。

- Official MediaPipe samples web repository
  - https://github.com/google-ai-edge/mediapipe-samples-web
  - Vision / Audio / Text の Web Task デモ群。今日のカード化対象にはせず、実装・調査リンクとして扱う。

## Sample decision

前回 2026-08-19 は Vision Task の frame budget / queue / Worker lane を扱ったため、今日は GenAI の応答ストリーム側に移した。巨大な `.litertlm` / `.task` モデルを同梱しない方針を維持しつつ、公式 API の重要な運用面である streaming callback、cancel、partial result の扱い、multimodal input の token 余白を自作 UI で検証できるようにした。

## Prototype notes

- `outputs/2026-08-20_genai_stream_cancel_console.html`
- 実装内容:
  - prompt text の概算 token
  - `maxTokens` / `topK` / `temperature` / simulated tokens per second
  - `maxNumImages` / `supportAudio` / Gemma turn template の入力コスト表示
  - simulated streaming callback
  - cancel 後の partial result retained 表示
  - token timeline で text / image / audio / cancel を可視化
  - WebGPU availability と `@mediapipe/tasks-genai` CDN import probe

## Next watch

- LiteRT-LM JavaScript API の WebGPU API shape と MediaPipe LLM Inference からの移行差分。
- Gemma 4 prompt formatting と Gemma 3 turn template の違い。
- multimodal prompt における canvas / video / AudioBuffer の実オブジェクト受け渡し。
- LoRA runtime loading と GPU 制約。
- modelAssetPath と modelAssetBuffer の UX 差分、特にローカルファイル選択時の progressive loading。
