# 2026-08-18 Research: Object Detector zone dwell timer

## Primary references

- Google AI Edge: Object detection guide for Web
  - https://developers.google.com/edge/mediapipe/solutions/vision/object_detector/web_js
  - Notes: `@mediapipe/tasks-vision`, `FilesetResolver.forVisionTasks()`, `ObjectDetector.createFromOptions()`, `detect()` for images, `detectForVideo()` for video, and the official EfficientDet Lite0 model URL are documented. The guide also notes that sync calls can block the UI thread.
- Google AI Edge: Object detection task guide
  - https://developers.google.com/edge/mediapipe/solutions/vision/object_detector
  - Notes: the task detects object categories, scores, and bounding boxes from still images, decoded video frames, or live video feeds. Useful options include score threshold, top-k, locale, allowlist, and denylist.
- Google AI Edge JavaScript API: ObjectDetector class
  - https://developers.google.com/edge/api/mediapipe/js/tasks-vision.objectdetector
  - Notes: `createFromModelPath()`, `createFromModelBuffer()`, `createFromOptions()`, `detect()`, and `detectForVideo()` are the main methods.
- Google AI Edge JavaScript API: tasks-vision package
  - https://developers.google.com/edge/api/mediapipe/js/tasks-vision
  - Notes: confirms `ObjectDetector`, `FilesetResolver`, `DrawingUtils`, and related Vision Task APIs.
- Official MediaPipe Web Task Demo
  - https://google-ai-edge.github.io/mediapipe-samples-web/
  - Notes: reference for the official demo surface only; not used as an archive card.
- Official samples repository
  - https://github.com/google-ai-edge/mediapipe-samples-web
  - Notes: lists Object Detection as one of the supported browser tasks and provides the TypeScript sample app context.

## Sample decision

Today's original sample is `Object Detector Zone Dwell Timer`.

The public archive should center the self-made interaction:

- Convert bounding boxes into zone entry and dwell time instead of only drawing detection rectangles.
- Use the official MediaPipe Object Detector path when camera/model access is available.
- Keep a synthetic detection stream so the dwell gate and UI are testable without camera permission or model download.
- Track score threshold, zone width, dwell alert seconds, synthetic speed, visible detections, objects in zone, max dwell, and per-object timers.

## Follow-ups

- Add lightweight IoU matching so real camera detections keep stable IDs across frames.
- Move `detectForVideo()` to a Worker and sample at lower FPS.
- Add category allowlist / denylist UI for person-only or object-only zones.
- Export dwell events as JSONL for later analytics.
