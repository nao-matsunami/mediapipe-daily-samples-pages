# 2026-08-15 LiteRT-LM WebGPU prompt budget research

## Primary sources checked

- LiteRT-LM Overview: https://developers.google.com/edge/litert-lm/overview
- LiteRT-LM API Overview: https://developers.google.com/edge/litert-lm/api_overview
- MediaPipe LLM Inference guide for Web: https://developers.google.com/edge/mediapipe/solutions/genai/llm_inference/web_js
- Official MediaPipe samples web repository: https://github.com/google-ai-edge/mediapipe-samples-web
- Official MediaPipe Web Task demo: https://google-ai-edge.github.io/mediapipe-samples-web/
- Google Developers Blog: https://developers.googleblog.com/blazing-fast-on-device-genai-with-litert-lm/

## Notes

- LiteRT-LM Overview now presents LiteRT-LM as the production-ready orchestration layer for on-device LLMs across Android, iOS, Web, Desktop, and IoT.
- The Overview page highlights v0.16.0 and says v0.15.0 included JavaScript API updates. It also describes Google AI Edge Gallery as an offline on-device GenAI showcase.
- The API Overview shows the JavaScript path: install `@litert-lm/core` or import it from CDN, create an `Engine`, create a conversation, then call `sendMessage`.
- The same API Overview says WebGPU acceleration is enabled by default in the Web SDK, while current Web SDK support is text-in/text-out and does not yet support multimodal attachments.
- The MediaPipe LLM Inference Web guide carries an API update note: the MediaPipe LLM Inference API is in maintenance-only mode and Web projects are recommended to migrate to LiteRT-LM JavaScript API.

## Sample decision

Today should not clone the official LLM demo or ship a multi-GB model file. The original sample is a browser-side planning tool that checks WebGPU availability, optionally imports `@litert-lm/core`, and estimates prompt/history/output pressure before a developer downloads a `.litertlm` model.
