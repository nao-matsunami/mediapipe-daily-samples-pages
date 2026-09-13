# 2026-09-13 Research Note: Hand Landmark Coordinate Calibrator

## Primary sources checked

- Google AI Edge / MediaPipe Hand Landmarker Web guide: https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/web_js
- Google AI Edge / MediaPipe Face Landmarker Web guide: https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js
- Google AI Edge / MediaPipe setup guide for Web: https://developers.google.com/edge/mediapipe/solutions/setup_web
- Google AI Edge API: NormalizedKeypoint: https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/components/containers/keypoint/NormalizedKeypoint
- Google AI Edge API: NormalizedRect: https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/components/containers/NormalizedRect
- Google AI Edge API: GestureRecognizerResult: https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/vision/GestureRecognizerResult
- GitHub: google-ai-edge/mediapipe releases: https://github.com/google-ai-edge/mediapipe/releases
- GitHub: MediaPipe Tasks Vision Web README: https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md

## Notes

- The Hand Landmarker Web guide says the task exposes 21 normalized hand landmarks, world landmarks, and handedness. The normalized x/y values are scaled by image width and height, while z uses the wrist as origin and a scale roughly comparable to x.
- The same Web guide notes that `detect()` and `detectForVideo()` are synchronous and can block the UI thread, so production code should plan workers, cadence, or busy-frame gating.
- The Hand Landmarker options expose running mode, number of hands, hand detection confidence, hand presence confidence, and tracking confidence; these are useful as UI update gates rather than only model accuracy controls.
- `NormalizedRect` keeps center, width, height, and clockwise rotation in normalized image coordinates. Mirrored camera previews and CSS contain/cover letterboxing are common places to accidentally draw MediaPipe outputs in the wrong space.
- MediaPipe v1.0.0 release notes mention standardized running mode enum constants, JS IIFE bundles, and cached running mode in VisionTaskRunner, which makes the setup/runtime boundary worth keeping explicit in small Web samples.

## Prototype decision

- Main sample: `outputs/2026-09-13_hand_landmark_coordinate_calibrator.html`
  - Simulates 21 hand landmarks and converts normalized x/y/z into pixel overlay, depth-colored points, mirror/crop display modes, and confidence-gated UI updates.
  - Tests how presence and tracking thresholds should decide whether a frame updates visible UI or holds the previous pose briefly.

- Derivative sample: `outputs/2026-09-13_roi_rect_mirror_letterbox_probe.html`
  - Simulates a `NormalizedRect` plus keypoints and shows the difference between correct projection and a projection that forgets mirror/letterbox handling.
  - Tests the coordinate drift caused by source aspect ratio, contain/cover fit mode, mirrored preview, ROI rotation, and ROI size.
