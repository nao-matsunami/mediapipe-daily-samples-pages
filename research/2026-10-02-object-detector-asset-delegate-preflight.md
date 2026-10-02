# 2026-10-02 Object Detector asset/delegate preflight

## Primary references

- Google AI Edge Object Detector Web guide: `FilesetResolver.forVisionTasks`, `ObjectDetector.createFromOptions`, `modelAssetPath`, `scoreThreshold`, and `runningMode`.
- Google AI Edge Web setup guide: browser / npm / CDN setup, MediaPipe Tasks prebuilt vision/text/audio libraries, BaseOptions, `modelAssetPath`, and CPU/GPU delegate.
- Google AI Edge ObjectDetector JavaScript API: creation methods and VisionTaskRunner relationship.
- google-ai-edge/mediapipe releases: Web Tasks release activity, JavaScript bundle notes, and ongoing task version bumps.
- google-ai-edge/mediapipe-samples-web: real browser examples and worker patterns for Tasks APIs.
- mediapipe-samples-web object detector worker source: concrete reference for ObjectDetector creation in a worker-style app.

## Daily angle

Today's original sample avoids turning the public page into an external demo directory. The focus is a local preflight UI for the operational decisions before Object Detector is connected to a camera: whether the WASM fileset path resolves, whether the model asset route is healthy, whether GPU startup is likely to fall back, and whether threshold / max-results settings will create a useful event stream.

## Prototype notes

- Main sample: `outputs/2026-10-02_object_detector_asset_delegate_preflight.html`
  - Synthetic detections, model size, object density, score threshold, max results, delegate route, broken asset path, and network jitter.
  - Useful next step: swap synthetic timing for real `ObjectDetector.createFromOptions` and `detectForVideo` measurements.
- Derivative sample: `outputs/2026-10-02_model_asset_cache_warmup_timeline.html`
  - Compares eager, lazy, and stale-while-revalidate style warmup for WASM/model/delegate startup.
  - Useful next step: back the cache state with Service Worker Cache Storage and IndexedDB timing logs.
