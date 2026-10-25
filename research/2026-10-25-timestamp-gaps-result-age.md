# 2026-10-25 — timestamp gap / result age

## 一次情報

- MediaPipe v1.1.1 は WASM 資産更新を含む現行公開版。JavaScript では Retrieval SDK のコード例が更新された。  
  https://github.com/google-ai-edge/mediapipe/releases/tag/v1.1.1
- MediaPipe v1.1.0 は Web Tasks で landmark presence score と重複する WASM embedding 呼び出しの防止を挙げている。  
  https://github.com/google-ai-edge/mediapipe/releases/tag/v1.1.0
- 公開 PR #6362 は Holistic の空 face timestamp を修正する提案。未マージ・未リリースなので API 契約としては扱わない。  
  https://github.com/google-ai-edge/mediapipe/pull/6362
- 公式 Web Tasks デモは Tasks をブラウザ内で試す一次の実装参照である。  
  https://google-ai-edge.github.io/mediapipe-samples-web/

## 今日の判断

「空結果」や遅延結果をゼロ値として描画し続けるのではなく、最後の有効結果の年齢と保持期限を明示する。これは API 追加を仮定しないUI側の設計であり、実 Task 接続時には `video.currentTime`、Task の結果 timestamp、受信時刻を区別して適用する。
