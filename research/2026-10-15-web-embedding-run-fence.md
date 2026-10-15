# 2026-10-15 Web Tasks run-fence notes

- MediaPipe v1.1.0 release notes describe Web Tasks additions for `UniversalEmbedder` and `SemanticRetriever`, public SemanticRetriever APIs, Web GPU use for UniversalEmbedder, prevention of overlapping WASM embedding calls, and Web Tasks stats logging.
- The MediaPipe repository privacy notice says task input is processed on-device and that MediaPipe Tasks sends API performance and utilization metrics; product teams remain responsible for obtaining informed consent where required.
- This run deliberately uses synthetic work items rather than copying an official demo. It turns release-note behavior into two UI concerns a Web app can exercise without a model asset: cancelling/staling old results and budgeting metrics under consent.

## Prototype decision

- Main: `outputs/2026-10-15_web_embedding_run_fence_console.html`
  - Working behavior: runs an input burst and shows how a generation fence plus a latest-only queue discards stale completions. The naive policy permits overlapping calls for comparison.
  - Next: connect a real `UniversalEmbedder`, Worker abort messages, warm-up, and IndexedDB cache timings.
- Derivative: `outputs/2026-10-15_tasks_stats_consent_budget_meter.html`
  - Working behavior: changes simulated task-metric routing as consent, retention, and per-session budget change.
  - Next: add an app consent record, data dictionary, local audit export, and settings UI.

## Sources

- https://github.com/google-ai-edge/mediapipe/releases/tag/v1.1.0
- https://github.com/google-ai-edge/mediapipe
- https://google-ai-edge.github.io/mediapipe-samples-web/
