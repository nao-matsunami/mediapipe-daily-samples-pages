# 2026-10-03 Tasks bundle / worker route matrix

## Primary references

- Google AI Edge Web setup guide: browser setup, CDN / npm installation, task package split, `FilesetResolver`, model paths, and delegate configuration.
- MediaPipe Tasks Vision Web README: Tasks Vision package scope and the note that inputs are processed on device.
- MediaPipe v1.0.0 release notes: JavaScript IIFE bundles, MediaPipe Tasks Privacy Notice, Gecko support for Text Embedder, Web LLM `.litertlm`, and cached running mode in VisionTaskRunner.
- MediaPipe v0.10.35 release notes: JavaScript package export fix, Vite worker usability, and WASM file updates.
- google-ai-edge/mediapipe repository and mediapipe-samples-web: primary source for official package and sample implementation patterns.

## Daily angle

Today's original sample focuses on the integration layer before a model is connected: whether an app should load Tasks through CDN ESM, CDN IIFE, or an npm-bundled worker route. The useful decision is not only "does the model run", but whether CSP, offline mode, WASM base path, and worker packaging are likely to fail in a production shell.

## Prototype notes

- Main sample: `outputs/2026-10-03_tasks_bundle_worker_route_matrix.html`
  - Compares ESM CDN, IIFE CDN, and npm worker routes with synthetic load health, CSP risk, offline risk, worker load, and WASM path health.
  - Useful next step: attach real `import()` / worker startup probes and record Resource Timing entries for the selected package path.
- Derivative sample: `outputs/2026-10-03_privacy_metrics_consent_filter.html`
  - Splits local input processing from metrics consent and routes events to send / summarize / hold / drop.
  - Useful next step: add an explicit Privacy Notice link, persisted consent version, and local-only debug export.
