# 2026-09-18 Audio Classifier stream buffer notes

- Google AI Edge の Audio Classifier Web guide は、`@mediapipe/tasks-audio`、`FilesetResolver.forAudioTasks()`、`AudioClassifier.createFromOptions()`、`classify()` を使う Web / Node 向けの構成を示している。
- 同 guide は、Audio Classifier がリサンプリング、バッファリング、フレーミングを含む入力前処理を扱い、マイク入力では `classify()` が同期的に UI thread を block し得るため Web Worker を検討すると説明している。
- JavaScript API reference では `AudioClassifier.classify(audioData, sampleRate)` が `Float32Array` を受け、`AudioEmbedder.embed(audioData, sampleRate)` も同期的に embedding を返す。
- `@mediapipe/tasks-audio` npm は latest 1.0.1、nightly / rc として 1.1.0-rc.20260916 が出ているため、サンプルでは version pin と import probe を持たせる価値がある。
- `google-ai-edge/mediapipe-samples-web` は Audio Classifier を含む browser demo 群を公開しているが、今日の公開カードは外部デモ一覧ではなく、このワークスペース内の自作 HTML を中心にした。

今日の実装:

- `outputs/2026-09-18_audio_classifier_stream_buffer_lab.html`
  - ring buffer、analysis window、overlap、synthetic AudioClassifier score、smoothing、同期 cost、drop queue、Tasks Audio import probe を可視化。
  - 次に足すなら実 `AudioClassifier.createFromOptions()`、YAMNet model、microphone permission flow、worker handoff、実 category label 表示。
- `outputs/2026-09-18_audio_embedding_similarity_pulse_map.html`
  - AudioEmbedder 風の synthetic embedding、cosine similarity、quantize、reference swap、threshold route、novel event spike を試す派生試作。
  - 次に足すなら実 `AudioEmbedder.createFromModelPath()`、短い音声クリップ、query-by-example UI、IndexedDB による embedding 履歴保存。
