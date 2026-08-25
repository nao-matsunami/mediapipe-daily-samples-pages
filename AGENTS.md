# Codex Instructions

## Daily Completion Rule

When publishing the daily sample, finish decisively once these checks pass:

1. The publish command has completed and `git push` has succeeded.
2. GitHub Pages returns HTTP 200 for the top page.
3. GitHub Pages returns HTTP 200 for the latest date page.
4. GitHub Pages returns HTTP 200 for the latest representative sample HTML.

Use `curl` or the built-in publish script checks for the public URL verification. If these three public URLs return 200, treat the task as complete and send the final answer.

Do not keep searching for extra confirmation after the public URL checks pass. Summarize the artifact, commit, public URLs, and any checks that were skipped.

## Verification Limits

- GitHub Pages propagation wait is capped at 5 minutes.
- If the public URLs are not all 200 within 5 minutes, still send the final answer with the pushed commit, checked URLs, and latest HTTP status values.
- Playwright browser verification is optional. If Playwright is unavailable, do not install it or wait on browser checks. Report Playwright as skipped additional verification and finish.
- After a successful push and the required HTTP checks, do not continue looking for "one more thing" to verify.
