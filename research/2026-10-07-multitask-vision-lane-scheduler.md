# 2026-10-07 research note: Multitask Vision Lane Scheduler

## Sources checked

- Google AI Edge Gesture Recognizer Web guide: video mode uses `recognizeForVideo()` with a frame timestamp.
- Google AI Edge GestureRecognizer JavaScript API: `recognizeForVideo()` waits synchronously for the response.
- Google AI Edge Object Detector task guide: object detection supports static images and continuous video streams.
- GitHub google-ai-edge/mediapipe: MediaPipe releases and Tasks Web implementation notes remain the primary place to watch browser delivery changes.
- Official MediaPipe Tasks Web demo: useful reference for task selection UI, webcam/image paths, and GPU unavailable states.

## Design choice

Today's original samples avoid loading real model assets and instead isolate a narrow production problem: when several MediaPipe Vision Tasks share a camera frame, the browser app needs a task dispatch policy and a stale overlay policy.

## Samples

- `outputs/2026-10-07_multitask_vision_lane_scheduler.html`: simulates Hand / Gesture, Object, and Face task lanes. It chooses one lane per frame from freshness, interaction priority, frame budget, scene activity, and device pressure.
- `outputs/2026-10-07_result_staleness_overlay_probe.html`: simulates overlay results that arrive at different cadences. It compares fade, hide, and ghost warning policies for stale boxes / landmarks.

## Next additions

- Connect real `detectForVideo()` / `recognizeForVideo()` timestamps.
- Add `PerformanceObserver` long-task marks.
- Store device-specific scheduler defaults in IndexedDB.
- Add a worker handoff version with `ImageBitmap` transfer and explicit close timing.
