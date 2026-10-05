# 2026-10-05 MediaPipe / Web ML research note

## Primary sources checked

- Google AI Edge Gesture recognition guide for Web: confirms `@mediapipe/tasks-vision`, model asset setup, IMAGE / VIDEO running modes, hand confidence options, canned gesture classifier options, synchronous `recognize()` / `recognizeForVideo()` behavior, and the worker recommendation for camera video.
- Google AI Edge Hand landmarks detection guide for Web: confirms `@mediapipe/tasks-vision`, `FilesetResolver.forVisionTasks`, model asset paths, IMAGE / VIDEO modes, `numHands`, `minHandDetectionConfidence`, `minHandPresenceConfidence`, `minTrackingConfidence`, and synchronous `detect()` / `detectForVideo()` behavior.
- Google AI Edge setup guide for Web: confirms supported web setup, package split for vision/text/audio/genai, CDN script options, `BaseOptions`, `modelAssetPath`, `modelAssetBuffer`, and CPU / GPU delegate options.
- GitHub `google-ai-edge/mediapipe` Tasks Vision Web README: useful for package/WASM path and local asset handling, plus the on-device framing for Tasks.
- GitHub `google-ai-edge/mediapipe-samples-web`: current official browser demos cover camera/image flows across vision tasks, useful as reference behavior but not copied into the public archive cards.
- GitHub MediaPipe releases: v1.0.0 notes include JavaScript IIFE bundles, Tasks Privacy Notice, running mode cache, and Web task changes that affect deployment preflight.

## Daily angle

Recent daily entries covered model fit, custom model metadata, bundle routing, object detector asset preflight, and gesture timestamp hygiene. Today focuses on the step immediately before live camera inference: should the app ask for camera, at what resolution/FPS, and should synchronous task calls stay on the main thread or be routed to a worker?

## Prototype decisions

- Main sample: `outputs/2026-10-05_camera_permission_frame_budget_lab.html`
  - Simulates secure context, camera permission query, target FPS, resolution, inference cost, confidence threshold, palm reacquire risk, and direct / throttle / worker routing.
  - Uses a synthetic camera canvas instead of requesting real video by default, so the sample stays safe and deterministic on GitHub Pages.
- Derivative sample: `outputs/2026-10-05_camera_constraint_fallback_router.html`
  - Simulates `getUserMedia` constraint fallback choices for facing mode, width, height, FPS, and common errors.
  - Turns a "next addition" idea into a small working ladder for requested / balanced / landmark safe / image mode routes.

## Next additions

- Add an optional real `navigator.mediaDevices.getUserMedia()` smoke test behind a clear user action.
- Add worker-based fake inference to compare main-thread blocking with posted frame summaries.
- Store preflight result snapshots in IndexedDB and show per-device recommended defaults.
- Add actual import probing for `@mediapipe/tasks-vision/vision_bundle.mjs` and WASM path health.
