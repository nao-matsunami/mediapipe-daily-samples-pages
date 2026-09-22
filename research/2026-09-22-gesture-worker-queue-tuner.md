# 2026-09-22 Gesture Worker Queue Tuner

## Sources checked

- Google AI Edge setup guide for Web: package split for vision, text, audio, and genai; BaseOptions model path / delegate notes.
- Google AI Edge Gesture Recognizer Web guide: `recognize()` / `recognizeForVideo()` usage, video timestamp loop, synchronous UI-thread blocking warning, worker recommendation.
- Google AI Edge Gesture Recognizer task guide: input/output shape, configuration options, canned/custom gesture classifier options, score threshold, allowlist / denylist.
- Google AI Edge Hand Landmarker Web guide: `detect()` / `detectForVideo()` synchronous blocking warning and worker recommendation.
- GitHub google-ai-edge/mediapipe releases and google-ai-edge/mediapipe-samples-web gesture recognizer implementation.

## Design choice

Today's original samples avoid republishing the official demo. They isolate the operational problem that appears once a camera loop meets synchronous Web task inference: frame pressure, queue capacity, stale results, and UI responsiveness.

## Samples

- `outputs/2026-09-22_gesture_worker_queue_tuner.html`: synthetic frame scheduler for worker queue policy, stale window, inference cost, and UI health.
- `outputs/2026-09-22_stale_result_journal.html`: derivative journal that classifies returned results as accept / defer / reject by timestamp age and confidence.

## Next

- Replace synthetic cost with real `performance.now()` around `recognizeForVideo()` / `detectForVideo()`.
- Add an actual Worker module with ImageBitmap transfer and result timestamp echo.
- Export queue metrics to JSON for comparing thresholds across browsers and devices.
