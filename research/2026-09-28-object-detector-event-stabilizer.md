# 2026-09-28 Object Detector Event Stabilizer

## Primary sources checked

- Google AI Edge Object Detector task guide: running modes, `max_results`, `score_threshold`, allowlist and denylist policy.
- Google AI Edge setup guide for Web: Tasks Web package loading and WASM asset path.
- MediaPipe Tasks Vision Web README: Object Detector package usage and privacy notice.
- google-ai-edge/mediapipe releases: current release notes and Web package operational changes.
- google-ai-edge/mediapipe-samples-web: official browser demos as reference implementation, not as public archive cards.
- npm `@mediapipe/tasks-vision`: package version signal for version-pinned import planning.

## Prototype decision

Today's original sample does not replay an official demo. It builds a synthetic Object Detector stream and focuses on the post-inference product layer: score threshold, max results, allow / deny policy, review routing, and ROI half-life. The derivative sample explores a common next step: sending only useful detection events to analytics, review, or edge sync without flooding a channel with duplicate ROI events.

## Next integration points

- Replace synthetic detections with `ObjectDetector.detectForVideo(video, timestampMs)`.
- Store emitted events with source frame timestamp, ROI, label, score, route, and policy snapshot.
- Move detector work to a Worker once real video inference is wired.
- Add a small IndexedDB replay journal so policy changes can be tested against the same detection stream.
