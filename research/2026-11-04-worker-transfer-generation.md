# 2026-11-04 Worker transfer / generation guard

- [MediaPipe v1.2.0 release](https://github.com/google-ai-edge/mediapipe/releases/tag/v1.2.0) lists Web Worker platform detection and refreshed WASM assets.
- [MediaPipe Tasks Web Vision README](https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md) documents browser-resident Vision Task usage and the on-device processing/privacy notice.
- [Official sample worker](https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/workers/image-segmenter.worker.ts) is a primary implementation reference for a Worker-based Image Segmenter path.

The two HTML files are standalone local simulations, not wrappers around the official demo or claims about released API semantics. They expose design decisions that an app needs around a Worker pipeline: handoff/ownership, generation freshness, and minimal result envelopes.
