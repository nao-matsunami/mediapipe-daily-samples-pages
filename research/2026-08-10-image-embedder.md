# 2026-08-10 Image Embedder research

## Primary sources checked

- Image embedding guide for Web: https://developers.google.com/edge/mediapipe/solutions/vision/image_embedder/web_js
- Image embedding task guide: https://developers.google.com/edge/mediapipe/solutions/vision/image_embedder
- ImageEmbedder JavaScript API reference: https://developers.google.com/edge/api/mediapipe/js/tasks-vision.imageembedder
- MediaPipe Tasks web demo repository: https://github.com/google-ai-edge/mediapipe-samples-web
- Official MediaPipe Tasks web demo: https://google-ai-edge.github.io/mediapipe-samples-web/
- MediaPipe releases: https://github.com/google-ai-edge/mediapipe/releases

## Notes

- The Web guide was last updated 2026-08-07 UTC and shows `@mediapipe/tasks-vision`, `FilesetResolver.forVisionTasks()`, `ImageEmbedder.createFromOptions()`, and the hosted MobileNetV3 small model path.
- The overview frames Image Embedder as a way to create numeric image representations and compare image similarity with cosine similarity.
- The task supports still images, decoded video frames, and live video feed inputs, with output embeddings in floating-point or quantized form.
- Configuration points worth exposing in small UI samples: `runningMode`, `l2Normalize`, and `quantize`.
- The Web guide warns that `embed()` and `embedForVideo()` are synchronous and can block the UI thread, so a production path should use a worker for video or repeated comparisons.
- Today's sample uses locally generated canvas patches first, then optionally swaps to the official MediaPipe Image Embedder when the CDN/model path loads.
