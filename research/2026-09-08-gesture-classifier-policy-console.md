# 2026-09-08 research: Gesture Recognizer classifier policy

## Primary sources checked

- Google AI for Developers API reference: `mp.tasks.vision.GestureRecognizerOptions`
  - `running_mode` supports image, video, and live stream modes.
  - Gesture options include `num_hands`, `min_hand_detection_confidence`, `min_hand_presence_confidence`, and `min_tracking_confidence`.
  - Canned classifier options expose score threshold and allow/deny lists; documented canned gesture names include `None`, `Closed_Fist`, `Open_Palm`, `Pointing_Up`, `Thumb_Down`, `Thumb_Up`, `Victory`, and `ILoveYou`.
- Google AI Edge / MediaPipe GitHub repository
  - MediaPipe is the open source project behind MediaPipe Solutions and Tasks.
  - Current repository page points developers to MediaPipe Solutions guides and notes that Tasks processing happens on device, while usage/performance metrics may be sent.
- `google-ai-edge/mediapipe-samples-web`
  - Official browser demo collection for MediaPipe Task APIs, covering vision, audio, and text tasks.
- GitHub releases for `google-ai-edge/mediapipe`
  - Search result and releases page show MediaPipe `v1.0.0` as latest, released 2026-07-28.
- npm registry
  - On 2026-09-08 JST, `@mediapipe/tasks-vision` latest is `1.0.1` and nightly is `1.0.1-rc.20260907`.
  - On 2026-09-08 JST, `@mediapipe/tasks-genai` latest is `0.10.29` and nightly is `1.0.1-rc.20260907`.

## Design notes

- Today's main prototype treats Gesture Recognizer output as a policy problem: top gesture, score threshold, list mode, and confirmation frames decide whether UI commands should fire.
- The derivative prototype tests the next interaction idea: combine gesture class and hand screen zone so the same gesture can have different intent in left, center, and right regions.
- Both samples are original local HTML demos. They use synthetic data so the public archive does not depend on camera permission or model downloads, while the main sample still checks the Tasks Vision ESM export path.

## Links

- https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/vision/GestureRecognizerOptions
- https://github.com/google-ai-edge/mediapipe
- https://github.com/google-ai-edge/mediapipe/releases
- https://github.com/google-ai-edge/mediapipe-samples-web
- https://google-ai-edge.github.io/mediapipe-samples-web/
