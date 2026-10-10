# 2026-10-10 MediaPipe daily research note

## Focus

Today's samples explore a small layer between MediaPipe Tasks output and UI action: temporal stability. The main sample simulates Hand Landmarker normalized landmarks and compares raw jitter with smoothed landmarks. The derivative sample simulates Gesture Recognizer canned gesture scores and routes them through enter / exit thresholds, dwell frames, and cooldown.

## Primary references

- Google AI Edge Hand Landmarker Web guide: normalized hand landmarks, world landmarks, confidence thresholds, `detectForVideo()`, and synchronous UI-thread blocking.
- Google AI Edge Gesture Recognizer Web guide: canned gestures, score threshold, running mode, and hand tracking confidence.
- Google AI Edge Web setup guide: `@mediapipe/tasks-vision` install and CDN setup paths.
- Google AI Edge DrawingUtils API: connector / landmark drawing, confidence masks, and `lerp()` helper.
- GitHub MediaPipe releases: v1.1.0 is the latest release observed today.
- Official MediaPipe Tasks Web demo: reference surface for Vision tasks, not the archive center.

## Sample decisions

- `outputs/2026-10-10_landmark_jitter_smoothing_lab.html` keeps inference synthetic, but mirrors real Hand Landmarker concerns: 21 landmarks, raw normalized coordinate noise, tracking threshold, presence loss, result reuse, and reacquire routing.
- `outputs/2026-10-10_gesture_intent_hysteresis_probe.html` turns gesture classifier scores into UI intent only after threshold, score gap, dwell, and cooldown checks.

## Next additions

- Connect real `HandLandmarker.detectForVideo()` output and record raw / smoothed landmark streams.
- Add one-euro filtering and compare it with simple exponential smoothing.
- Use real Gesture Recognizer category scores, plus hand presence and tracking confidence, before firing UI commands.
