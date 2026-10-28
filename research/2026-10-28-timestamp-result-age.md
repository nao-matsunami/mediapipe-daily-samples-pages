# 2026-10-28 — timestamp と結果年齢

- MediaPipe v1.1.0 は Web の重複 WASM embedding 呼び出し抑止、Web Tasks stats logging、Web `SemanticRetriever` API を含む。非同期推論の順序管理を UI 側でも明示する契機として扱った。
- 最新 v1.1.1 は WASM 資産更新と JavaScript Retrieval SDK snippet 更新を含む。
- `ObjectDetector` API 参照は video frame にミリ秒 timestamp が必要と記載する。各 Task・実行モードの契約は個別に確認すること。

本日の公開物は外部デモの転載ではなく、単調 timestamp の採否と result age の表示規約をブラウザ内の合成イベントで検証する自作 HTML である。
