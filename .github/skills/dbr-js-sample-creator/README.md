# DBR JavaScript Sample Creator — AI Coding Skill

An AI coding skill that helps developers quickly build working web applications with the
[Dynamsoft Barcode Reader JavaScript Edition](https://www.dynamsoft.com/barcode-reader/sdk-javascript/)
SDK. Feed this skill to your AI agent (GitHub Copilot, Claude, Cursor, Windsurf, etc.) and
describe what you need — the agent will generate correct, production-ready code.

## Who Is This For?

Developers evaluating or integrating the `dynamsoft-barcode-reader-bundle` JavaScript SDK who want
to **accelerate POC development** using AI coding assistants. Instead of reading through
documentation and samples manually, let your AI agent do the heavy lifting with full SDK knowledge
built in.

## No Installation Required

This skill is organized into agent-specific directories so it is **auto-discovered** with no
configuration needed:

| Directory | Agent |
|---|---|
| `.github/skills/dbr-js-sample-creator/` | GitHub Copilot (auto-discovered) |
| `.claude/skills/dbr-js-sample-creator/` | Claude Code (auto-discovered) |
| `.codex/skills/dbr-js-sample-creator/` | OpenAI Codex (auto-discovered) |

Just clone the repository and open it in your AI-enabled editor. The skill is active immediately.

## What's Inside

```
.github/skills/dbr-js-sample-creator/
├── SKILL.md                          # Entry point — SDK architecture, patterns, conventions
├── README.md                         # This file
├── references/
│   ├── api-sdk.md                    # SDK loading (CDN/npm/ES6), namespaces, CoreModule, templates
│   ├── api-camera.md                 # CameraView, CameraEnhancer, result receiver, filter
│   ├── api-image.md                  # File/image capture, CapturedResult, BarcodeResultItem
│   ├── api-frameworks.md             # React, Vue, Angular integration patterns
│   └── sample-patterns.md            # Complete working code for every common scenario
└── evals/
    └── evals.json                    # Test prompts & expectations for skill validation

.claude/skills/dbr-js-sample-creator/SKILL.md   # Claude Code entry point
.codex/skills/dbr-js-sample-creator/SKILL.md    # Codex entry point
```

The AI agent reads `SKILL.md` first, which directs it to the appropriate reference files based on
your task. You do not need to understand these files — they are written for the AI.

## SDK at a Glance

- **Package:** `dynamsoft-barcode-reader-bundle@11.4.3000`
- **CDN:** `https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.4.3000/dist/dbr.bundle.js`
- **npm:** `npm install dynamsoft-barcode-reader-bundle`
- **Trial license:** [Get a 30-day free trial](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&package=js&utm_source=sampleReadme)

## Example Prompts

Once the skill is active, try prompts like:

| Prompt | What the AI generates |
|---|---|
| *"Create a plain HTML barcode scanner with camera"* | Full HTML with CDN UMD, camera pipeline, dedup filter |
| *"Build a React component that scans barcodes from camera"* | TypeScript React component with proper lifecycle + cleanup |
| *"Make a Vue 3 image barcode decoder"* | Vue SFC with `<script setup>`, Composition API, file input |
| *"Scan QR codes only using a custom template"* | Custom JSON template with `BF_QR_CODE` filter + HTML page |
| *"Write an ES6 module barcode scanner"* | `<script type="module">` with named imports from CDN .mjs |
| *"Add barcode scanning to my Angular app"* | Angular component with `ngAfterViewInit` / `ngOnDestroy` |

## Validating the Skill

Test with this prompt:

> *"Write a plain HTML page that uses the Dynamsoft Barcode Reader to scan barcodes via camera
> and display results."*

The AI should produce code that:
- Loads the SDK from CDN
- Calls `Dynamsoft.License.LicenseManager.initLicense()`
- Creates `CameraView`, `CameraEnhancer`, and `CaptureVisionRouter`
- Adds a `CapturedResultReceiver` with `onDecodedBarcodesReceived`
- Adds a `MultiFrameResultCrossFilter` for deduplication
- Appends the camera UI to a container div
- Calls `cameraEnhancer.open()` and `cvRouter.startCapturing("ReadBarcodes_SpeedFirst")`

More test prompts are available in [`evals/evals.json`](evals/evals.json).
