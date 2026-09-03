# 2026-09-03 Image Embedder Similarity Scout research

## Primary sources checked

- Google AI Edge / MediaPipe Image embedding guide for Web: https://developers.google.com/edge/mediapipe/solutions/vision/image_embedder/web_js
- Google AI Edge JS API reference for `ImageEmbedder`: https://developers.google.com/edge/api/mediapipe/js/tasks-vision.imageembedder
- MediaPipe Tasks Vision README: https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md
- Official MediaPipe web samples app: https://google-ai-edge.github.io/mediapipe-samples-web/
- Official `mediapipe-samples-web` Image Embedder source: https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/tasks/image-embedder.ts
- MediaPipe Solutions guide: https://mediapipe.dev/

## Notes

- The Web guide says Image Embedder converts image data into a numeric representation for tasks such as comparing image similarity.
- The JavaScript API reference exposes `ImageEmbedder.cosineSimilarity(u, v)` plus `embed()` and `embedForVideo()`.
- The Web guide notes that `embed()` and `embedForVideo()` run synchronously and can block the UI thread, so video-frame embedding should be moved to a Web Worker.
- The official samples app includes Image Embedding alongside Face Detector, Face Landmarker, Gesture Recognizer, Hand Landmarker, Image Segmenter, Interactive Segmenter, Object Detector, Pose Landmarker, audio, and text tasks.
- The official sample source creates image bitmaps and posts them to a worker for embedding comparison, with MobileNet V3 Small as the default model URL.
- npm check on 2026-09-03 JST: `@mediapipe/tasks-vision` is `1.0.1`; `@mediapipe/tasks-genai` is `0.10.29`.

## Prototype direction

- Main sample: build a synthetic two-image similarity scout that mirrors the expected Image Embedder interaction: prepare two images, produce normalized feature vectors, compute cosine similarity, and show whether a pair is close enough to route as the same visual idea.
- Derivative sample: isolate the next-step routing rule. Feed similarity scores through adjustable match/review thresholds and show which product behavior would fire.
- Next integration step: replace the synthetic 16-dimensional features with `ImageEmbedder.embed(image).embeddings[0]` and use `ImageEmbedder.cosineSimilarity()` directly.
