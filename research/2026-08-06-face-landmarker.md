# 2026-08-06 Face Landmarker research

## Primary sources checked

- Face landmark detection guide for Web: https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js
- Face Landmarker overview: https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker
- MediaPipe Tasks Vision JS API: https://developers.google.com/edge/api/mediapipe/js/tasks-vision
- FilesetResolver API: https://developers.google.com/edge/api/mediapipe/js/tasks-text.filesetresolver
- MediaPipe samples web repository: https://github.com/google-ai-edge/mediapipe-samples-web
- Official MediaPipe Tasks web demo: https://google-ai-edge.github.io/mediapipe-samples-web/
- MediaPipe repository releases: https://github.com/google-ai-edge/mediapipe/releases

## Notes

- Face Landmarker returns 478 3D face landmarks, optional blendshape scores, and optional facial transformation matrices.
- The Web guide describes `detect()` for IMAGE mode and `detectForVideo()` for VIDEO mode. Both calls are synchronous, so continuous video should move inference to a Worker for production-like use.
- `FilesetResolver.forVisionTasks()` resolves the WASM files and checks SIMD support.
- The official samples web repository is useful for task coverage and UI control references, but today's public card points to the original local HTML sample.
- Latest searched MediaPipe release context showed v0.10.35 as the latest GitHub release in the repository summary, while the daily sample pins `@mediapipe/tasks-vision@0.10.22` to stay consistent with prior archive samples.

## Today's original sample

- `outputs/2026-08-06_face_landmarker_expression_mirror.html`
- Synthetic fallback face with generated landmarks and blendshape bars.
- Optional MediaPipe Face Landmarker load from CDN/model storage.
- Upload image and camera freeze paths run `detect(canvas)` when the model is available.
