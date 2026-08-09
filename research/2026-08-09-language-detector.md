# 2026-08-09 Language Detector research

- Google AI Edge / MediaPipe Language Detector Web guide: `@mediapipe/tasks-text`, `FilesetResolver.forTextTasks()`, `LanguageDetector.createFromOptions()`, the hosted `language_detector.tflite`, and `detect(inputText)` are the core Web path.
- Language Detector overview: the task accepts a string and returns language predictions with ISO 639-1 / locale-like codes and probabilities. The recommended model is described as lightweight at 315 KB and able to identify 110 languages.
- Configuration options to reflect in UI: `maxResults`, `scoreThreshold`, `categoryAllowlist`, and `categoryDenylist`; allowlist and denylist are mutually exclusive.
- MediaPipe Tasks Text package reference lists `LanguageDetector`, `TextClassifier`, and `TextEmbedder`, which keeps this sample in the same Text task family as the previous day's Text Embedder.
- Official MediaPipe Tasks web demo and `google-ai-edge/mediapipe-samples-web` confirm that Language Detection, Text Classification, and Text Embedding are grouped as browser-runnable Text demos.
- MediaPipe Tasks privacy notice says task input processing happens on device and input data is not sent to Google servers, while API metrics may be sent for performance, usage, debug, maintenance, and improvement.

## Primary links

- https://developers.google.com/edge/mediapipe/solutions/text/language_detector/web_js
- https://developers.google.com/edge/mediapipe/solutions/text/language_detector
- https://developers.google.com/edge/api/mediapipe/js/tasks-text
- https://google-ai-edge.github.io/mediapipe-samples-web/
- https://github.com/google-ai-edge/mediapipe-samples-web
- https://github.com/google-ai-edge/mediapipe-samples
- https://developers.google.com/edge/mediapipe/solutions/tasks
