# 2026-08-16 Face Stylizer research notes

- Google AI Edge / MediaPipe `tasks-vision` JS API lists `FaceStylizer` alongside other Vision tasks and exposes `FilesetResolver`.
- `FaceStylizer.stylize()` for JavaScript supports image running mode and can either return an `MPImage | null` or use a callback. The returned result can be `null` when no face is detected.
- Official / primary sample code for Face Stylizer uses model bundles under `https://storage.googleapis.com/mediapipe-models/face_stylizer/blaze_face_stylizer/float32/latest/`.
- Available public style bundles referenced by the official demo are `face_stylizer_oil_painting.task`, `face_stylizer_color_ink.task`, and `face_stylizer_color_sketch.task`.
- The customization guide says Face Stylizer model export produces a `face_stylizer.task` bundle that contains the models needed downstream, and notes that MediaPipe Model Maker is still available but no longer actively maintained.
- MediaPipe release notes for v0.10.35 mention JavaScript task packaging fixes and Vite worker compatibility, so the sample pins `@mediapipe/tasks-vision@0.10.35`.

References:

- https://developers.google.com/edge/api/mediapipe/js/tasks-vision
- https://developers.google.com/edge/api/mediapipe/js/tasks-vision.facestylizer
- https://developers.google.com/edge/mediapipe/solutions/customization/face_stylizer
- https://github.com/google-ai-edge/mediapipe/releases
- https://github.com/google-ai-edge/mediapipe-samples-web
- https://google-ai-edge.github.io/mediapipe-samples-web/
- https://codepen.io/mediapipe-preview/pen/wvRBPmR
