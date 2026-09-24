# 2026-09-24 Research: Mask Confidence Compositor

## Sources checked

- Google AI Edge: Image segmentation guide
  - https://developers.google.com/edge/mediapipe/solutions/vision/image_segmenter
- Google AI Edge: Image segmentation guide for Web
  - https://developers.google.com/edge/mediapipe/solutions/vision/image_segmenter/web_js
- Google AI Edge: Setup guide for Web
  - https://developers.google.com/edge/mediapipe/solutions/setup_web
- GitHub: MediaPipe Tasks Vision Web README
  - https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md
- GitHub: mediapipe-samples-web
  - https://github.com/google-ai-edge/mediapipe-samples-web
- GitHub: MediaPipe releases
  - https://github.com/google-ai-edge/mediapipe/releases
- npm: @mediapipe/tasks-vision
  - https://www.npmjs.com/package/@mediapipe/tasks-vision

## Notes

- Image Segmenter exposes region masks for images, decoded video frames, and live video feeds. The output can include category masks and confidence masks depending on the configuration.
- The Web setup path still centers on `@mediapipe/tasks-vision`, a `FilesetResolver` WASM path, and explicit model URLs.
- The official samples are useful as reference, but today's public cards should remain original minimal tools: one mask compositor and one lifecycle sentinel.
- The practical UI issue after yesterday's Interactive Segmenter stroke work is not only how to collect ROI input, but how to display and retire the resulting masks without stale overlays or resource pressure.

## Prototype decision

- Main: `outputs/2026-09-24_mask_confidence_compositor.html`
  - Simulates category / confidence mask output and lets the user tune threshold, feather, frame budget, and overlay alpha.
- Derivative: `outputs/2026-09-24_mask_bitmap_lifecycle_sentinel.html`
  - Simulates worker request races and mask bitmap replacement, including stale rejection and previous-mask close discipline.
