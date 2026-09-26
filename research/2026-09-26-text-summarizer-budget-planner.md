# 2026-09-26 Text Summarizer Budget Planner

## Sources checked

- Google AI Edge Text summarization guide
- Google AI Edge setup guide for Web
- Google AI Edge LLM Inference guide for Web
- google-ai-edge/mediapipe releases
- google-ai-edge/mediapipe-samples and mediapipe-samples-web
- npm @mediapipe/tasks-text and @mediapipe/tasks-vision package pages

## Notes

- MediaPipe v1.0.0 release notes list TextSummarizer and TextProofreader additions on mobile / Python task surfaces, while JavaScript changes focus on IIFE bundles, privacy notice, Web LLM `.litertlm`, `disableRewinding`, Text Embedder Gecko support, and running mode cache.
- The Text summarization guide describes two modes, TLDR and KEYPOINTS, plus `max_num_tokens`; the sample treats those options as UI budget controls before a direct Web summarizer adapter exists.
- The Web LLM Inference guide says the older LLM Inference API is maintenance-only and recommends LiteRT-LM JavaScript for new Web work, so daily Web experiments should keep the model adapter swappable.
- The tasks-text npm page still centers Language Detector, Text Classifier, and Text Embedder in Web examples; generated-text tasks should be tracked, but cards should stay grounded in local original prototypes.

## Prototype plan

- Main sample: Text Summarizer Budget Planner for mode, max tokens, input words, compression, latency, and memory estimates.
- Derivative sample: Text Proofreader Revision Gate for grammar suggestions, meaning guard, privacy-weighted review, and auto-safe application boundaries.
