// Correct path for Anthropic node output
const raw = $input.item.json.output[0].content[0].text;

// Parse JSON safely
let meta;
try {
  // Claude sometimes wraps JSON in backticks — strip them
  const cleaned = raw.replace(/```json|```/g, '').trim();
  meta = JSON.parse(cleaned);
} catch (e) {
  throw new Error("Failed to parse metadata JSON: " + raw);
}

// Correct path for Formatter node (also Anthropic) — same structure
const html = $('Formatter').item.json.output[0].content[0].text;

// Build filename: YYYY-MM-DD_Subject_Title.html
const safeName = (str) => str.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 40);
const fileName = `${meta.date}_${safeName(meta.subject)}_${safeName(meta.title)}.html`;

return [{
  json: {
    fileName,
    subject: meta.subject,
    title: meta.title,
    summary: meta.summary,
    date: meta.date,
    htmlContent: html
  }
}];