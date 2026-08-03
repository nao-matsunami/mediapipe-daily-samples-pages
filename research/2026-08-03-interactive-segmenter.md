# 2026-08-03 Interactive Segmenter note

## Focus

MediaPipe Interactive Image Segmenter を Web で使い、画像上の 1 点を ROI として渡すと、その点を含む対象物のマスクを返す流れを確認した。今日の自作サンプルは、公式デモをカード化するのではなく、合成静止画、アップロード画像、カメラのフリーズフレームにクリック点を与える最小ワークベンチにした。

## Primary references

- Google AI Edge: Interactive image segmentation task guide
  - https://developers.google.cn/edge/mediapipe/solutions/vision/interactive_segmenter/index
- Google AI Edge: Interactive image segmentation guide for web
  - https://developers.google.cn/edge/mediapipe/solutions/vision/interactive_segmenter/web_js
- Google AI Edge JS API: InteractiveSegmenter class
  - https://developers.google.com/edge/api/mediapipe/js/tasks-vision.interactivesegmenter
- MediaPipe Tasks web examples
  - https://github.com/google-ai-edge/mediapipe-samples-web
- Official demo
  - https://google-ai-edge.github.io/mediapipe-samples-web/

## Notes

- Interactive Segmenter はユーザー操作を `RegionOfInterest` として表現し、Web では `{ keypoint: { x, y } }` の正規化座標を `segment()` に渡せる。
- Web ガイドでは `@mediapipe/tasks-vision` と CDN / WASM fileset の利用が示されている。
- 公式ガイドは `segment()` / `segmentForVideo()` が同期実行で UI スレッドをブロックし得るため、動画フレーム処理では Web Worker を検討するよう注意している。
- 今日のサンプルは意図的に静止画クリックに限定し、処理時間、クリック点、マスク面積、オーバーレイ強度を観察できるようにした。
- モデルや CDN が読み込めない環境でも操作性を確認できるよう、クリック点から作る radial fallback mask を入れた。

## Follow-up ideas

- 公式サンプル同様に Worker / OffscreenCanvas へ分離し、クリックからマスク表示までの主スレッド停止を比較する。
- confidence mask 表示に切り替え、threshold slider で採用領域を動的に見せる。
- Image Segmenter の人物マスクと Interactive Segmenter の任意オブジェクトマスクを並べ、用途差を見せる。
- マスクから輪郭線を抽出し、編集可能な selection edge として保存する。
