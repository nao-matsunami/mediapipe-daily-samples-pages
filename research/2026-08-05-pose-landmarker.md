# 2026-08-05 Pose Landmarker notes

## Primary references

- Pose landmark detection guide for Web, Google AI Edge: https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker/web_js
- Pose landmark detection overview, Google AI Edge: https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker
- MediaPipe Tasks overview, Google AI Edge: https://developers.google.com/edge/mediapipe/solutions/tasks
- Setup guide for Web, Google AI Edge: https://developers.google.com/edge/mediapipe/solutions/setup_web
- tasks-vision JavaScript API reference, Google AI Edge: https://developers.google.com/edge/api/mediapipe/js/tasks-vision
- MediaPipe samples web repository: https://github.com/google-ai-edge/mediapipe-samples-web
- Official MediaPipe Tasks web demo: https://google-ai-edge.github.io/mediapipe-samples-web/
- MediaPipe repository: https://github.com/google-ai-edge/mediapipe

## Notes

- Pose Landmarker outputs 33 normalized pose landmarks and world landmarks. The overview also notes an optional segmentation mask for pose.
- The Web guide uses `@mediapipe/tasks-vision`, `FilesetResolver.forVisionTasks()`, `PoseLandmarker.createFromOptions()`, and the `pose_landmarker_lite.task` model bundle.
- The Web guide separates still image `detect()` from video `detectForVideo()` and notes that these calls are synchronous, so continuous camera use should eventually move into a Worker.
- The Tasks overview frames MediaPipe Tasks as cross-platform, low-code APIs for Android, Web / JavaScript, Python, and iOS support where available. It also states that task input processing happens on device.
- Today uses an original one-file sample, not an external demo card: a balance meter that draws 33-point pose skeletons, computes shoulder/hip/ankle balance, supports upload and camera freeze, and keeps a synthetic fallback pose interactive when model or CDN loading fails.
