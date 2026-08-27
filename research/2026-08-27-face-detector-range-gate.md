# 2026-08-27 Face Detector Range Gate research

Primary references checked:

- Google AI Edge Face detection guide for Web: `https://developers.google.com/edge/mediapipe/solutions/vision/face_detector/web_js`
- Google AI Edge Face detection task guide: `https://developers.google.com/edge/mediapipe/solutions/vision/face_detector`
- FaceDetector JS API reference: `https://developers.google.com/edge/api/mediapipe/js/tasks-vision.facedetector`
- MediaPipe Tasks Vision README: `https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md`
- Official mediapipe-samples-web Face Detector implementation: `https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/tasks/face-detector.ts`
- MediaPipe v1.0.0 release notes: `https://github.com/google-ai-edge/mediapipe/releases/tag/v1.0.0`

Notes:

- Web guide shows `@mediapipe/tasks-vision`, `FilesetResolver.forVisionTasks`, `createFromOptions`, `detect`, and `detectForVideo`.
- Face Detector outputs bounding boxes and six normalized keypoints. The Web guide notes synchronous calls can block the UI thread, so Worker routing remains important for camera use.
- Task configuration exposes `minDetectionConfidence` and `minSuppressionThreshold`, which map cleanly to a small post-processing UI.
- Task overview distinguishes short-range and full-range BlazeFace variants. The official sample exposes both `blaze_face_short_range` and `blaze_face_full_range` model URLs.
- MediaPipe v1.0.0 release notes include JS packaging updates, public InteractiveSegmenter method exports, privacy notice additions, and Web / Gecko-related Text Embedder work. For today's sample, the practical thread is that browser Tasks keep moving toward clearer packaging and explicit runtime behavior.

Own samples created:

- `../outputs/2026-08-27_face_detector_range_gate.html`: generated-scene or uploaded-image Face Detector gate with optional real MediaPipe task loading.
- `../outputs/2026-08-27_face_box_nms_tuner.html`: derivative NMS / representative ROI post-processing sandbox.
