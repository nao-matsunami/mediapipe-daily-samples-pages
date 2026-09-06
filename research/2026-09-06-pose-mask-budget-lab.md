# 2026-09-06 Pose Mask Budget Lab research

## Primary sources checked

- Google AI Edge Pose Landmarker Web guide: `runningMode`, `numPoses`, `minPoseDetectionConfidence`, `minPosePresenceConfidence`, `minTrackingConfidence`, and `outputSegmentationMasks`; output includes normalized landmarks, world landmarks, and optional segmentation masks.
- MediaPipe Tasks JS API reference: `@mediapipe/tasks-vision` is the package for Web vision tasks.
- MediaPipe Tasks Vision README: shows `FilesetResolver.forVisionTasks()` and model creation flow for Tasks Vision.
- `pose_landmarker_options.d.ts` in `google-ai-edge/mediapipe`: confirms Web option names and defaults.
- `tensors_to_pose_landmarks_and_segmentation.pbtxt` in `google-ai-edge/mediapipe`: confirms segmentation is gated and landmarks/world landmarks/mask are separate outputs.
- `mediapipe-samples-web` official demo/source: Pose Landmarker demo exposes model choices and sends confidence/mask options to a worker.
- npm package check on 2026-09-06 JST: `@mediapipe/tasks-vision` latest `1.0.1`, nightly `1.0.1-rc.20260905`; `@mediapipe/tasks-genai` latest `0.10.29`, nightly `1.0.1-rc.20260905`.

## Build decision

The main sample is an original browser-only simulator for Pose Landmarker mask budgeting. It does not list external demos as the artifact. It focuses on what must be designed around the real task: confidence gates, optional segmentation masks, estimated overlay cost, and frame drop/accept timelines.

The derivative sample tests a next-step idea from the report: turn landmark visibility and world-depth-like hints into small app events with confirmation frames.
