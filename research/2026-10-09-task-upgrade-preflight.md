# 2026-10-09 MediaPipe / Google AI Edge research note

## Focus

MediaPipe v1.1.0 appeared on the official GitHub releases page, so today's sample focuses on a preflight workflow for upgrading MediaPipe Tasks Web experiences without turning raw release deltas directly into user-facing breakage.

## Primary references checked

- Google AI Edge setup guide for Web: MediaPipe Tasks Web can be used through npm / Node or CDN script tags, with separate packages for vision, text, audio, and generative AI tasks.
- Google AI Edge Object Detector Web guide: Web examples use `@mediapipe/tasks-vision/vision_bundle.mjs`, task options such as score threshold and max results, and delegate settings.
- Google AI Edge ImageSegmenter JavaScript API: `ImageSegmenter` can be created from options, model path, or model buffer, and exposes label access for category masks.
- GitHub `google-ai-edge/mediapipe` releases: v1.1.0 is the latest release observed today, making release-aware smoke checks timely.
- GitHub `google-ai-edge/mediapipe-samples-web` and the official Tasks Web demo: they remain useful parity targets for browser task behavior, CPU/GPU fallback, and demo-level option surfaces.

## Sample direction

The main sample, `Task Upgrade Preflight Console`, models five checks: bundle import, WASM fileset, model asset, delegate fallback, and task options. It turns release delta, delegate confidence, and model metadata quality into a ship / pilot / hold / block route.

The derivative sample, `Release Delta Risk Router`, treats release/package/model/demo/delegate differences as small events and routes them through policy, risk tolerance, demo parity, and rollback readiness.

## Next

Connect the preflight to real signals: GitHub release metadata, npm dist-tags, a CDN import smoke test, model metadata checks, official demo parity smoke tests, and the existing publish URL HTTP 200 checks.
