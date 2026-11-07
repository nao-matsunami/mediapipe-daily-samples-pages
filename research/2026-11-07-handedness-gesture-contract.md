# 2026-11-07 — Handedness and gesture-action contracts

## Primary references

- [MediaPipe v1.2.2 release](https://github.com/google-ai-edge/mediapipe/releases/tag/v1.2.2): Tasks Web is now distributed with SIMD WASM builds, so a clear startup and interaction contract remains useful.
- [MediaPipe Tasks Web Vision README](https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md): primary package/API context and the Gesture Recognizer model URL.
- [Official Gesture Recognizer task sample](https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/tasks/gesture-recognizer.ts): the official demo routes the Task through a module Worker.
- [Handedness/mirroring issue #6376](https://github.com/google-ai-edge/mediapipe/issues/6376): an open discussion noting that the Web demos pass unmirrored webcam frames while CSS mirrors preview/overlay. It is a watch item, not a specification.

## Design takeaway

Keep anatomical handedness, input-frame handedness, screen-side wording, and UI action intent as separate fields. A CSS mirror may change where a hand appears but does not itself change inference input. An input-frame flip changes the Task-side coordinate/handedness interpretation. Classification results should pass a small confirmation guard before they become commands.
