# 2026-08-24 research: Face Landmarker blendshape trigger layer

## Primary sources checked

- Google AI Edge: Face landmark detection guide for Web
  - https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js
  - Checked on 2026-08-24.
  - Notes: The Web guide states that Face Landmarker outputs 3D landmarks, blendshape scores, and transformation matrices. It also lists `outputFaceBlendshapes` and `outputFacialTransformationMatrixes`, and notes that `detect()` / `detectForVideo()` are synchronous and block the UI thread.
- Google AI Edge API: tasks-vision package
  - https://developers.google.com/edge/api/mediapipe/js/tasks-vision
  - Notes: Confirms `FaceLandmarkerOptions`, `FaceLandmarkerResult`, `FilesetResolver`, `DrawingUtils`, and related task classes.
- Google AI Edge API: FaceLandmarker class
  - https://developers.google.cn/edge/api/mediapipe/js/tasks-vision.facelandmarker
  - Notes: Documents `createFromOptions()`, `detect()`, `detectForVideo()`, `setOptions()`, and built-in face landmark connection constants.
- Official samples web repository
  - https://github.com/google-ai-edge/mediapipe-samples-web
  - Notes: The current repository describes a browser demo collection for MediaPipe Tasks across vision, audio, and text.
- Official face-landmarker implementation in samples web
  - https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/tasks/face-landmarker.ts
  - Notes: The sample sets confidence sliders and enables `outputFaceBlendshapes` and `outputFacialTransformationMatrixes`.
- MediaPipe tasks web vision README
  - https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md
  - Notes: Shows the general Web vision package pattern with `FilesetResolver.forVisionTasks()` and task creation from model paths.
- Official MediaPipe Tasks demo page
  - https://google-ai-edge.github.io/mediapipe-samples-web/
  - Notes: Used only as a reference for task coverage; not used as an archive card.

## Prototype direction

The daily sample should not duplicate a mesh overlay demo. The useful layer for this repository is a compact "result-to-interaction" adapter:

1. Enable `outputFaceBlendshapes` and `outputFacialTransformationMatrixes`.
2. Read a few blendshape groups such as smile, brow raise, and jaw open.
3. Smooth scores and gate them into user-facing cues.
4. Keep a fallback synthetic feed so the interaction layer can be tested without a face image or camera permission.

## Built samples

- `outputs/2026-08-24_face_blendshape_trigger_mixer.html`
  - Main prototype. Loads MediaPipe Face Landmarker, supports upload/camera/synthetic input, and maps blendshape-like scores to UI triggers.
  - Next additions: Worker `detectForVideo()`, real effect anchors from transformation matrices, cue JSON export, and Web Audio feedback.
- `outputs/2026-08-24_expression_cue_hysteresis_board.html`
  - Derivative prototype. Simulates blendshape streams and tunes threshold, hold time, release gap, and cooldown.
  - Next additions: import logs from the main sample, per-user calibration profiles, and graph annotations for false positives.
