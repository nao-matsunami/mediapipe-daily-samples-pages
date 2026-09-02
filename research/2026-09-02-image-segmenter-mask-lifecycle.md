# 2026-09-02 research: Image Segmenter mask lifecycle sentinel

## Primary sources checked

- Google AI Edge: Image segmentation guide for Web
  - https://developers.google.com/edge/mediapipe/solutions/vision/image_segmenter/web_js
  - Notes: Image Segmenter supports image and video running modes, category masks, confidence masks, and canvas-based display patterns. The task follows the same Web Tasks setup using `@mediapipe/tasks-vision` and `FilesetResolver.forVisionTasks()`.

- Google AI Edge: Face Landmarker guide for Web
  - https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js
  - Notes: The guide reiterates the `IMAGE` / `VIDEO` running-mode split and warns that `detect()` / `detectForVideo()` are synchronous and can block the UI thread. This remains relevant for segmentation video pipelines as well.

- GitHub: MediaPipe Tasks Vision README
  - https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md
  - Notes: Confirms CDN/WASM setup patterns for Tasks Vision and includes the privacy notice that input data is processed on device while API metrics may be sent.

- GitHub: official MediaPipe Tasks web samples
  - https://github.com/google-ai-edge/mediapipe-samples-web
  - Notes: The sample app covers Vision, Audio, and Text Tasks and is the current official browser demo architecture reference.

- GitHub: official image segmenter sample
  - https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/tasks/image-segmenter.ts
  - Notes: The task file exposes model choices such as DeepLab V3, Hair Segmenter, Selfie Segmenter, and Selfie Multi-class. It switches between category mask and confidence mask UI paths.

- GitHub: official image segmenter worker
  - https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/workers/image-segmenter.worker.ts
  - Notes: The worker creates `ImageSegmenter` with both category and confidence masks, renders masks with OffscreenCanvas/WebGL, transfers `ImageBitmap`, and closes returned masks.

- GitHub: MediaPipe DrawingUtils
  - https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/core/drawing_utils.ts
  - Notes: `drawConfidenceMask()` blends default and overlay textures and can draw through WebGL or 2D contexts. Still-image reuse can avoid repeated uploads if a canvas is passed.

- npm package check
  - `npm_config_cache=/private/tmp/npm-cache-mediapipe npm view @mediapipe/tasks-vision version`: `1.0.1`
  - `npm_config_cache=/private/tmp/npm-cache-mediapipe npm view @mediapipe/tasks-genai version`: `0.10.29`

## Sample direction

Main sample: `outputs/2026-09-02_image_segmenter_mask_lifecycle_sentinel.html`

- Simulate category and confidence mask frames without relying on camera permission.
- Show the difference between closing masks after drawing and retaining masks for inspection.
- Track retained-mask count, estimated retained bytes, frame cost, and frame-budget pressure.
- Include a MediaPipe Tasks Vision API preflight button for CDN/WASM availability.

Derivative sample: `outputs/2026-09-02_confidence_mask_alpha_curve_lab.html`

- Convert synthetic confidence values into overlay alpha.
- Tune threshold, gamma, and edge boost.
- Surface a small transfer-function recipe that can be moved into `DrawingUtils.drawConfidenceMask()` usage.

## Next watch list

- Changes in official Image Segmenter Web guide around mask output APIs and lifecycle wording.
- Updates in `mediapipe-samples-web` worker patterns, especially `OffscreenCanvas` and transferable results.
- `@mediapipe/tasks-vision` releases after 1.0.1.
- Browser differences in WebGL2, OffscreenCanvas, and worker support for mask rendering.
