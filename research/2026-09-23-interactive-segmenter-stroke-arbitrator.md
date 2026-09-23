# 2026-09-23 Interactive Segmenter Stroke Arbitrator

## Sources checked

- Google AI Edge / MediaPipe web setup guide: package split, `@mediapipe/tasks-vision`, CDN bundle, WASM fileset, and `BaseOptions`.
- Google AI Edge Interactive Segmenter API docs: user interaction is represented through `RegionOfInterest`, and category/confidence mask outputs are returned from segmentation.
- MediaPipe Tasks Vision Web README: `InteractiveSegmenter.createFromModelPath()`, `setImage()`, and `segment()` with `BrushMode.POSITIVE`, stroke points, and `isCompleted`.
- google-ai-edge/mediapipe-samples-web README: browser demos include Interactive Segmentation for click-to-segment workflows.
- google-ai-edge/mediapipe-samples-web interactive segmenter implementation: worker request flow, accumulated strokes, pointer events, request invalidation, and closing the previous mask bitmap.
- MediaPipe releases and npm `@mediapipe/tasks-vision`: current Web package / release context around v1.x tasks.

## Design choice

Today's original samples do not mirror the official click-to-segment demo. They isolate the input protocol that a product UI needs before real inference: how positive, negative, box, and lasso instructions are ordered, compressed, replayed, and guarded against stale worker requests.

## Samples

- `outputs/2026-09-23_interactive_segmenter_stroke_arbitrator.html`: main sample that simulates positive / negative / box / lasso ROI arbitration and synthetic mask generation.
- `outputs/2026-09-23_stroke_replay_compressor.html`: derivative sample that compresses noisy pointer streams into smaller replayable stroke requests.

## Next

- Replace the synthetic mask scorer with real `InteractiveSegmenter.setImage()` and `segment()` calls.
- Move compression and segmentation into a worker and echo `requestId` to reject stale masks.
- Add mask bitmap close tracking, before/after payload export, and a small replay fixture for regression tests.
