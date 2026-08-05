# Browser Vision Daily Samples

MediaPipe / Google AI Edge、OpenCV.js、WebGL / GLSL、WebXR などの公式情報・一次情報を参考にしつつ、この workspace 内で作成したオリジナルの最小サンプルを日次で蓄積するプロジェクトです。

## Daily Flow

1. 公式情報・一次情報・公式デモを調査する。
2. `outputs/YYYY-MM-DD_*.html` に自作の最小サンプルを作る。
3. `reports/YYYY-MM-DD.json` を `reports/template.json` に合わせて保存する。`category` には `MediaPipe`、`OpenCV.js`、`WebGL / GLSL` などの分類を入れる。
4. `node scripts/upsert-report.mjs --file reports/YYYY-MM-DD.json` を実行し、`days/`、`pages/`、`index.html` を再生成する。

外部デモや公式サンプルは research / report の参考リンクとして扱い、公開カードの中心はこの workspace 内の自作サンプルにします。
