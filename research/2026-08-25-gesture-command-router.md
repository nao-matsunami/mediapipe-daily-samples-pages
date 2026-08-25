# 2026-08-25 Gesture command routing

## Primary sources checked

- Google AI Edge: Gesture recognition guide for Web
  - https://developers.google.com/edge/mediapipe/solutions/vision/gesture_recognizer/web_js
  - Notes: the guide shows `@mediapipe/tasks-vision`, `FilesetResolver.forVisionTasks()`, `GestureRecognizer.createFromOptions()`, `recognize()` for image mode, and `recognizeForVideo()` for video mode. It also warns that recognition calls are synchronous and can block the UI thread.
- Google AI Edge API reference: GestureRecognizer class
  - https://developers.google.com/edge/api/mediapipe/js/tasks-vision.gesturerecognizer
  - Notes: the class exposes model construction helpers, `recognize()`, `recognizeForVideo(videoFrame, timestamp, imageProcessingOptions)`, `setOptions()`, and `HAND_CONNECTIONS`.
- Google AI Edge: Gesture recognition task guide
  - https://developers.google.com/edge/mediapipe/solutions/vision/gesture_recognizer
  - Notes: the task outputs hand landmarks, world landmarks, handedness, and recognized gesture categories, and includes score threshold / allowlist / denylist controls.
- Official MediaPipe samples web repository
  - https://github.com/google-ai-edge/mediapipe-samples-web
  - Notes: official browser task examples cover Vision, Audio, and Text tasks and run on-device in the browser.
- Official Gesture Recognizer implementation in mediapipe-samples-web
  - https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/tasks/gesture-recognizer.ts
  - Notes: the official implementation uses sliders for `numHands`, hand detection / presence / tracking confidence, a worker-backed task, and the official gesture recognizer model URL.
- Official demo page
  - https://google-ai-edge.github.io/mediapipe-samples-web/

## Today's direction

The interesting application layer is not another hand skeleton renderer. Gesture Recognizer already returns categories, landmarks, world landmarks, and handedness, so today's sample treats those outputs as a command stream. The sample adds an enter threshold, release threshold, hold frames, cooldown, and scenario-specific command mapping.

## Original samples

- `outputs/2026-08-25_gesture_command_router.html`
  - Main prototype. Uses the official task bundle if camera/model loading succeeds, then routes recognized gestures into deliberate UI commands. Falls back to a synthetic stream so the command router is always testable.
- `outputs/2026-08-25_two_hand_chord_resolver.html`
  - Derivative prototype. Tests a "left hand as mode key, right hand as action key" chord resolver with sync window and dwell frames.

## Next additions

- Move `recognizeForVideo()` to a Worker and keep only command events on the main thread.
- Export command events as JSONL with timestamp, handedness, top gesture, score, dwell, and active scenario.
- Use `worldLandmarks` to reject hands that are too close/far before command routing.
- Add allowlist/denylist UI for mode-specific gesture vocabularies.
- Combine with Web Audio for low-latency command confirmation tones.
