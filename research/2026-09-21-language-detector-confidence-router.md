# 2026-09-21 Language Detector confidence router

## Primary sources checked

- Google AI Edge setup guide for Web: confirms separate MediaPipe Tasks packages for vision, text, audio, and genai, and shows CDN script-tag paths for each bundle.
- Google AI Edge Language detection guide for Web: confirms `@mediapipe/tasks-text`, `FilesetResolver.forTextTasks`, `LanguageDetector.createFromOptions`, `detect(inputText)`, `maxResults`, `scoreThreshold`, `categoryAllowlist`, and `categoryDenylist`.
- google-ai-edge/mediapipe releases: v1.0.0 JavaScript notes include IIFE bundles, Tasks Privacy Notice, Text Embedder Gecko support, Web LLM `.litertlm`, `disableRewinding`, and VisionTaskRunner running mode cache.
- google-ai-edge/mediapipe-samples-web: official browser demos cover vision, audio, and text tasks, including Language Detection as a reference surface.

## Sample direction

Today extends the recent text-task thread by moving from embedding similarity to language detection policy. The goal is not to mirror the official demo, but to make an implementation-planning surface:

- Main sample: route language predictions by confidence threshold, max result count, allowlist profile, and ambiguity level.
- Derivative sample: test allowlist / denylist policy behavior and expose the invalid combined-policy state as a configuration error.

## Implementation notes

- Both samples use simulated scores so they remain lightweight and deterministic on GitHub Pages.
- The main sample includes an optional CDN import probe for `@mediapipe/tasks-text`.
- The report should say that the next step is replacing the synthetic scorer with real `LanguageDetector.detect()` output and recording per-language route metrics.
