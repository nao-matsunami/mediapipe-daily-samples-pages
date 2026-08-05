# 2026-08-05 OpenCV.js contours note

## Focus

OpenCV.js の2本目として、thresholded image から contour candidates を取り出し、area filter、bounding box、largest contour を UI 上で観察する。

## Useful primitives

- `cv.threshold()` turns a grayscale frame into a binary image that contour extraction can consume.
- `cv.findContours()` extracts connected boundary candidates from the binary image.
- `cv.contourArea()` makes small noisy regions filterable.
- `cv.boundingRect()` converts a contour into a UI-friendly rectangle.
- `cv.RETR_EXTERNAL` is a good first mode when the UI only needs outer object candidates.
- `cv.CHAIN_APPROX_SIMPLE` reduces stored contour points, which is useful for a compact browser sample.

## Sample idea

`OpenCV Contour Finder Lab` extends the edge / threshold lab by turning binary regions into object-like candidates. It exposes threshold, blur radius, minimum area, max contours, overlay gain, and synthetic motion.

## Follow-up ideas

- Add contour point drawing instead of bounding boxes only.
- Compare contour boxes with MediaPipe Object Detector boxes.
- Run contours on Image Segmenter or Interactive Segmenter masks.
- Export contour metrics as a JSON frame log.
