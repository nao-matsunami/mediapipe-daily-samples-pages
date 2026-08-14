# 2026-08-14 Text Classifier research

## Primary sources checked

- Text classification guide for Web: https://developers.google.com/edge/mediapipe/solutions/text/text_classifier/web_js
- Text Classifier overview: https://developers.google.com/edge/mediapipe/solutions/text/text_classifier
- Tasks text package API reference: https://developers.google.com/edge/api/mediapipe/js/tasks-text
- TextClassifier JavaScript API reference: https://developers.google.com/edge/api/mediapipe/js/tasks-text.textclassifier
- MediaPipe Tasks overview and privacy notice: https://developers.google.com/edge/mediapipe/solutions/tasks
- MediaPipe samples web repository: https://github.com/google-ai-edge/mediapipe-samples-web
- MediaPipe releases: https://github.com/google-ai-edge/mediapipe/releases

## Notes

- The Web guide says Text Classifier categorizes text into model-defined labels such as positive or negative sentiment.
- The Web guide uses `FilesetResolver.forTextTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text@latest/wasm/")` and a BERT classifier model at `https://storage.googleapis.com/mediapipe-tasks/text_classifier/bert_text_classifier.tflite`.
- Configuration options include `displayNamesLocale`, `maxResults`, `scoreThreshold`, `categoryAllowlist`, and `categoryDenylist`.
- The task handles tokenization and tensor preprocessing inside `classify()`, so the sample can keep text editing as the main UI.
- API reference exposes `TextClassifier.createFromOptions()`, `createFromModelPath()`, `createFromModelBuffer()`, `classify(text)`, and `setOptions()`.
- CDN checks on 2026-08-14:
  - `@mediapipe/tasks-text@latest/package.json` resolved to version `1.0.1`.
  - `@mediapipe/tasks-text@latest/wasm/` returned HTTP 200.
  - BERT text classifier model returned HTTP 200.
  - `@mediapipe/tasks-text@0.10.22` returned HTTP 404, so new samples should not pin that unavailable package.
- MediaPipe releases page currently lists MediaPipe v0.10.35 as latest, dated 2026-04-28, with JavaScript task notes including full-range face detector tests.

## Sample direction

Build an original prompt/copy tuning board, not a clone of the official sentiment demo. The sample uses Text Classifier as an optional runtime and converts positive-negative margin into a publish/rewrite gate. A local keyword fallback keeps the UI, controls, and reportable behavior testable when CDN or model loading is unavailable.
