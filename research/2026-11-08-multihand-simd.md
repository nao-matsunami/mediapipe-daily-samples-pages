# 2026-11-08 — Multi-hand intent and SIMD-first Web startup

Primary references consulted:

- [MediaPipe v1.2.2 release](https://github.com/google-ai-edge/mediapipe/releases/tag/v1.2.2): the JavaScript update removes non-SIMD WebAssembly builds; it also clarifies that hand `Left` / `Right` labels are subject-relative and invert with horizontally mirrored input.
- [Gesture Recognizer on the Web](https://developers.google.com/edge/mediapipe/solutions/vision/gesture_recognizer?tab=Web): documents image/video use, multi-hand output, handedness, landmarks, gesture categories, and a `requestAnimationFrame` video loop.
- [Tasks Web Vision README](https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md): primary package/API reference.

These references are research input only. The two published cards for the day are original, dependency-free HTML interaction probes, not republished official demos.
