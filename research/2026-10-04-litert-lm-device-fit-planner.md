# 2026-10-04 research notes

## Primary sources checked

- Google AI Edge setup guide for Web: packages, CDN/NPM paths, `FilesetResolver`, `BaseOptions`, `modelAssetPath`, `modelAssetBuffer`, and `Delegate`.
- MediaPipe LLM Inference guide for Web: the LLM Inference API is maintenance-only and the guide recommends migration to the LiteRT-LM JavaScript API. It also notes WebGPU compatibility and Gemma 3n image/audio support in current model notes.
- Google AI Edge Instant Demos / MediaPipe Studio: users can test solution demos with custom input data and custom model files that need compatible model metadata.
- google-ai-edge/mediapipe releases: v1.0.0 includes Web-relevant release notes such as Text Embedder Gecko support, WebGpuService updates, IIFE bundle and privacy notice work from recent releases.
- google-ai-edge/mediapipe-samples-web: browser demos for Tasks across Vision, Audio, and Text.

## Sample direction

Today's main sample avoids calling a real generative model and instead prototypes the decision layer before model hookup: memory, WebGPU score, prompt length, offline/privacy need, and model format. The derivative sample focuses on the Studio-style custom model gate: metadata completeness, tensor shape match, label quality, calibration coverage, delegate fallback, and custom input smoke testing.

## Next additions

- Replace synthetic WebGPU score with `navigator.gpu` plus adapter information where available.
- Add a real model file metadata parser for `.task` / TFLite metadata.
- Add package version pins for `@mediapipe/tasks-genai` and future LiteRT-LM JS packages.
- Persist custom-model preflight results in IndexedDB for regression checks.
