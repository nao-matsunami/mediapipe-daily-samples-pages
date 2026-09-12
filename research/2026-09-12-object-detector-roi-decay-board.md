# 2026-09-12 Research Note: Object Detector ROI Decay Board

## Primary sources checked

- Google AI Edge / MediaPipe Object Detector task guide: https://developers.google.cn/edge/mediapipe/solutions/vision/object_detector
- Google AI Edge / MediaPipe Image Embedder Web guide: https://developers.google.cn/edge/mediapipe/solutions/vision/image_embedder/web_js
- Google AI Edge / MediaPipe setup guide for Web: https://developers.google.cn/edge/mediapipe/solutions/setup_web
- Google AI Edge / MediaPipe FilesetResolver API reference: https://developers.google.com/edge/api/mediapipe/js/tasks-audio.filesetresolver
- Official MediaPipe samples web repository: https://github.com/google-ai-edge/mediapipe-samples-web
- Official MediaPipe samples repository: https://github.com/google-ai-edge/mediapipe-samples
- Official MediaPipe web task demos: https://google-ai-edge.github.io/mediapipe-samples-web/

## Notes

- The Object Detector guide emphasizes still image, decoded video frame, and live video input, with score threshold, max results, locale labels, and category allowlist / denylist as useful control surfaces.
- The Web setup guide keeps the import surface split across vision, text, audio, and generative AI packages. This makes task-specific preflight checks useful before model download or camera permission.
- The Image Embedder Web guide explicitly notes synchronous Web task calls can block the UI thread. The same scheduling concern is worth carrying into object detection frame cadence experiments.
- The official samples web repository is a useful reference for browser-only Tasks demos, but today's published archive should keep self-made prototypes as the main card content.

## Prototype decision

- Main sample: `outputs/2026-09-12_object_detector_roi_decay_board.html`
  - Simulates object detection output and translates score threshold, max results, cadence, and missing frames into a short-lived ROI cache.
  - Shows how UI boxes can decay instead of blinking when detections are sparse or the detector cadence is reduced.

- Derivative sample: `outputs/2026-09-12_detector_label_policy_sandbox.html`
  - Turns allowlist / denylist / threshold / confirmation frames into a small label policy board.
  - Tests which detections can become UI events and which should remain pending or suppressed.
