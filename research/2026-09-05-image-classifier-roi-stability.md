# 2026-09-05 Image Classifier ROI Stability

## Primary sources checked

- Google AI Edge: Image classification guide for Web
  - https://developers.google.com/edge/mediapipe/solutions/vision/image_classifier/web_js
- Google AI Edge: Image classification task guide
  - https://developers.google.com/edge/mediapipe/solutions/vision/image_classifier
- Google AI Edge: Setup guide for Web
  - https://developers.google.com/edge/mediapipe/solutions/setup_web
- GitHub: MediaPipe Tasks Vision README
  - https://raw.githubusercontent.com/google-ai-edge/mediapipe/master/mediapipe/tasks/web/vision/README.md
- GitHub: MediaPipe image classification JS sample
  - https://github.com/google-ai-edge/mediapipe-samples/tree/main/examples/image_classification/js
- Official MediaPipe web task demos
  - https://google-ai-edge.github.io/mediapipe-samples-web/
- npm package check
  - `@mediapipe/tasks-vision` latest: 1.0.1, modified 2026-09-04T12:59:53.082Z
  - `@mediapipe/tasks-genai` latest: 0.10.29, modified 2026-09-04T12:48:31.729Z

## Notes

- Image Classifier can process still images, decoded video frames, and live video input, and returns ranked category results with score, category name, and display name when metadata provides them.
- Web configuration includes `runningMode`, `displayNamesLocale`, `maxResults`, `scoreThreshold`, `categoryAllowlist`, and `categoryDenylist`.
- The Web guide states that `classify()` and `classifyForVideo()` run synchronously and can block the UI thread for camera/video frames, so worker design remains relevant.
- The task overview calls out ROI classification, score threshold, top-k classification, and label allowlist/denylist as core features.
- The task overview says allowlist and denylist are mutually exclusive. The derivative sample makes that conflict explicit before a real Task configuration is built.
- EfficientNet-Lite0 remains the recommended starting model in the task guide, with 224 x 224 input and int8/float32 variants.

## Prototype decision

Today's main sample is a self-contained ROI stability lab. It does not mirror the official demo UI; it creates a synthetic scene and lets the user move an ROI, tune threshold/max results/confirmation frames, and see when a stable category is accepted.

The derivative sample turns the "category filter" idea into a policy checker for allowlist, denylist, threshold, and maxResults. It is meant to catch configuration mistakes and UI confusion before wiring the real Image Classifier result object.
