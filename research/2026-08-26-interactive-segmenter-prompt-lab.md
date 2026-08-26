# 2026-08-26 Interactive Segmenter Prompt Lab

## Primary sources checked

- Google AI Edge: Interactive image segmentation guide for web
  - https://developers.google.com/edge/mediapipe/solutions/vision/interactive_segmenter/web_js
- Google AI Edge: Interactive image segmentation task guide
  - https://developers.google.com/edge/mediapipe/solutions/vision/interactive_segmenter
- Google AI Edge API reference: InteractiveSegmenter
  - https://developers.google.com/edge/api/mediapipe/js/tasks-vision.interactivesegmenter
- Google AI Edge API reference: InteractiveSegmenterResult
  - https://developers.google.com/edge/api/mediapipe/js/tasks-vision.interactivesegmenterresult
- Google AI Edge API reference: tasks-vision package
  - https://developers.google.com/edge/api/mediapipe/js/tasks-vision
- Official sample implementation
  - https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/tasks/interactive-segmenter.ts
- Official worker implementation
  - https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/workers/interactive-segmenter.worker.ts
- Official demo page
  - https://google-ai-edge.github.io/mediapipe-samples-web/

## Notes

- The updated Interactive Segmenter docs emphasize the recommended stateful workflow: set the image once and run repeated segmentation from user strokes or points.
- The Web guide lists the Magic Touch model URL and notes that `setImage()` and `segment()` are synchronous and can block the UI thread.
- The result object exposes confidence/category masks and `qualityScores`; masks should be copied or rendered immediately when later asynchronous UI work is needed.
- The official sample uses accumulated strokes, positive/negative/lasso brush modes, and a worker path. Today's sample keeps the UI minimal and focuses on prompt handling, task/fallback routing, and downstream prompt-priority composition.
