# N8N Competitor Product Analysis System

An automated, cost-efficient competitor tracking system built on n8n that monitors product listings, detects changes, and delivers daily insights — without manual effort.

---

## Problem Statement

Sales and strategy teams tracking competitor pricing face a repetitive, manual challenge:

- Someone has to visit competitor websites regularly and note product prices, availability, and tags
- That data has to be manually entered or updated in spreadsheets
- Changes like price drops, new launches, or "sold out" tags are often caught too late
- Doing this across even 3–4 competitors weekly is hours of lost time, which can be further used in startegic decisions
- There is no system to flag what changed, what's new, or what disappeared — just raw data with no delta

This project exists to solve exactly that.

---

## Description

This system automates the entire competitor monitoring pipeline — from scraping a product page to delivering a change report — on a weekly schedule without any manual intervention.

Here is how it addresses the problem:

- It reads a list of competitor pricing page URLs directly from a Google Sheet, so adding a new competitor is as simple as adding a new row
- It scrapes the live HTML of each competitor's product page, converts it to clean markdown, and uses a single AI node to extract structured product data — name, price, category, and tags
- That extracted data is compared against the last saved snapshot in Google Sheets to detect exactly what changed — new products, price updates, or tag changes
- Only the differences are written back to the sheet, keeping the data clean and traceable
- A digest email summarising all changes is sent automatically at the end of each run

**On cost efficiency:** Despite handling multiple competitors with potentially hundreds of products, this system uses only one AI node for the entire pipeline. All comparison logic, change detection, and data flattening is handled through JavaScript code nodes — making this extremely cheap to run at scale. Adding more competitors adds almost zero AI cost.

---

## Tech Stack

- **n8n** — Core workflow automation platform where the entire pipeline is built and scheduled
- **Google Sheets** — Used as both the input source (competitor URLs) and output destination (product catalogue and change history)
- **OpenAI GPT-4.1 Mini** — Single AI node used to extract structured product data from raw markdown content
- **JavaScript (Code Nodes)** — Powers all logic: parsing AI output, detecting changes, flattening data for sheet writes
- **Gmail** — Sends the daily change digest email to the team (if present)
- **GitHub** — Version control for storing and managing all workflow JSON files.

---

## Workflow Breakdown

### 1. Daily Trigger
This node fires the entire workflow automatically on a daily schedule. No manual action is needed — the system wakes up, runs through every competitor, and shuts down on its own.

### 2. Read Competitor Links
This node reads the Google Sheet that contains the list of competitor brands and their product page URLs. This is the control panel of the system — adding or removing a competitor from monitoring requires only editing this sheet.

### 3. Number of Items
This node counts how many competitors are in the sheet and sets up the loop counter so the workflow knows how many times to iterate — once per competitor URL.

### 4. Brand and URL
This node extracts the brand name and URL for the current competitor being processed in the loop. It acts as the data carrier that feeds the brand identity and target link into every downstream node.

### 5. Scraping
This node visits the competitor's product page URL and fetches the full raw HTML of the page. It is the entry point for all product data — everything downstream depends on what this node retrieves.

### 6. Markdown
This node converts the raw HTML fetched from the competitor's website into clean markdown format. Markdown is significantly easier for an AI model to read and extract structured data from compared to messy HTML with tags, scripts, and styling noise.

### 7. Extract Products
This is the only AI node in the entire workflow. It uses GPT-4.1 Mini with a carefully written system prompt to read the markdown content and extract every product found on the page — returning structured data including name, price, category, and tags as a JSON object.

### 8. Parse Products
This JavaScript code node takes the nested JSON response from the AI node and flattens it into individual n8n items — one item per product. After this node, 26 products become 26 separate items flowing through the workflow, each carrying its own name, price, category, and tags.

### 9. Read Summary
This node reads the existing product catalogue from Google Sheets — the last known snapshot of this competitor's products. This is what the fresh scraped data will be compared against to find what has changed since the last run.

### 10. Detect Changes
This JavaScript code node compares every freshly scraped product against the existing sheet data. For each product it determines whether it is completely new (not in the sheet before), updated (price or tags have changed), or unchanged. Only products with actual differences are passed forward, along with metadata about what the old value was.

### 11. Any Changes Found?
This is an IF node that checks whether the Detect Changes node returned any real changes or a NO_CHANGE signal. If there are no changes, the workflow routes to the skip branch. If changes exist, it continues to write and notify.

### 12. Flatten for Sheet Write
This JavaScript code node restructures each changed product into a clean, flat object that matches the exact column structure of the Google Sheet. It also stamps each record with today's date for traceability.

### 13. Update Catalogue Sheet
This node writes all changed and new products back into the Google Sheet — either appending new rows or updating existing ones. This keeps the sheet as a living, up-to-date snapshot of each competitor's catalogue.

### 14. Next Competitor
This node loops the workflow back to process the next competitor in the list, repeating the entire pipeline from Brand and URL onwards until all competitors have been processed.

### 15. Build Email Digest
Once all competitors are processed, this code node assembles a structured summary of everything that changed across all brands — new products, price changes, tag updates — formatted as a readable email body.

### 16. Send Alert Email
This Gmail node sends the compiled digest email to the configured recipient. The team receives one clean weekly email summarising all competitor movements without opening a single spreadsheet.

### 17. No Changes Skip
This node handles the case where a competitor had zero changes since the last run. The workflow exits cleanly for that competitor and moves on to the next one without writing anything or raising any alerts.