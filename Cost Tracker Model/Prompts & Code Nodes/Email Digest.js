const d = $input.item.json;
const s = d.summary;
let h = '<h2 style="font-family:sans-serif">Competitor Intelligence: ' + d.brand + '</h2>';
h += '<p style="font-family:sans-serif">Run: ' + new Date().toLocaleDateString('en-IN') + '</p>';
h += '<table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">';
h += '<tr style="background:#f0f0f0"><th style="padding:8px;border:1px solid #ddd">Metric</th><th style="padding:8px;border:1px solid #ddd">Count</th></tr>';
h += '<tr><td style="padding:8px;border:1px solid #ddd">New Products</td><td style="padding:8px;border:1px solid #ddd;text-align:center">' + s.new_count + '</td></tr>';
h += '<tr><td style="padding:8px;border:1px solid #ddd">Price Changes</td><td style="padding:8px;border:1px solid #ddd;text-align:center">' + s.updated_count + '</td></tr>';
h += '<tr><td style="padding:8px;border:1px solid #ddd">Removed</td><td style="padding:8px;border:1px solid #ddd;text-align:center">' + s.removed_count + '</td></tr>';
h += '</table>';
if (d.new_products?.length) {
  h += '<h3 style="color:#2e7d32;font-family:sans-serif">New Products</h3><ul style="font-family:sans-serif">';
  for (const p of d.new_products) {
    h += '<li><b>' + p.name + '</b> Rs.' + (p.price||'N/A');
    if (p.mrp) h += ' <span style="text-decoration:line-through;color:#999">Rs.' + p.mrp + '</span>';
    h += ' [' + (p.category||'') + ']</li>';
  }
  h += '</ul>';
}
if (d.updated_products?.length) {
  h += '<h3 style="color:#e65100;font-family:sans-serif">Price / Detail Changes</h3><ul style="font-family:sans-serif">';
  for (const p of d.updated_products) {
    const up = parseFloat(p.price_delta) > 0;
    const col = up ? '#c62828' : '#2e7d32';
    h += '<li><b>' + p.name + '</b>: Rs.' + p.old_price + ' to <span style="color:' + col + '">Rs.' + p.price + '</span>';
    if (Math.abs(parseFloat(p.price_delta)) > 0) h += ' (' + (up ? '+' : '') + p.price_delta + ')';
    if (p.mrp) h += ' | MRP Rs.' + p.mrp;
    h += '</li>';
  }
  h += '</ul>';
}
if (d.removed_products?.length) {
  h += '<h3 style="color:#888;font-family:sans-serif">Removed</h3><ul style="font-family:sans-serif">';
  for (const n of d.removed_products) h += '<li>' + n + '</li>';
  h += '</ul>';
}
h += '<p style="font-family:sans-serif"><a href="https://docs.google.com/spreadsheets/d/1FDTqrcWRbU5v35FirKleCYwbC3W2E6acQ9lx0wCTeUA">Open Catalogue Sheet</a></p>';
return [{ json: { brand: d.brand, html: h, subject: 'Competitor Alert: ' + d.brand + ' (' + s.new_count + ' new, ' + s.updated_count + ' changed, ' + s.removed_count + ' removed)' } }];