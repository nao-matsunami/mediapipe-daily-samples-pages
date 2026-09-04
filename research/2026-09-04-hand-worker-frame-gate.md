# 2026-09-04 Hand Worker Frame Gate research note

## 今日の重要トピック

1. Hand Landmarker の Web guide は `detect()` / `detectForVideo()` が同期実行で UI thread を塞ぐため、camera/video frames では web worker を使う設計を明記している。
2. Hand Landmarker の設定は `runningMode`、`numHands`、`minHandDetectionConfidence`、`minHandPresenceConfidence`、`minTrackingConfidence` が中心で、Video mode では存在・追跡 confidence によって palm detector の再実行が変わる。
3. Gesture Recognizer の Web guide も同じく `runningMode` と hand confidence 系の設定を持ち、canned gesture の score threshold / allowlist / denylist を UI イベント安定化に使える。
4. 公式 mediapipe-samples-web の Hand Landmarker worker は `ImageBitmap` と timestamp を受け、必要に応じて IMAGE / VIDEO mode を切り替え、処理後に bitmap を close している。
5. 2026-09-04 JST の npm 確認では `@mediapipe/tasks-vision` は 1.0.1、`@mediapipe/tasks-genai` は 0.10.29。

## 参照した一次情報

- Hand landmarks detection guide for Web: https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/web_js
- Gesture recognition guide for Web: https://developers.google.com/edge/mediapipe/solutions/vision/gesture_recognizer/web_js
- Official Hand Landmarker worker source: https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/workers/hand-landmarker.worker.ts
- MediaPipe Tasks Vision README: https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/web/vision/README.md
- Official MediaPipe Tasks web samples: https://google-ai-edge.github.io/mediapipe-samples-web/

## 自作サンプル方針

公開カードの中心は外部デモではなく、ワークスペース内で作った最小サンプルにする。今日は実モデルを呼ぶ前段として、フレーム投入ポリシーと gesture event stabilization を分けた。

- 本命: `outputs/2026-09-04_hand_worker_frame_gate.html`
  - 疑似手フレームを生成する。
  - motion delta、busy 状態、inference latency を使って sent / busy skip / low-motion skip / result をタイムライン表示する。
  - CDN dynamic import で `FilesetResolver` と `HandLandmarker` の preflight を行う。
  - 次に足すなら、本物の `createImageBitmap(video)`、worker 内 `HandLandmarker.createFromOptions()`、`detectForVideo(bitmap, timestampMs)`、処理後の `bitmap.close()` をつなぐ。

- 派生: `outputs/2026-09-04_gesture_event_debounce_lab.html`
  - Gesture Recognizer の top category score を模したストリームを生成する。
  - score threshold、連続一致数、cooldown から UI コマンドを発火する。
  - 次に足すなら、本命サンプルの worker 結果から `gestures[0][0]` を受け取り、allowlist / denylist とプリセット保存を追加する。
