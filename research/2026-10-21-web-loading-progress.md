# 2026-10-21 Web loading progress research

- MediaPipe v1.1.1 release: https://github.com/google-ai-edge/mediapipe/releases/tag/v1.1.1
  - The official release includes refreshed WASM assets and JavaScript Retrieval SDK snippets.
- MediaPipe repository: https://github.com/google-ai-edge/mediapipe
  - The project describes cross-platform ML solutions for live and streaming media and publishes its privacy notice there.
- Web samples: https://google-ai-edge.github.io/mediapipe-samples-web/
  - Used as a reference for the Web Tasks context, not as a gallery item.
- Public pull request #6342: https://github.com/google-ai-edge/mediapipe/pull/6342
  - An open proposal named `Add onLoadingProgress for Web Wasm and model downloads`; it is a watch item, not released API behavior.

Today’s samples deliberately use synthetic timing and no camera, models, or network requests. They examine UX policy around asset loading rather than claiming an unreleased callback exists.
