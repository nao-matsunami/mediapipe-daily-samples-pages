# 2026-08-23 Image Segmenter mask copy research

## Primary sources checked

- Google AI Edge: Image segmentation guide
  https://developers.google.com/edge/mediapipe/solutions/vision/image_segmenter
- Google AI Edge: Image segmentation guide for web
  https://developers.google.com/edge/mediapipe/solutions/vision/image_segmenter/web_js
- Google AI Edge API reference: tasks-vision package
  https://developers.google.com/edge/api/mediapipe/js/tasks-vision
- Google AI Edge API reference: ImageSegmenter class
  https://developers.google.com/edge/api/mediapipe/js/tasks-vision.imagesegmenter
- Google AI Edge API reference: ImageSegmenterOptions interface
  https://developers.google.com/edge/api/mediapipe/js/tasks-vision.imagesegmenteroptions
- Official MediaPipe Tasks demo repository
  https://github.com/google-ai-edge/mediapipe-samples-web
- Official MediaPipe Tasks Web demo page
  https://google-ai-edge.github.io/mediapipe-samples-web/
- LiteRT.js get started guide, for custom `.tflite` / WebGPU / WebNN contrast
  https://developers.google.com/edge/litert/web/get_started

## Notes

- The Image Segmenter overview was recently refreshed and is a good daily topic because it lists the person/background, hair, and multiclass segmentation use cases.
- The Web guide states that Image Segmenter uses `@mediapipe/tasks-vision`, creates a task with `FilesetResolver.forVisionTasks()`, and runs `segment()` / `segmentForVideo()`.
- The Web guide also warns that `segment()` and `segmentForVideo()` run synchronously and block the UI thread, and the API reference notes that mask data returned to callbacks is only valid during the callback if asynchronous processing is needed.
- The official demo repository remains useful for full app behavior, but today's public card should center on a self-made mask-copy and matte-inspection workflow.
- LiteRT.js remains a useful watch item for custom `.tflite` models and WebGPU / WebNN routing, but today's implementation stays with ready-made MediaPipe Tasks Vision.

## Prototype decision

Build one original sample that loads `ImageSegmenter`, runs the official selfie segmenter model against a canvas or uploaded image, copies the category mask inside the callback, and uses the copied bytes for matte compositing. Build a second derivative sample that simulates confidence/category mask ROI thresholding so the next interaction idea can be tested without loading a model.
