# 2026-08-17 Hand Landmarker pinch depth cursor research

## Primary sources checked

- Google AI Edge, Hand landmarks detection guide for Web: https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/web_js
- Google AI Edge, Hand Landmarker JavaScript API reference: https://developers.google.com/edge/api/mediapipe/js/tasks-vision.handlandmarker
- Google AI Edge, tasks-vision package reference: https://developers.google.com/edge/api/mediapipe/js/tasks-vision
- Google AI Edge, MediaPipe Tasks privacy notice: https://developers.google.com/edge/mediapipe/solutions/tasks
- Google AI Edge official MediaPipe samples web: https://google-ai-edge.github.io/mediapipe-samples-web/
- google-ai-edge/mediapipe-samples-web repository: https://github.com/google-ai-edge/mediapipe-samples-web
- google-ai-edge/mediapipe releases: https://github.com/google-ai-edge/mediapipe/releases

## Notes

- The Hand Landmarker Web guide was checked on 2026-08-17. It describes `@mediapipe/tasks-vision`, `FilesetResolver.forVisionTasks()`, `HandLandmarker.createFromOptions()`, `runningMode`, confidence thresholds, `detect()` for images, and `detectForVideo()` for video frames.
- The result includes handedness, 21 normalized image landmarks, and 21 world landmarks. The guide states normalized `z` uses roughly the same scale as `x`, while world landmarks are in meters.
- The API reference exposes `HandLandmarker.HAND_CONNECTIONS`, which is useful for drawing a consistent hand skeleton without copying connector pairs.
- The MediaPipe Tasks page includes a privacy notice: input data is processed on device, while metrics about performance and utilization may be sent to Google.
- GitHub releases showed MediaPipe v1.0.0 as the latest release page item on 2026-08-17. The release notes include JavaScript items such as IIFE bundles, a MediaPipe Tasks Privacy Notice, cached running mode in `VisionTaskRunner`, and Text Embedder Gecko support.
- The official samples web app lists Hand Landmarker as one of the browser demos. Today's public card should not duplicate that demo; it should center this workspace's original pinch/depth cursor sample.

## Sample decision

Build `Hand Landmarker Pinch Depth Cursor`: a minimal browser app that loads the official hand landmarker task model, uses webcam video with `detectForVideo()`, derives a normalized thumb-index pinch ratio, reads z-depth difference, estimates stability from recent frames, and turns the result into a Canvas cursor gate. A synthetic demo trace is included so the transformation can be inspected even before camera permission is granted.
