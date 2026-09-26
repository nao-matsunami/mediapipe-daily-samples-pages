# 2026-09-25 Text Classifier Queue Guard

## Sources checked

- Google AI Edge JavaScript API: TextClassifier class
- Google AI Edge JavaScript API: tasks-text package and FilesetResolver
- google-ai-edge/mediapipe-samples-web README and text-classifier worker
- google-ai-edge/mediapipe releases
- MediaPipe Tasks Web README privacy notice
- npm @mediapipe/tasks-text package page

## Notes

- TextClassifier exposes synchronous `classify(text)` in the JavaScript API, so the browser UI should treat repeated input as a queued operation even before a real Worker is wired.
- `setOptions()` can update a subset of classifier options; this makes `scoreThreshold` and `maxResults` useful UI tuning controls.
- FilesetResolver for text tasks expects the WASM files to be published without renaming, so the sample keeps an import / fileset checklist visible.
- The official samples are useful as connection references, but the public card for this archive should stay centered on original queue and policy experiments.

## Prototype plan

- Main sample: queue guard for text classification jobs, including queue limit, threshold, max results, stale result rejection, and budget logging.
- Derivative sample: policy score tuner that maps category scores into allow / hold / review / block actions with ambiguity margin and privacy weighting.
