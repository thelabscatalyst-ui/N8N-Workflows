# N8N Competitor Analysis System

An automated competitor tracking and product analysis system built using n8n.  
This project extracts product data from websites, compares it with historical data, and generates actionable insights for pricing and competitive strategy.

---

## Overview

This system is designed to:

- Scrape product data from competitor websites
- Structure and normalize product information
- Store historical data in Google Sheets
- Detect changes in:
  - Price
  - Product listings (new / removed)
  - Tags / categories
- Generate insights for business decision-making

---

## Tech Stack

- **n8n** – Workflow automation  
- **Google Sheets** – Data storage & tracking  
- **AI (LLM prompts)** – Data extraction & analysis  
- **GitHub** – Version control & workflow storage  

---

## Workflow Breakdown

### 1. Data Extraction
- Scrapes full HTML content from target websites
- Uses AI to extract:
  - Product name
  - Description
  - Price
  - Category
  - Tags

---

### 2. Data Storage
- Stores extracted data in Google Sheets
- Updates the competitor's catalogue in Google Sheets
---

### 3. Data Comparison
- Matches products using exact name
- Categorizes into:
  - New products
  - Removed products
  - Changed products
  - Unchanged products

---

### 4. Price Analysis
- Detects price changes
- Calculates % increase/decrease
- Flags high-priority changes (≥10%)

---

### 5. Insights Generation
- Identifies:
  - Pricing trends
  - Category-level shifts
  - Competitive signals
