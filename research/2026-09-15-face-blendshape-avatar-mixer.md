# 2026-09-15 Face Blendshape Avatar Mixer

## 一次情報

- Google AI Edge Face Landmarker Web guide
  - Face Landmarker は画像・動画の顔 landmark、face blendshape score、facial transformation matrix を返せる。
  - `runningMode` は IMAGE / VIDEO。video や camera では frame timestamp とあわせて `detectForVideo()` を使う。
  - `detect()` / `detectForVideo()` は同期的で UI thread を block し得るため、Web Worker 構成を検討する。
- Google AI Edge Hand Landmarker Web guide
  - Web Tasks の構成、`FilesetResolver.forVisionTasks()`、`createFromOptions()`、confidence / tracking gate のパターンは Face Landmarker と近い。
- Google AI Edge Web setup guide
  - Vision tasks は `@mediapipe/tasks-vision` を npm または CDN で導入でき、`BaseOptions` は `modelAssetPath` / `modelAssetBuffer` と `delegate` を扱う。
- GitHub google-ai-edge/mediapipe Tasks Vision Web README
  - Web vision package の import surface を継続確認する対象。
- npm @mediapipe/tasks-vision
  - latest は 1.0.1、nightly / rc 系の publish も続いている。

## 今日の実装メモ

- 本命: `outputs/2026-09-15_face_blendshape_avatar_mixer.html`
  - Face Landmarker の blendshape score を模した synthetic stream を作る。
  - mouthSmile / browInnerUp / jawOpen / eyeBlink を smoothing と gate に通す。
  - happy / surprised / blink の dwell が成立した時だけ command を発火する。
  - `@mediapipe/tasks-vision@1.0.1/+esm` の FaceLandmarker export probe を入れる。
- 派生: `outputs/2026-09-15_face_matrix_stability_probe.html`
  - facial transformation matrix を想定し、yaw / pitch / roll / translation を 4x4 matrix にする。
  - raw と stabilized を並べ、smoothing / deadband / anchor で揺れを制御する。

## 次に足すなら

- 実 camera の `detectForVideo()` と `outputFaceBlendshapes: true` / `outputFacialTransformationMatrixes: true` を接続する。
- Web Worker へ ImageBitmap を渡し、UI block と overlay latency を計測する。
- avatar parameter を VRM / WebXR / CSS filter / Web Audio に接続する。
- matrix の anchor を実 landmark index から補正する。
