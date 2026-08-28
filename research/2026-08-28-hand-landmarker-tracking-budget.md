# 2026-08-28 Hand Landmarker tracking budget research

Primary references checked:

- Google AI Edge Hand landmarks detection guide for Web: `https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/web_js`
- Google AI Edge Hand landmarks detection overview: `https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker`
- HandLandmarker JS API reference: `https://developers.google.com/edge/api/mediapipe/js/tasks-vision.handlandmarker`
- MediaPipe Tasks Vision README: `https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md`
- Official mediapipe-samples-web Hand Landmarker implementation: `https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/tasks/hand-landmarker.ts`
- Official mediapipe-samples-web Hand Landmarker worker: `https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/workers/hand-landmarker.worker.ts`
- Official MediaPipe Tasks demo page: `https://google-ai-edge.github.io/mediapipe-samples-web/`
- MediaPipe v1.0.0 release notes: `https://github.com/google-ai-edge/mediapipe/releases/tag/v1.0.0`

Notes:

- The Web guide states that Hand Landmarker uses `@mediapipe/tasks-vision`, `FilesetResolver.forVisionTasks()`, `HandLandmarker.createFromOptions()`, `detect()`, and `detectForVideo()`.
- Configuration options include `numHands`, `minHandDetectionConfidence`, `minHandPresenceConfidence`, and `minTrackingConfidence`.
- The guide explains that `detect()` and `detectForVideo()` are synchronous and can block the UI thread, so Web Worker routing matters for camera use.
- The overview says Hand Landmarker outputs handedness, 21 image landmarks, and 21 world landmarks.
- The official sample repository includes a Hand Landmarker task and worker implementation with runtime option updates.
- MediaPipe v1.0.0 release notes include JS packaging updates and MediaPipe Tasks privacy notice additions; for a static sample, explicit version pins and fallback status remain useful.

Own samples created:

- `../outputs/2026-08-28_hand_landmark_tracking_budget_lab.html`: synthetic Hand Landmarker tracking and frame-budget simulator with optional real task loading.
- `../outputs/2026-08-28_hand_feature_command_mixer.html`: derivative feature mixer that turns 21 synthetic landmarks into stable pinch/spread/tilt commands.
