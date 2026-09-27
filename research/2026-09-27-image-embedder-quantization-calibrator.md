# 2026-09-27 Image Embedder quantization calibrator

## Sources checked

- Google AI Edge API reference: `mp.tasks.vision.ImageEmbedder`
- Google AI Edge API reference: `mp.tasks.vision.ImageEmbedderOptions`
- Google AI Edge setup guide for Web
- GitHub: `google-ai-edge/mediapipe` releases
- GitHub: `google-ai-edge/mediapipe-samples-web`
- GitHub: MediaPipe Tasks Vision Web README
- npm: `@mediapipe/tasks-vision`

## Notes

- Image Embedder exposes cosine similarity and supports `embed`, `embed_for_video`, and `embed_async` styles across running modes. Video/live flows require monotonically increasing timestamps.
- `ImageEmbedderOptions` includes `l2_normalize` and `quantize`; these are useful knobs, but production UIs need to know whether quantization changes a reuse / refresh decision near a gate.
- MediaPipe v1.0.0 calls out JavaScript updates including IIFE bundles, Privacy Notice, Web LLM `.litertlm`, running mode cache, and Text Embedder Gecko support.
- Today's samples avoid hosting official demos. They are local synthetic controls for embedding-route policy before connecting a real Image Embedder model.

## Prototype plan

- Main: visualize float versus quantized embedding cosine, gate changes, L2 toggle, and route flips.
- Derivative: test reuse / review / re-embed thresholds with cache age and drift.
