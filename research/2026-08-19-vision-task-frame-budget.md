# 2026-08-19 Vision Task Frame Budget Governor

## Primary references

- Hand landmarks detection guide for Web  
  https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/web_js
- Face landmark detection guide for Web  
  https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js
- Object detection guide for Web  
  https://developers.google.com/edge/mediapipe/solutions/vision/object_detector/web_js
- Official MediaPipe Web Task Demo  
  https://google-ai-edge.github.io/mediapipe-samples-web/
- Official MediaPipe samples web repository  
  https://github.com/google-ai-edge/mediapipe-samples-web
- MediaPipe samples repository  
  https://github.com/google-ai-edge/mediapipe-samples

## Notes

- Multiple MediaPipe Tasks Web guides describe the `@mediapipe/tasks-vision` package, CDN import, `FilesetResolver.forVisionTasks()`, task creation from options, and `detect()` / `detectForVideo()` split for image and video modes.
- The Web guides explicitly warn that `detect()` and `detectForVideo()` run synchronously and can block the UI thread when called on camera frames. They recommend implementing Web Workers for continuous frame processing.
- The Hand Landmarker guide is useful because it explains the tracking confidence threshold and the way video mode can skip heavier detection when tracking succeeds. This makes it a good conceptual source for a frame governor.
- The official samples web repository is a useful implementation reference because it includes browser-run MediaPipe Tasks, Workers, and demo task modules, but today's public archive card should center the original governor sample rather than the official demo list.
- Today's original sample does not clone an official demo. It creates a minimal frame-budget simulator for deciding target inference FPS, queue length, Worker lane usage, and adaptive frame skipping before wiring a real `detectForVideo()` loop into a MediaPipe app.

## Prototype decision

Build `Vision Task Frame Budget Governor`: a self-contained HTML sample that simulates a camera stream, inference cost, jitter, queueing, frame drops, Worker lane behavior, adaptive skipping, and a 60-frame timeline. It includes an optional `@mediapipe/tasks-vision@0.10.35` CDN / WASM resolver probe so the sample still demonstrates the MediaPipe loading surface without requiring camera permission or a model download.
