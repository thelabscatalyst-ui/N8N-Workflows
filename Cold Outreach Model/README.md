# 📧 Personalised Cold Outreach Automation

An automated cold outreach system built using n8n that generates highly personalized emails or DMs based on lead and company data.

---

## Overview

This workflow automates the entire cold outreach process — from collecting lead data to generating and preparing personalized messages.

It uses structured data, AI, and workflow automation to create relevant, human-like outreach at scale.

---

## What This Workflow Does

- Fetches lead data from Google Sheets  
- Uses profile and company information for context  
- Generates personalized outreach messages using AI  
- Creates email drafts automatically  
- Updates and stores processed data back into sheets  

---

## Key Features

- Context-aware personalization (role, company, summary)
- Simple and human writing style (no spammy templates)
- Supports both Email and DM formats
- Automated draft creation (Gmail integration)
- Customizable messaging logic (“Personal Brain”)

---

## Workflow Steps

1. **Schedule Trigger**  
   Runs the workflow automatically at set intervals  

2. **Fetch Leads**  
   Pulls structured lead data from Google Sheets  

3. **Personalisation Engine**  
   Generates tailored outreach messages using AI  

4. **Update & Storage**  
   Saves processed data back into the sheet  

5. **Draft Creation**  
   Creates a ready-to-send email draft  

---

## Data Inputs

- Name  
- Email  
- Role  
- Company  
- LinkedIn Profile  
- Company Website  
- Summary / Additional Context  

---

## Output

Structured outreach message:

- Subject  
- Icebreaker  
- Pitch  
- Call-to-action  
- P.S.  

---

## Use Cases

- B2B cold outreach  
- Lead generation campaigns  
- Sales automation  
- Founder-led outbound  

---

## Notes

- Credentials are not included  
- Requires Google Sheets and Gmail setup  
- AI prompt can be customized based on use case  

---
