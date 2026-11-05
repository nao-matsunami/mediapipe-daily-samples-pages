# 2026-11-05 調査メモ

- [MediaPipe v1.2.2 release](https://github.com/google-ai-edge/mediapipe/releases/tag/v1.2.2): JavaScript の MediaPipe Tasks Web SDK から non-SIMD WebAssembly build を削除したと記載。
- [公式 Image Segmenter Worker](https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/workers/image-segmenter.worker.ts): `ImageBitmap` を転送し、category/confidence mask を利用後に閉じ、描画結果を返すWorker構成の一次参照。
- [公式 Web samples](https://github.com/google-ai-edge/mediapipe-samples-web): ブラウザ内で動作するMediaPipe Task API群の公式集。

公開物はこれらの転載ではなく、互換性の説明ルートとマスク資源寿命を確認する自作の最小HTMLである。
