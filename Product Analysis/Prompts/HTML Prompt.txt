### Prompt - Analysing Whole HTML Content

You are a product data extraction specialist.  
From the HTML content provided, extract ALL products you can find:

{{Input Data}}

Return ONLY a valid JSON object. No explanation. No markdown. No preamble. No trailing commas.  

Strictly follow this exact output format:

```json
{
  "products": [
    {
      "name": "exact product name as shown on page",
      "brand": "",
      "description": "1-2 sentence summary of what this product is and who it's for",
      "price": 299.00,
      "currency": "USD",
      "category": "product category or type",
      "tags": []
    }
  ]
}
