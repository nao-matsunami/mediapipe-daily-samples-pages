# 2026-08-07 Audio Classifier / Web ML research

## Primary sources checked

- Audio classification guide for Web: https://developers.google.com/edge/mediapipe/solutions/audio/audio_classifier/web_js
- Audio classification guide overview: https://developers.google.com/edge/mediapipe/solutions/audio/audio_classifier
- tasks-audio package reference: https://developers.google.com/edge/api/mediapipe/js/tasks-audio
- AudioClassifier class reference: https://developers.google.com/edge/api/mediapipe/js/tasks-audio.audioclassifier
- Google AI Edge JavaScript API reference: https://developers.google.com/edge/api/mediapipe/js
- Official MediaPipe Tasks web demo: https://google-ai-edge.github.io/mediapipe-samples-web/
- MediaPipe samples web repository: https://github.com/google-ai-edge/mediapipe-samples-web
- MediaPipe samples repository: https://github.com/google-ai-edge/mediapipe-samples
- LLM Inference Web guide: https://developers.google.com/edge/mediapipe/solutions/genai/llm_inference/web_js
- LLM Inference overview: https://developers.google.com/edge/mediapipe/solutions/genai/llm_inference

## Notes

- Audio Classifier accepts audio clips or streams and returns ranked categories. The overview lists input processing, locale labels, score threshold, top-k, allowlist, and denylist as key features.
- The Web guide uses `@mediapipe/tasks-audio`, `FilesetResolver.forAudioTasks()`, and `AudioClassifier.createFromOptions()` with the YamNet TFLite model.
- `AudioClassifier.classify(audioData, sampleRate)` accepts a `Float32Array` and runs synchronously. The guide explicitly notes that streaming classification can block the UI thread and recommends web workers for continuous microphone use.
- The task overview describes YamNet as the recommended model, trained on AudioSet labels. This makes it a good fit for an event-score UI, but model download size and CDN/CORS availability should not be required for the daily archive to remain inspectable.
- The LLM Inference Web guide now states that the MediaPipe LLM Inference API is maintenance-only and recommends migrating Web projects to LiteRT-LM JavaScript API. This is relevant to the broader Web ML watch list, but today's sample avoids a large local LLM model.

## Prototype decision

Build an original single-file sample that generates a 1.6 second synthetic audio clip, visualizes waveform and coarse spectrum, computes simple local features, and optionally loads MediaPipe Audio Classifier. If MediaPipe or YamNet loading fails, the sample still works through a local heuristic over the same `Float32Array` shape used by the task.
