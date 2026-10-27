# 2026-10-27 調査メモ

- [MediaPipe v1.1.0 release](https://github.com/google-ai-edge/mediapipe/releases/tag/v1.1.0) は、`LandmarksSmoothingCalculator` の、preview と still capture の間でストリーム解像度が動的に変わる場合の landmark drift 修正を記載する。
- [PoseLandmarker API reference](https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/vision/PoseLandmarker) は video / live stream で timestamp を渡すこと、隣接する入力 timestamp が単調増加であること、live stream では全入力に出力が保証されないことを明記する。
- [MediaPipe Web Tasks demos](https://google-ai-edge.github.io/mediapipe-samples-web/) はオンデバイスWeb Tasksの公式の動作参照であり、アーカイブの公開カードにはせず調査リンクとして使う。

この日の2本は実カメラ・実モデルを使わず、解像度変更での平滑化座標と、letterbox / 鏡像時の表示座標を検証するオリジナルHTMLである。
