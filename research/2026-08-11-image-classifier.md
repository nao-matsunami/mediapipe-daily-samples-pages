# 2026-08-11 Image Classifier research

- Google AI Edge / MediaPipe Image classification guide for Web: https://developers.google.com/edge/mediapipe/solutions/vision/image_classifier/web_js
  - Last updated 2026-08-07 UTC.
  - Uses `@mediapipe/tasks-vision`, `FilesetResolver.forVisionTasks()`, `ImageClassifier.createFromOptions()`, and hosted EfficientNet-Lite0 model.
  - `classify()` and `classifyForVideo()` are synchronous and can block the UI thread; Worker execution is recommended for camera/video loops.
- Image classification task guide: https://developers.google.com/edge/mediapipe/solutions/vision/image_classifier
  - Outputs categories ranked by probability score.
  - Features include ROI classification, label locale, score threshold, top-k, allowlist, and denylist.
  - Recommended EfficientNet-Lite0 model is 224 x 224 and has float32 / int8 variants.
- Official MediaPipe Tasks Web demo: https://google-ai-edge.github.io/mediapipe-samples-web/
  - Useful as behavior reference, but today's archive card points to the original sample created in this workspace.
- Official samples web repository: https://github.com/google-ai-edge/mediapipe-samples-web
  - README lists Image Classifier among Vision tasks and frames the app as browser-only MediaPipe Tasks demos.

Today's prototype: generated-canvas Image Classifier probe. It creates three 224 x 224 canvases locally, uses fallback visual scores immediately, and can load MediaPipe ImageClassifier with EfficientNet-Lite0 for actual category outputs. The current sample pins the CDN runtime to `@mediapipe/tasks-vision@1.0.1`, because npm and jsDelivr currently resolve that release while `0.10.22` is not published as a stable package.
