// Get metadata JSON from Extract Metadata node
const raw = $input.item.json.output[0].content[0].text;

let meta;
try {
  const cleaned = raw.replace(/```json|```/g, '').trim();
  meta = JSON.parse(cleaned);
} catch (e) {
  throw new Error("Metadata parse failed: " + raw);
}

// Get HTML from Formatter node
let html = $('Formatter').item.json.output[0].content[0].text;

// Strip any markdown fences Claude may have added
html = html
  .replace(/^```html\n?/im, '')
  .replace(/^```\n?/im, '')
  .replace(/```$/m, '')
  .trim();

// Inject charset if missing
if (!html.includes('charset')) {
  html = html.replace('<style>', '<meta charset="UTF-8">\n<style>');
}

// Build filename
const safeName = (str) => str.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 40);
const fileName = `${meta.date}_${safeName(meta.subject)}_${safeName(meta.title)}.html`;

// Prepare binary for Google Drive
const binaryData = await this.helpers.prepareBinaryData(
  Buffer.from(html, 'utf8'),
  fileName,
  'text/html; charset=utf-8'
);

return [{
  json: { fileName, subject: meta.subject, title: meta.title, summary: meta.summary, date: meta.date },
  binary: { data: binaryData }
}];