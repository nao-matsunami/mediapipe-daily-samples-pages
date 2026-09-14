# 2026-09-14 Gesture stream backpressure

## Primary references checked

- Google AI Edge Gesture Recognizer Web guide: `runningMode`, `recognizeForVideo()`, confidence options, canned gesture classifier options, synchronous blocking note, and result fields.
- Google AI Edge setup guide for Web: package/CDN setup and browser requirements for MediaPipe Tasks.
- GitHub `google-ai-edge/mediapipe` Tasks Vision Web README: package-level Web Vision examples and exports.
- GitHub MediaPipe releases: v1.0.0 and recent release notes around Tasks / JavaScript updates.
- npm `@mediapipe/tasks-vision`: current latest version 1.0.1 and recent nightly tag list.

## Design note

The original sample should not clone the official demo. It focuses on the application-side contract around video gesture recognition: skip duplicate timestamps, avoid returning stale worker results to the UI, cap queue pressure, and turn classifier results into stable commands only after threshold and dwell checks.

## Prototype files

- `outputs/2026-09-14_gesture_stream_backpressure_console.html`
- `outputs/2026-09-14_gesture_command_policy_sandbox.html`

