# 2026-09-01 research: Hand Landmarker reacquire threshold tuner

## Primary sources checked

- Google AI Edge: Hand landmarks detection guide for Web
  - https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/web_js
  - Notes: Web package is `@mediapipe/tasks-vision`; task can be created with `FilesetResolver.forVisionTasks()` and `HandLandmarker.createFromOptions()`. The guide lists `minHandDetectionConfidence`, `minHandPresenceConfidence`, and `minTrackingConfidence`. In video mode, when hand presence is below threshold the palm detector is triggered; tracking confidence is an IoU threshold and failed tracking also returns to detection. `detect()` / `detectForVideo()` are synchronous and can block the UI thread, so workers are recommended for camera-frame processing.

- Google AI Edge: Gesture recognition guide for Web
  - https://developers.google.com/edge/mediapipe/solutions/vision/gesture_recognizer/web_js
  - Notes: Gesture Recognizer returns recognized gestures plus hand landmarks. It is a useful comparison point for turning hand output into UI commands, but today's samples keep the public card centered on original local prototypes.

- Google AI Edge: LLM Inference guide for Web
  - https://developers.google.com/edge/mediapipe/solutions/genai/llm_inference/web_js
  - Notes: The genai web path remains relevant for watching WebGPU and local model constraints, but today's implementation stays with Tasks Vision.

- GitHub: official MediaPipe Tasks web samples
  - https://github.com/google-ai-edge/mediapipe-samples-web
  - Notes: Browser samples cover Vision, Audio, and Text Tasks and provide the official demo architecture reference.

- GitHub: MediaPipe Tasks Vision README
  - https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md
  - Notes: Confirms CDN/WASM setup patterns and the privacy note that task input processing happens on device while metrics can be sent.

- npm package check
  - `npm_config_cache=/private/tmp/npm-cache-mediapipe npm view @mediapipe/tasks-vision version`: `1.0.1`
  - `npm_config_cache=/private/tmp/npm-cache-mediapipe npm view @mediapipe/tasks-genai version`: `0.10.29`
  - The default npm cache was not readable in this environment because it contains root-owned files, so a temporary writable cache was used.

## Sample direction

Main sample: `outputs/2026-09-01_hand_reacquire_threshold_tuner.html`

- Load real Hand Landmarker when CDN, model fetch, and browser support are available.
- Continue as a local simulator when camera/model access is unavailable.
- Tune presence threshold, tracking threshold, and latency budget.
- Show whether the current frame should be treated as "track existing hand" or "reacquire palm detector".

Derivative sample: `outputs/2026-09-01_hand_depth_dwell_gate.html`

- Use a simplified z-depth stream to test near-zone dwell gating.
- Fire a command only once per near-zone visit.
- Provide a short pattern playback mode to stress the dwell threshold.

## Next watch list

- Changes to Hand Landmarker Web guide wording around workers and synchronous calls.
- `@mediapipe/tasks-vision` release after `1.0.1`.
- Official sample repo changes around worker boundaries and camera scheduling.
- Whether Tasks Vision exposes more directly usable per-frame tracking diagnostics for web apps.
