# 2026-08-08 Text Embedder research

- Google AI Edge / MediaPipe Text Embedder Web guide: `@mediapipe/tasks-text`, `FilesetResolver.forTextTasks()`, `TextEmbedder.createFromOptions()`, Universal Sentence Encoder `.tflite`, `embed(text)`, and `TextEmbedder.cosineSimilarity()` are the core Web path.
- TextEmbedder JS API reference: `embed(text)` returns a `TextEmbedderResult`; static `cosineSimilarity(u, v)` compares two `Embedding` objects and validates embedding types and dimensions.
- MediaPipe samples web repository: the official demo app now covers Vision, Audio, and Text demos, including Language Detection, Text Classification, and Text Embedding.
- MediaPipe v0.10.35 release notes: JavaScript changes include broken export fixes and Vite worker usability for MP Task files, useful for future browser packaging.
- MediaPipe repo privacy notice: MediaPipe Tasks process input data on device, while usage/performance metrics may be sent to Google, so public samples should still explain data and telemetry assumptions.
- LLM Inference guide: the MediaPipe LLM Inference API for Android, iOS, and Web is maintenance-only; LiteRT-LM is the forward-looking Web GenAI watch target.

Primary links:

- https://ai.google.dev/edge/mediapipe/solutions/text/text_embedder/web_js
- https://ai.google.dev/edge/mediapipe/api/solutions/js/tasks-text.textembedder
- https://google-ai-edge.github.io/mediapipe-samples-web/
- https://github.com/google-ai-edge/mediapipe-samples-web
- https://github.com/google-ai-edge/mediapipe/releases
- https://github.com/google-ai-edge/mediapipe
- https://developers.google.com/edge/mediapipe/solutions/genai/llm_inference
