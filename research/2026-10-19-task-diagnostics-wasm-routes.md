# 2026-10-19: Task diagnostics と WASM 初期化ルート

- MediaPipe v1.1.1 は MediaPipe Tasks の Abseil log をアプリ側で受け取る C API、Flutter / Flutter Web の host environment、WASM 更新を含む。
- 本日の自作試作は SDK や利用者データを送らない。診断イベントの同意・丸め・上限というプロダクト層と、WASM 初期化の待ち方をローカル UI で検証する。

参考:

- https://github.com/google-ai-edge/mediapipe/releases/tag/v1.1.1
- https://github.com/google-ai-edge/mediapipe
- https://google-ai-edge.github.io/mediapipe-samples-web/
