# 2026-09-30 research note: Face Detector range preflight

## Primary sources checked

- Google AI Edge setup guide for Web: package import, CDN/WASM paths, and browser setup notes.
- Google AI Edge Face Detector guide and the Face Detector Web sample references.
- GitHub `google-ai-edge/mediapipe` releases, especially MediaPipe v1.0.0 JavaScript notes and the v0.10.33 full-range Face Detector test note.
- GitHub `google-ai-edge/mediapipe-samples-web` and its Face Detector task entry.
- npm `@mediapipe/tasks-vision` versions, where `1.0.1` is the latest public package and `1.0.1-rc.20260914` appears in the nightly line during this run.

## Topic

The practical issue is not only whether Face Detector works in the browser. A product needs to choose between short-range and full-range models, set score thresholds, cap max results, and decide whether GPU-first startup should fall back to CPU before a user sees a broken experience.

The official model notes distinguish short-range face detection for closer faces and full-range detection for smaller/farther faces. The release notes also show JavaScript-side attention to full-range Face Detector tests, while the Web setup guide keeps the package/WASM path as a first-class integration detail.

## Prototype mapping

- Main sample: `outputs/2026-09-30_face_detector_range_preflight.html`
  - Simulates distance, face scale, threshold, max results, and delegate startup.
  - Chooses a short/full model route and shows estimated latency/fallback.
  - Next addition: wire the selected model URL into a real `FaceDetector.createFromOptions` adapter and compare actual `detectForVideo` timings.

- Derivative sample: `outputs/2026-09-30_face_event_privacy_budget.html`
  - Simulates the event layer after detection.
  - Separates local-only, metrics notice, and event export policy from bbox/crop handling.
  - Next addition: add IndexedDB replay, duplicate box suppression, and a consent banner state machine.

## Watch next

- `@mediapipe/tasks-vision` package updates after 1.0.1.
- MediaPipe release notes for JavaScript / Vision Tasks / WebGPU-related changes.
- Face Detector sample updates in `mediapipe-samples-web`.
- Any docs changes around Privacy Notice, metrics, and Web package imports.
