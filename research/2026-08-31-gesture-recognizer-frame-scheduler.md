# 2026-08-31 Gesture Recognizer frame scheduler research

## Sources checked

- Google AI Edge Gesture recognition task guide: https://developers.google.cn/edge/mediapipe/solutions/vision/gesture_recognizer
- Google AI Edge Gesture recognition guide for Web: https://developers.google.cn/edge/mediapipe/solutions/vision/gesture_recognizer/web_js
- MediaPipe Tasks Vision README in google-ai-edge/mediapipe: https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md
- Official MediaPipe Tasks web samples: https://github.com/google-ai-edge/mediapipe-samples-web
- Official hand-landmarker sample implementation for current web sample structure: https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/tasks/hand-landmarker.ts
- Legacy MediaPipe Hands doc for palm detect plus landmark tracking pipeline background: https://github.com/google-ai-edge/mediapipe/blob/master/docs/solutions/hands.md

## Notes

- The Gesture Recognizer task returns recognized gesture categories together with hand landmarks, world landmarks, and handedness.
- The Web guide documents image and video entry points and notes that recognition calls are synchronous and can block the UI thread; worker offload is recommended for video pipelines.
- The Tasks Vision README still gives the compact browser pattern: `FilesetResolver.forVisionTasks()` plus `GestureRecognizer.createFromModelPath()` / model URL.
- The official samples repository is useful for reference, but today's archive card should remain centered on original minimal samples in this workspace.
- The legacy Hands page is useful context for why tracking and detector fallback affect latency: the palm detector is not necessarily invoked on every frame when tracking remains stable.

## Prototype decision

Build a self-contained Gesture Recognizer frame scheduler that can:

- Load `@mediapipe/tasks-vision@1.0.1` from CDN.
- Create a `GestureRecognizer` using the official hosted task model.
- Run camera video through `recognizeForVideo()` when available.
- Still work without camera/model through a manual gesture stream.
- Surface target FPS, same-frame skip, simulated UI block, latency, and route advice.

Derivative sample:

- Convert raw gesture frames into commands with vote window, min vote threshold, and cooldown.
- Use button-driven simulated frames so the command-stability layer can be tuned quickly before wiring to the real recognizer.
