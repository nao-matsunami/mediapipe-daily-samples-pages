# 2026-08-30 research: LiteRT-LM Web preflight

## Primary sources checked

- LiteRT-LM API Overview: https://developers.google.com/edge/litert-lm/api_overview
- LiteRT-LM JS core README: https://github.com/google-ai-edge/litert-lm/blob/main/js/packages/core/README.md
- MediaPipe LLM Inference Web guide: https://developers.google.com/edge/mediapipe/solutions/genai/llm_inference/web_js
- MediaPipe Web setup guide: https://developers.google.com/edge/mediapipe/solutions/setup_web
- LiteRT.js README: https://github.com/google-ai-edge/LiteRT/blob/main/litert/js/README.md
- Official MediaPipe Tasks web samples: https://github.com/google-ai-edge/mediapipe-samples-web
- npm checks on 2026-08-30 JST:
  - `@litert-lm/core`: 0.16.0
  - `@mediapipe/tasks-genai`: 0.10.29
  - `@litertjs/core`: 2.5.3

## Notes

- The MediaPipe LLM Inference Web guide now marks the API as maintenance-only and recommends migration to LiteRT-LM JavaScript API for Web projects.
- LiteRT-LM Web uses `@litert-lm/core` and exposes an `Engine` entry point. The overview shows a browser import path through jsDelivr.
- The LiteRT-LM JS README describes the Web API as an early preview for text-in/text-out running in WebGPU and lists web-compatible Gemma 4 E2B/E4B `.litertlm` model files.
- The Web setup guide keeps MediaPipe Tasks split across vision, text, audio, and genai packages. This daily sample should stay original and use the official material only as reference.
- LiteRT.js documents WebGPU, WebNN, and WASM execution choices plus JSPI-related fallback behavior. That shaped the preflight checks around WebGPU, isolation, import surface, model URL, and route recommendation.

## Prototype decision

- Main sample: `outputs/2026-08-30_litert_lm_web_preflight.html`
  - Runs browser preflight checks, dynamic-imports `@litert-lm/core`, probes the selected model URL with HEAD, and recommends WebGPU / Hybrid / WASM route.
  - Does not load the large model or create an Engine, keeping the sample quick and safe for static hosting.
- Derivative sample: `outputs/2026-08-30_litert_lm_prompt_stream_budget.html`
  - Tests one short next-step idea from the main sample: before loading a real model, tune prompt budget, output cap, streaming chunk size, latency hint, and cancel behavior.

## Next additions

- Add a real `Engine.create()` smoke test behind an explicit user action and ensure `engine.delete()` always runs.
- Add downloadable JSON logs for CI comparison.
- Add COOP/COEP hosting notes when the page is deployed under GitHub Pages.
- Add a MediaPipe Tasks GenAI compatibility row so older LLM Inference samples can be triaged against LiteRT-LM.
