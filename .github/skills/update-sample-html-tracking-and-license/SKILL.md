---
name: update-sample-html-tracking-and-license
description: 'Batch update HTML samples. Use this to batch-replace GTM code in HTML, move the `noscript` and `script` tags to the beginning of the `body`, batch-replace Dynamsoft license strings, and standardize sample tracking snippets.'
argument-hint: 'Describe the target HTML scope and whether to update GTM, license, or both.'
user-invocable: true
---

# Update Sample HTML Tracking And License

## When to Use
- Batch update GTM snippets in sample HTML files.
- Move GTM `noscript` and `script` blocks to the start of `<body>`.
- Replace an old Dynamsoft sample license string with a new one.
- Normalize multiple sample pages to the same HTML tracking structure.

## Inputs To Confirm
- Which HTML files are in scope.
- Whether the task is GTM only, license only, or both.
- The exact old and new strings if replacing license values.
- Whether the GTM block should be inserted in `<head>` or at the start of `<body>`.
- Whether `frameworks/**/*.html` should be excluded. Default: exclude framework HTML from license replacement unless explicitly requested.

## Procedure
1. Search the repository for the current GTM ID or license string to get the exact file list.
2. Inspect 2 to 3 representative files to confirm whether the GTM block is in `<head>`, between `</head>` and `<body>`, or already inside `<body>`.
3. If updating GTM placement, remove the existing block from its current location and insert the canonical block from [assets/gtm-block.html](./assets/gtm-block.html) immediately after `<body>`.
4. If updating license text, replace only the exact old license string and leave surrounding code untouched.
5. By default, exclude `frameworks/**/*.html` from license replacement unless the user explicitly includes framework HTML.
6. Verify there are no remaining GTM blocks under `<head>` or between `</head>` and `<body>`.
7. Verify the GTM block appears once per target file at the start of `<body>`.
8. Verify the old license string no longer exists in the intended non-framework files and that framework HTML retains its original license unless explicitly included.

## Output Expectations
- Minimal, scoped HTML edits only.
- No unrelated formatting changes.
- A short report with file count, what changed, and verification results.

## Notes
- For HTML validity, `noscript` with iframe should live under `<body>`.
- Keep the `script` and `noscript` together when the request is to standardize placement.
- Prefer repository-local skill reuse for this sample set.
