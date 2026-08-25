# Browser Vision Daily Samples

MediaPipe / Google AI Edge、OpenCV.js、WebGL / GLSL、WebXR などの公式情報・一次情報を参考にしつつ、この workspace 内で作成したオリジナルの最小サンプルを日次で蓄積するプロジェクトです。

## Daily Flow

1. 公式情報・一次情報・公式デモを調査する。
2. `outputs/YYYY-MM-DD_*.html` に自作の最小サンプルを作る。
3. `reports/YYYY-MM-DD.json` を `reports/template.json` に合わせて保存する。`category` には `MediaPipe`、`OpenCV.js`、`WebGL / GLSL` などの分類を入れる。
4. `node scripts/upsert-report.mjs --file reports/YYYY-MM-DD.json` を実行し、`days/`、`pages/`、`index.html` を再生成する。

外部デモや公式サンプルは research / report の参考リンクとして扱い、公開カードの中心はこの workspace 内の自作サンプルにします。

## Publish Completion

公開処理では、`git push` が成功し、GitHub Pages のトップページ、最新の日付ページ、最新の代表サンプル HTML が HTTP 200 を返したら完了と判断します。Pages の反映待ちは最大5分で打ち切り、5分以内に 200 にならない場合も、push 済み commit、確認した URL、現在の HTTP status を報告して終了します。

Playwright がこの環境に無い場合は、インストール確認やブラウザ確認で待ち続けません。Playwright 不在は未実施の追加検証として報告し、公開URLの HTTP 確認をもって終了します。
