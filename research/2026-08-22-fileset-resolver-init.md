# 2026-08-22 FilesetResolver init stopwatch research

## Primary sources checked

- Google AI Edge API reference: FilesetResolver class  
  https://developers.google.com/edge/api/mediapipe/js/tasks-vision.filesetresolver
- Google AI Edge API reference: tasks-vision package  
  https://developers.google.com/edge/api/mediapipe/js/tasks-vision
- MediaPipe Tasks Vision package README in google-ai-edge/mediapipe  
  https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md
- Official MediaPipe Tasks demo repository  
  https://github.com/google-ai-edge/mediapipe-samples-web
- Official MediaPipe Tasks Web demo page  
  https://google-ai-edge.github.io/mediapipe-samples-web/
- LiteRT.js get started guide for comparison with custom model runtime routing  
  https://developers.google.com/edge/litert/web/get_started

## Notes

- FilesetResolver is the recurring first step for MediaPipe Tasks Vision samples. The docs and README examples consistently initialize a vision fileset before creating concrete tasks.
- The official samples repository is useful for full task behavior, but today's sample intentionally avoids showing another detector/segmenter card. It focuses on the runtime setup step that happens before model loading.
- LiteRT.js remains relevant as the alternative path for custom `.tflite` models, WebGPU, and experimental WebNN, but today's implementation stays inside MediaPipe Tasks Vision and measures `FilesetResolver.forVisionTasks()`.

## Prototype decision

Build an original stopwatch that imports `@mediapipe/tasks-vision`, calls `FilesetResolver.isSimdSupported()`, calls `FilesetResolver.forVisionTasks()` against a selectable WASM fileset URL, and visualizes cold/warm run timing against a first-interaction budget.
