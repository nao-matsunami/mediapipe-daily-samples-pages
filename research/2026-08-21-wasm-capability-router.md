# 2026-08-21 Research: MediaPipe / LiteRT.js capability routing

## Primary sources checked

- Google AI Edge: FilesetResolver class for MediaPipe Tasks JavaScript
  - https://developers.google.com/edge/api/mediapipe/js/tasks-vision.filesetresolver
  - Key point: FilesetResolver resolves MediaPipe Task API files, checks SIMD support, and exposes separate filesets for Vision, Audio, Text, GenAI, and GenAI experimental tasks.
- Google AI Edge: tasks-vision package
  - https://developers.google.com/edge/api/mediapipe/js/tasks-vision
  - Key point: the package exports the ready-made Vision Task classes and DrawingUtils, with FilesetResolver as the shared runtime entry.
- Google AI Edge: LiteRT for Web with LiteRT.js
  - https://developers.google.com/edge/litert/web
  - Key point: LiteRT.js targets production Web AI, exposes WebAssembly CPU execution plus WebGPU and emerging WebNN acceleration, and loads `.tflite` models.
- Google AI Edge: Get started with LiteRT.js
  - https://developers.google.com/edge/litert/web/get_started
  - Key point: `loadLiteRt()` loads the WASM files, `loadAndCompile()` can target `webgpu`, `webnn`, or `wasm`, and TFJS interop can share a WebGPU device.
- Google AI Edge homepage
  - https://developers.google.com/edge
  - Key point: Google AI Edge positions MediaPipe Tasks for ready-made features, LiteRT-LM for on-device LLMs, and LiteRT for custom model deployment.
- Official MediaPipe Tasks demo repository
  - https://github.com/google-ai-edge/mediapipe-samples-web
  - Key point: official demos cover real-time Vision, Audio, and Text tasks in browser with CPU and GPU acceleration.
- Official MediaPipe Tasks demo page
  - https://google-ai-edge.github.io/mediapipe-samples-web/
  - Key point: useful as a reference for model selection and task settings, but not used as a public archive card here.

## Today's direction

The useful gap for a self-made daily sample is not another detector UI. Before a user loads a large model, they need to know whether the browser can initialize MediaPipe Tasks or LiteRT.js cleanly, whether WebGPU is available, whether WebNN is even exposed, and whether SIMD is selected for MediaPipe WASM files.

The prototype therefore acts as a runtime capability router:

- Probe browser basics: secure context, WebAssembly, WebGPU, WebNN.
- Probe MediaPipe Tasks entry: dynamic import of `@mediapipe/tasks-vision`.
- Probe MediaPipe SIMD route: `FilesetResolver.isSimdSupported()`.
- Probe LiteRT.js entry: dynamic import of `@litertjs/core`.
- Combine measured capability with user-controlled FPS, estimated model size, input mode, and accelerator preference.
- Recommend one of MediaPipe Tasks, LiteRT.js, Worker + GPU, or WASM fallback.

## Why this is original

Official demos show task output. This sample focuses on the model-loading and runtime-decision layer before task output exists. It turns documentation notes about WASM files, SIMD, WebGPU, WebNN, and ready-made Tasks versus custom LiteRT models into an interactive routing panel.

## Follow-up candidates

- Add actual `FilesetResolver.forVisionTasks()` timing with a user-specified WASM base path.
- Add a no-model `loadLiteRt()` WASM initialization timing probe.
- Add IndexedDB cache quota and model-file persistence checks.
- Add Worker + OffscreenCanvas timing to separate UI-thread pressure from model inference pressure.
- Add a route export as JSON for production diagnostics.
