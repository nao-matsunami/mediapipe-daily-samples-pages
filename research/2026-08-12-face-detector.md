# 2026-08-12 Face Detector notes

## Primary sources checked

- Face detection guide for Web: https://developers.google.com/edge/mediapipe/solutions/vision/face_detector/web_js
- MediaPipe legacy Face Detection docs in google-ai-edge/mediapipe: https://github.com/google-ai-edge/mediapipe/blob/master/docs/solutions/face_detection.md
- MediaPipe Tasks Vision JS API reference: https://developers.google.com/edge/api/mediapipe/js/tasks-vision
- Official MediaPipe Web Task Demo: https://google-ai-edge.github.io/mediapipe-samples-web/
- MediaPipe releases: https://github.com/google-ai-edge/mediapipe/releases
- npm package: https://www.npmjs.com/package/@mediapipe/tasks-vision

## Notes

- The Web guide describes Face Detector for images and videos, returning face locations plus six keypoints: left eye, right eye, nose tip, mouth, left eye tragion, and right eye tragion.
- Setup uses `@mediapipe/tasks-vision`, `FilesetResolver.forVisionTasks()`, and `FaceDetector.createFromOptions()` with a model asset path.
- Web configuration options include `runningMode` (`IMAGE` or `VIDEO`), `minDetectionConfidence`, and `minSuppressionThreshold`.
- `detect()` and `detectForVideo()` run synchronously and can block the UI thread, so camera samples should eventually move inference to a Worker.
- Legacy Face Detection docs call out BlazeFace and the usefulness of a fast face ROI as an input for face mesh, expression classification, and face region segmentation.
- Current release watch: MediaPipe v0.10.35 mentions JavaScript package export fixes and Vite worker task file use, both relevant to future Web samples.

## Sample direction

Build `Face Detector Privacy Gate`: a local generated portrait and optional camera stream that visualizes bbox, six keypoints, confidence, latency, and a simple threshold gate. It tries MediaPipe Tasks FaceDetector when loaded and keeps an always-working fallback that estimates a face-like region from canvas pixels.
