# 2026-08-06 OpenCV.js motion difference note

## Focus

OpenCV.js の3本目として、現在フレームとゆっくり更新される背景を比較し、motion mask、motion coverage、blob box を観察する。

## Useful primitives

- `cv.absdiff()` compares a current frame with a background frame.
- `cv.accumulateWeighted()` updates a floating-point background model gradually.
- `cv.threshold()` turns a difference image into a binary motion mask.
- `cv.findContours()` converts motion mask regions into bounding boxes.
- `cv.countNonZero()` is a compact motion coverage metric.

## Sample idea

`OpenCV Motion Difference Lab` extends threshold and contour samples into time-based analysis. It uses a synthetic moving scene by default, supports live camera input, and exposes threshold, background learning rate, minimum area, maximum blobs, and overlay gain.

## Follow-up ideas

- Compare motion boxes with MediaPipe Pose Landmarker velocity.
- Use motion masks to trigger WebGL particles.
- Add frame logs for motion coverage and blob lifetime.
- Move the OpenCV path into a Worker with OffscreenCanvas.
