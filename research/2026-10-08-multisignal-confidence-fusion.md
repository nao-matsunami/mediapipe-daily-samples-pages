# 2026-10-08 MediaPipe Daily Research

## Focus

今日の焦点は、複数の MediaPipe Vision Task から出る confidence / presence / tracking / timestamp を UI 操作の直前で合成すること。昨日の lane scheduling と stale overlay から一段進めて、古い結果や低信頼結果を「使う」「レビューする」「保留する」「破棄する」に分ける。

## Primary references checked

- Google AI Edge Gesture Recognizer Web guide: `recognizeForVideo()` と video mode の流れ。
- Google AI Edge Hand Landmarker Web guide: landmark presence / tracking confidence を考える入口。
- Google AI Edge Holistic Landmarker Web guide: face / pose / hands を同時に扱う multi-output task。
- MediaPipe Tasks Vision Web README: Web bundle と task exports の一次情報。
- Official MediaPipe Tasks Web demo: 実デモの task 切替と webcam 経路。
- GitHub MediaPipe releases: Web / Tasks まわりの差分ウォッチ対象。

## Implementation note

`outputs/2026-10-08_multisignal_confidence_fusion_mixer.html` は実モデルを読まず、Hand / Face / Pose / Object の合成 signal を synthetic に更新する。各 signal は confidence と last timestamp を持ち、preset ごとの重み、fresh window、fire threshold で最終判定を出す。

`outputs/2026-10-08_confidence_event_quarantine_router.html` は派生試作。合成後に生じるイベントを send / review / hold / drop に振り分ける。次に実 confidence と誤操作ログを足す前の小さい検証として使う。
