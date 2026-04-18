# Notes Organiser & Formatter (n8n)

An automated pipeline that converts raw, unstructured notes into clean,
structured HTML documents — then saves them directly to Google Drive.

---

## Overview

Built on n8n with Claude (Anthropic) as the AI backbone.  
Triggered on a weekly schedule or manually on demand.

---

## Workflow

| Step | Node | What it does |
|------|------|--------------|
| 1 | Weekly Schedule / Manual Run | Triggers the pipeline |
| 2 | Fetch Raw Notes | Pulls raw content from Google Docs |
| 3 | Formatter (Claude) | Corrects grammar, structures content, outputs clean HTML |
| 4 | Extract Metadata (Claude) | Extracts title, subject, date, summary as JSON |
| 5 | Parse & Assemble (Code) | Cleans output, builds filename, assembles final payload |
| 6 | Google Drive | Saves the HTML file with a structured filename |

---

## Output

- Formatted `.html` file
- Auto-named: `YYYY-MM-DD_Subject_Title.html`
- Saved to Google Drive