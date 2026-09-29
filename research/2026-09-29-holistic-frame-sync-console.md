# 2026-09-29 Holistic Frame Sync Console

## Primary references

- Google AI Edge Holistic Landmarker Web guide: https://developers.google.com/edge/mediapipe/solutions/vision/holistic_landmarker/web_js
- Google AI Edge HolisticLandmarker JavaScript API: https://developers.google.com/edge/api/mediapipe/js/tasks-vision.holisticlandmarker
- MediaPipe Tasks Vision Web README: https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md
- mediapipe-samples-web repository: https://github.com/google-ai-edge/mediapipe-samples-web
- mediapipe-samples-web holistic worker: https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/workers/holistic-landmarker.worker.ts
- MediaPipe releases: https://github.com/google-ai-edge/mediapipe/releases
- npm @mediapipe/tasks-vision: https://www.npmjs.com/package/@mediapipe/tasks-vision

## Notes

- The Holistic Web guide says the task combines face, hand, and pose landmarkers and outputs normalized image coordinates plus 3D world coordinates.
- The guide exposes `runningMode`, face / pose detection and presence thresholds, hand landmark confidence, optional face blendshapes, and optional pose segmentation masks.
- Video inference uses `detectForVideo(video, timestamp)` and recommends processing frames when the video time changes.
- The Tasks Vision README includes the package-level setup path and a Privacy Notice: input processing is on device, while performance/utilization metrics may be sent to Google.
- The official sample repository demonstrates end-to-end task UI; today's samples focus on the downstream synchronization and command-policy layer rather than reproducing the demo.

## Prototype direction

- Main: a synthetic frame synchronization console that treats pose, face, left hand, and right hand as packets arriving from separate worker-like paths, then emits or holds a holistic bundle based on skew, confidence, and required stream policy.
- Derivative: a command router that converts holistic-level signals into app actions only after dwell and cooldown checks.
