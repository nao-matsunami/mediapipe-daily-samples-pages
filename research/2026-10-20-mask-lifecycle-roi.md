# 2026-10-20: mask lifecycle and ROI handoff

- [MediaPipe v1.1.1 release](https://github.com/google-ai-edge/mediapipe/releases/tag/v1.1.1) documents the current release context, including updated WASM assets and Interactive Segmenter work.
- [MediaPipe repository](https://github.com/google-ai-edge/mediapipe) is the primary project source and contains the current privacy notice for Tasks.
- [MediaPipe samples for the web](https://google-ai-edge.github.io/mediapipe-samples-web/) is consulted as a product reference only; it is not republished in this archive.
- [Open pull request #6345](https://github.com/google-ai-edge/mediapipe/pull/6345) is a useful watch item for Web `MPMask.getAsImageBitmap()` lifecycle semantics. It is not treated as shipped API behavior.

The two local samples deliberately use synthetic frames and ROI coordinates. Their purpose is to make frame ownership, copy costs, expired result references, and handoff smoothing legible before wiring them to a Task callback.
