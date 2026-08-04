# 2026-08-04 Object Detector notes

## Primary references

- Object detection guide for Web, Google AI Edge: https://developers.google.com/edge/mediapipe/solutions/vision/object_detector/web_js
- MediaPipe Tasks overview, Google AI Edge: https://developers.google.com/edge/mediapipe/solutions/tasks
- MediaPipe ObjectDetector Python API reference, Google AI for Developers: https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/vision/ObjectDetector
- MediaPipe ObjectDetectorOptions Python API reference, Google AI for Developers: https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/vision/ObjectDetectorOptions
- MediaPipe samples web repository: https://github.com/google-ai-edge/mediapipe-samples-web
- Official MediaPipe Tasks web demo: https://google-ai-edge.github.io/mediapipe-samples-web/
- MediaPipe repository releases: https://github.com/google-ai-edge/mediapipe/releases

## Notes

- The Web guide describes `@mediapipe/tasks-vision`, `FilesetResolver.forVisionTasks()`, `ObjectDetector.createFromOptions()`, and the EfficientDet Lite model hosted at `storage.googleapis.com/mediapipe-tasks/object_detector/efficientdet_lite0_uint8.tflite`.
- The Object Detector task returns detection results with bounding boxes and category scores. `scoreThreshold` and `maxResults` are useful controls for a minimal visual probe.
- `detect()` and `detectForVideo()` are synchronous in the Web guide, so live video use should eventually move inference into a Worker.
- The Tasks overview highlights on-device processing and links the task families across vision, text, and audio. For this daily archive, that privacy/locality framing is useful when explaining why an upload/camera sample can stay client-side.
- Today uses an original one-file sample, not an external demo card: a threshold lab with a synthetic scene, image upload, camera freeze, box overlay, timing readout, and fallback boxes for the synthetic scene.
