# 2026-10-14 Semantic Retriever result diversity notes

- Google AI Edge Semantic Retriever guide says the task manages vector embedding generation, on-device vector storage, and query retrieval for text, image, and audio content. It also describes providers, vectorStore, optional TextChunker, metadata, score, and topK-style retrieval outputs.
- Google Developers Blog on EmbeddingGemma 2 says MediaPipe Tasks is adding support for EmbeddingGemma 2 to Embedder and Semantic Retriever, and frames Retriever as an edge-optimized embedded vector search engine with fast on-device ANN search.
- Official MediaPipe Tasks Web demo now exposes Decision Maker, Semantic Retriever, and Universal Embedder in the browser-facing catalog, reinforcing the shift from per-frame detection demos to retrieval and decision workflows.
- MediaPipe v1.1.0 remains the latest GitHub release observed today. The release page and tasks/web/vision README remain useful references for package, WASM, model, and on-device processing / metrics consent notes.
- Today's original samples intentionally do not mirror official demos. They simulate downstream UX around topK diversity, privacy review, token budget, TextChunker overlap, and parent-child chunk provenance.

## Prototype decision

- Main sample: `outputs/2026-10-14_semantic_retriever_result_diversity_console.html`
  - Working behavior: synthetic retrieval candidates are ranked and routed by similarity, family redundancy, privacy risk, topK, query mode, diversity penalty, and explanation token budget.
  - Next addition: wire real `SemanticRetriever` query results, duplicate cluster UI, citations, and parent / child chunk IDs.
- Derivative sample: `outputs/2026-10-14_text_chunker_overlap_drift_inspector.html`
  - Working behavior: synthetic source documents are chunked by size / overlap, then routed into index / merge / trim / drop by overlap drift, metadata density, privacy risk, and store policy.
  - Next addition: use the real TextChunker defaults, persist records to a vector store, and highlight retrieved citation ranges.
