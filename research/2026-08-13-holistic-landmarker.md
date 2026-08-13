# 2026-08-13 Holistic Landmarker research

## Primary sources checked

- Google AI Edge Holistic landmarks detection task guide: https://developers.google.com/edge/mediapipe/solutions/vision/holistic_landmarker
- Google AI Edge HolisticLandmarker JavaScript API: https://developers.google.com/edge/api/mediapipe/js/tasks-vision.holisticlandmarker
- MediaPipe Tasks Vision Web README: https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md
- Official MediaPipe samples web Holistic Landmarker implementation: https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/tasks/holistic-landmarker.ts
- Official MediaPipe Web Task Demo: https://google-ai-edge.github.io/mediapipe-samples-web/
- MediaPipe releases: https://github.com/google-ai-edge/mediapipe/releases

## Notes

- The Holistic Landmarker guide says the task combines pose, face, and hand landmarkers into a complete human body landmarker.
- The guide describes 543 total landmarks: 33 pose, 468 face, and 21 landmarks per hand.
- The JavaScript API exposes `HolisticLandmarker`, `createFromOptions`, `createFromModelPath`, `detect`, `detectForVideo`, and `setOptions`.
- The API notes callback forms where mask lifetimes are limited to the callback, and synchronous forms that copy masks and are not ideal for high-throughput use.
- The official samples web repository draws face, pose, and hand groups separately using `DrawingUtils` and task-specific connection constants.
- CDN checks on 2026-08-13 confirmed `@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs`, the WASM binary, and the hosted `holistic_landmarker.task` URL returned HTTP 200.
- The README snippet for Holistic Landmarker currently points at a `hand_landmark.task` path that returned HTTP 404 in this run, while `holistic_landmarker.task` returned HTTP 200.

## Sample direction

Build an original minimal "readiness meter" instead of reproducing the official demo. The page generates a synthetic full-body figure, optionally loads the MediaPipe Holistic Landmarker, and collapses pose / face / hand completeness into a single readiness score for downstream interactions.
