# N8N Cold Outreach — Drafting & Mailing

An automated pipeline that reads your leads sheet, generates a personalised cold email using AI, creates a Gmail draft, and logs the status — hands-free.

---

## Problem Statement

Writing cold emails manually is the bottleneck that kills outreach consistency:

- Someone has to research each lead, craft a personalised opener, write the pitch, and format the email — 10–15 minutes per lead minimum
- Generic copy-paste emails get ignored — personalisation directly impacts reply rates
- Keeping track of who has been emailed and updating the sheet manually introduces errors and missed follow-ups
- Creating Gmail drafts one at a time for review is tedious but skipping review feels risky

This workflow automates the full cycle — from reading a lead row to a ready-to-send Gmail draft — with one AI node doing all the writing.

---

## Description

The workflow fires daily and processes every lead in your Google Sheet. For each lead it:

- Reads all available lead data — name, role, company, website, summary, and any other context stored in the sheet
- Passes all of it to a single OpenAI node (Cold Email agent) which generates every part of the email: Subject, Ice Breaker, Elevator Pitch, Call to Action, and Post Script — each as a separate field
- Creates a Gmail draft with the generated subject and body, ready for one-click review and send
- Writes the generated copy parts back into the sheet and updates the Status column to `Drafted` so the lead is never processed twice

> **On simplicity:** This is intentionally a single-branch, single-AI-node workflow. No research tool, no routing logic, no DM branch. The sheet data you collect upfront is the personalisation input — the AI does the rest.

---

## Tech Stack

| Tool | Role |
|------|------|
| **n8n** | Core automation platform — all scheduling, reading, and writing logic lives here |
| **Google Sheets** | Lead database — input source and output destination for status + generated copy |
| **OpenAI GPT-4.1 Mini** | Single AI node that analyses all lead data and writes the full personalised email |
| **Gmail** | Receives the generated draft — ready for human review before sending |
| **GitHub** | Version control for the workflow JSON file |

---

## Workflow Breakdown

### 1. Daily Trigger
Fires the workflow automatically every day on a set schedule. No manual action needed — the system wakes up, runs through every lead in the sheet, and completes on its own.

### 2. Leads
Reads all rows from the Google Sheet. Every column — Name, First Name, Role, Company, Website, Summary, LinkedIn, and any other stored context — is pulled here and made available to downstream nodes. This is the only data source for the entire workflow.

### 3. Cold Email (AI Agent)
The single AI node in the workflow. It receives all lead data from the sheet and generates a complete, personalised cold email. Output is structured as separate fields:

- **Subject** — specific and curiosity-driven based on company context
- **Ice Breaker** — 1-2 sentences personalised to the company or person
- **Elevator Pitch** — concise explanation of what you do and why it's relevant now
- **Call to Action** — one clear, low-friction ask
- **Post Script** — a credibility or social proof line to reinforce trust

A structured output parser ensures the response comes back as clean JSON with exact field names — no parsing errors, no broken formatting.

### 4. Create Email Draft
Takes the AI-generated subject and assembled email body and creates a Gmail draft. The draft sits in your Gmail Drafts folder, ready for a one-click review and send. Nothing is sent automatically — you stay in control of the final action.

### 5. Update Sheet — Email Drafted
Writes all generated copy fields back into the corresponding row in Google Sheets and sets the Status column to `Drafted`. This ensures the lead is tracked, the copy is stored, and the workflow will not re-process this lead on future runs.

---

## Credentials Required

| Service | What It's Used For |
|---------|-------------------|
| **Google Sheets** | Reading leads and writing generated copy + status back |
| **OpenAI** | Running the Cold Email AI agent |
| **Gmail** | Creating the email draft in your Drafts folder |

---

## Status Flow

The Status column in your sheet controls the entire lifecycle of a lead:

| Status Value | What It Means |
|-------------|---------------|
| *(empty)* | Lead is new — workflow will process it on the next run |
| `Drafted` | Email draft created in Gmail — ready for your review and send |

> ⚠️ Never manually reset a Status to empty after it has been set — that will cause the lead to be re-processed and a duplicate draft to be created.
