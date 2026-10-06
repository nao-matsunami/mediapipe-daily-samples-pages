# 2026-10-06 research note: Mask delta compositor

## Sources checked

- Google AI Edge: Image segmentation guide for Web
  - https://developers.google.com/edge/mediapipe/solutions/vision/image_segmenter/web_js
- Google AI Edge: Setup guide for Web
  - https://developers.google.com/edge/mediapipe/solutions/setup_web
- GitHub: MediaPipe Tasks Vision Web README
  - https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md
- GitHub: mediapipe-samples-web
  - https://github.com/google-ai-edge/mediapipe-samples-web
- GitHub: mediapipe releases
  - https://github.com/google-ai-edge/mediapipe/releases
- Official demo page for MediaPipe Tasks Web
  - https://google-ai-edge.github.io/mediapipe-samples-web/

## Today's angle

The previous sample focused on camera permission and frame budgets before video inference. Today's continuation moves one step later in the pipeline: after an Image Segmenter produces a category or confidence mask, the browser app still has to move and draw that mask without stalling the UI.

The main original sample, `outputs/2026-10-06_mask_delta_compositor_lab.html`, simulates confidence/category masks and compares full-frame paint, delta-tile paint, and budget-capped hold-last-mask routing. The derivative sample, `outputs/2026-10-06_mask_tile_scheduler_playground.html`, isolates the second idea: a tile scheduler that routes changed tiles to send, hold, reuse, or drop.

## Implementation notes

- Keep the public card centered on original local samples, not official demos.
- Treat official docs and demo source as reference links only.
- Emphasize mask lifecycle boundaries: segment, transfer, composite, close/reuse stale resources.
- Next useful addition: a worker-backed fake segmenter that emits ImageBitmap-like tile payloads and a WebGL texture atlas that updates only changed cells.
