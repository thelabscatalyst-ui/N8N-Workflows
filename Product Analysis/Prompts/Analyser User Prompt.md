# Product Comparison & Analysis Prompt

Incoming scraped products:  
{{Input Data}}   
Extract the brand name from the "brand" field present in the incoming products array.  
Use that as the brand name for all steps in this analysis.

---

## STEP 1 — READ SHEET
Read the sheet tool that matches the brand above. Call it once. Store all rows.

---

## STEP 2 — COMPARE PRODUCTS
For each incoming product, find its match in the sheet by Product Name (exact match).

Split into these groups:
- New: present in incoming but NOT in sheet  
- Removed: present in sheet but NOT in incoming  
- Changed: present in both but price or tags are different  
- Unchanged: present in both, nothing changed  

Ignore unchanged products completely — do not include them in output.

---

## STEP 3 — PRICE ANALYSIS
Only for products where price changed:

- Old price (from sheet) vs new price (from incoming)  
- Calculate % change: ((new - old) / old) × 100, round to 1 decimal  
- Label as INCREASE or DECREASE  
- Flag as HIGH PRIORITY if increase is 10% or more  
- Identify biggest increase and biggest drop across all products  
- Detect patterns: e.g. entire category getting more expensive  

---

## STEP 4 — CATEGORY INSIGHTS
Only include if meaningful:

- Which category has the most changes  
- Any category trending cheaper or more expensive  
- Skip this section entirely if no pattern exists  

---

## STEP 5 — KEY INSIGHTS
Write 3 to 5 short takeaways focused on competitive impact.  
Think like a sales manager — what does this mean for our pricing strategy?  

Only include if genuinely useful. Skip if nothing significant.

---

## STEP 6 — SET FLAG
- flag: 1 → if any changes exist (new, removed, price change, tag change)  
- flag: 0 → if nothing changed at all  

---

## STEP 7 — BUILD OUTPUT JSON
Include ONLY fields where data exists. Skip all others.

```json
{
  "flag": 1,
  "brand": "",
  "new_products": [
    {
      "name": "product name",
      "price": 0,
      "category": "category",
      "tags": "tags or empty string"
    }
  ],
  "removed_products": ["product name 1", "product name 2"],
  "price_summary": [
    {
      "product": "product name",
      "old_price": 0,
      "new_price": 0,
      "change_percent": "+12.5%",
      "direction": "INCREASE",
      "priority": "HIGH"
    }
  ],
  "category_insights": "one or two sentences only if pattern exists",
  "key_insights": "3 to 5 bullet points as a single string, each on new line, only if any change found",
  "biggest_increase": "product name +X%",
  "biggest_drop": "product name -X%"
}
