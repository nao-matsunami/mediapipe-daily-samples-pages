# 2026-09-07 Holistic Output Budget Console research

- Google AI Edge Holistic Landmarker Web guide, last updated 2026-08-19 UTC, describes Holistic Landmarker as combining face, hand, and pose landmarkers and outputting normalized image coordinates plus 3D world coordinates.
- The same guide lists Web options including `runningMode`, face detection / suppression / presence confidence, pose detection / suppression / presence confidence, `minHandLandmarksConfidence`, `outputFaceBlendshapes`, and `outputPoseSegmentationMasks`.
- The guide notes `detect()` for IMAGE and `detectForVideo()` for VIDEO, with a render loop that skips repeated `video.currentTime` frames.
- Google AI Edge JS API reference exposes `HolisticLandmarker` under `tasks-vision`.
- GitHub `holistic_landmarker.ts` shows separate result streams for pose landmarks, pose world landmarks, pose segmentation masks, face landmarks, face blendshapes, left/right hand landmarks, and left/right world landmarks. It also warns that callback-returned masks have callback-scoped lifetime and should be copied for asynchronous use.
- `mediapipe-samples-web` continues to present Holistic Landmarker as one of the browser-running MediaPipe Task demos.
- npm check on 2026-09-07 JST: `@mediapipe/tasks-vision` latest `1.0.1`, nightly `1.0.1-rc.20260906`; `@mediapipe/tasks-genai` latest `0.10.29`, nightly `1.0.1-rc.20260906`.

Prototype decision:

- Build the main sample around output budgeting rather than a model call: face, pose, hand, optional blendshapes, optional pose segmentation masks, estimated cost, and dropped frames.
- Build the derivative sample around command routing: combine face blendshape-like smile, hand-open cues, and pose center shift into stable UI commands with confirmation frames.
