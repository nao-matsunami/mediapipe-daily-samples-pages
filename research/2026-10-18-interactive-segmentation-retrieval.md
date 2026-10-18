# 2026-10-18: GPU segmentation と retrieval のコンテキスト設計

- MediaPipe v1.1.1 は Android の Interactive Segmenter で LiteRT delegate を有効化し、JavaScript では Retrieval SDK のコード例を更新した。
- 本日の自作試作は実モデルを外部から読み込まず、モデル出力を利用するプロダクト層を検証する。ひとつは ROI ごとの処理時間とフレーム予算、もうひとつは検索候補を文脈予算に収める選択を可視化する。

参考:

- https://github.com/google-ai-edge/mediapipe/releases/tag/v1.1.1
- https://github.com/google-ai-edge/mediapipe
- https://google-ai-edge.github.io/mediapipe-samples-web/
