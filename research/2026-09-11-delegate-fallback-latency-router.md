# 2026-09-11 research: Delegate fallback latency router

## Primary sources checked

- Google AI Edge JavaScript API reference: `@mediapipe/tasks-vision`
  - The package exposes task classes such as `FilesetResolver`, `FaceDetector`, `HandLandmarker`, `GestureRecognizer`, `ImageSegmenter`, `ObjectDetector`, and `PoseLandmarker`.
  - `FilesetResolver` verifies SIMD support and expects WASM files to be published without renaming, otherwise a manually created `WasmFileset` is needed.
- `google-ai-edge/mediapipe` GitHub repository
  - The Tasks Web Vision README shows the common initialization shape: `FilesetResolver.forVisionTasks(...)` followed by task creation from a model path.
  - The README also notes that input processing happens on device, while performance/utilization metrics require consent planning.
- `google-ai-edge/mediapipe-samples-web`
  - The official browser demo collection covers vision, audio, and text tasks and is useful as a reference for task coverage and controls.
- Official MediaPipe web task demo
  - The demo includes delegate controls and visible failure/fallback states when GPU or WASM/module loading is unavailable.
- Google AI Edge guide examples
  - Running modes are consistently separated into image, video, and live stream style usage. Video/live stream modes require timestamps, and live stream APIs return asynchronously while busy frames may be ignored.

## Design notes

- Today's main prototype does not duplicate an official demo. It turns a common Web ML integration problem into a small local router: preferred delegate, running mode, frame budget, GPU availability, synthetic initialization tax, and main-thread spikes produce a visible CPU/GPU/AUTO decision.
- The derivative prototype focuses on the next likely failure point: the path passed to `FilesetResolver` and the actual published WASM/module file names. It probes candidate URLs and creates a fail-soft plan before camera permission or model download.
- Both samples are original local HTML demos. They use synthetic frame data so the archive remains lightweight, while still checking the current Tasks Vision ESM import path or candidate asset URLs.

## Links

- https://developers.google.com/edge/api/mediapipe/js/tasks-vision
- https://developers.google.com/edge/api/mediapipe/js/tasks-audio.filesetresolver
- https://github.com/google-ai-edge/mediapipe
- https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md
- https://github.com/google-ai-edge/mediapipe-samples-web
- https://google-ai-edge.github.io/mediapipe-samples-web/
