# 2026-10-01 research note: Gesture Recognizer running mode switchboard

## Primary sources checked

- Google AI Edge Gesture recognition guide for Web: package setup, `runningMode`, `recognize()`, `recognizeForVideo()`, and worker guidance.
- Google AI Edge GestureRecognizer JavaScript API reference: synchronous `recognize` / `recognizeForVideo` calls and `setOptions()`.
- Google AI Edge setup guide for Web: Tasks package import and WASM root routing.
- GitHub `google-ai-edge/mediapipe` releases, especially MediaPipe v1.0.0 JavaScript notes such as IIFE bundles and VisionTaskRunner running mode cache.
- GitHub `google-ai-edge/mediapipe-samples-web` and its Gesture Recognizer worker source.
- npm `@mediapipe/tasks-vision`, where the public package remains the Tasks Vision Web integration point.

## Topic

Today focuses on the operational layer around Gesture Recognizer rather than the model result itself. The official Web guide separates image and video calls: `recognize()` for image mode and `recognizeForVideo(videoFrame, timestamp)` for video mode. The JavaScript API also exposes `setOptions()`, so a real app needs a policy for switching running mode, batching still-image interactions, and protecting the UI from synchronous inference cost.

The derivative issue is timestamp hygiene. Video recognition uses timestamps, and worker-based apps can receive stale results after newer frames are already displayed. Before wiring the real model, it is useful to test duplicate timestamps, rewinds, queue limits, and stale-result rejection with a synthetic source.

## Prototype mapping

- Main sample: `outputs/2026-10-01_gesture_running_mode_switchboard.html`
  - Simulates mixed still-image and video-frame inputs.
  - Shows `IMAGE` / `VIDEO` routing, `setOptions` switch cost, synchronous inference cost, queue depth, blocked time, and dropped work.
  - Next addition: connect a real `GestureRecognizer.createFromOptions` adapter and record actual mode-switch timings.

- Derivative sample: `outputs/2026-10-01_gesture_timestamp_monotonic_guard.html`
  - Simulates duplicate timestamps, rewind events, worker delay, queue limits, and stale result rejection.
  - Compares strict, repair, and loose timestamp policies.
  - Next addition: add an `ImageBitmap` transfer/close lane and compare main-thread versus worker display timing.

## Watch next

- `@mediapipe/tasks-vision` package versions after 1.0.1 and the rc / nightly line.
- MediaPipe release notes for JavaScript Tasks, running mode, and worker-friendly packaging updates.
- `mediapipe-samples-web` Gesture Recognizer source changes, especially worker message shapes.
- Google AI Edge Web setup guide changes around CDN, IIFE bundles, and WASM asset paths.
