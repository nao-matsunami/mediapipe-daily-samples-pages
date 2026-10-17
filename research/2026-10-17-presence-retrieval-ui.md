# 2026-10-17: presence score と Web retrieval の表示設計

- MediaPipe v1.1.0 の JavaScript 更新には、Web Tasks API での per-landmark presence score の公開、Web 向け UniversalEmbedder GPU 利用、UniversalEmbedder / SemanticRetriever の追加がある。
- MediaPipe Tasks のプライバシー通知は、入力を端末で処理する一方、performance/utilization metrics の送信とアプリ側の同意責任を説明している。
- 本日の試作は SDK やモデルを外部 URL から実行しない。presence や embedding 距離を受け取った後の、閾値・平滑化・多様性というプロダクト層を最小のインタラクションとして検証する。

参考:

- https://github.com/google-ai-edge/mediapipe/releases/tag/v1.1.0
- https://github.com/google-ai-edge/mediapipe
- https://google-ai-edge.github.io/mediapipe-samples-web/
