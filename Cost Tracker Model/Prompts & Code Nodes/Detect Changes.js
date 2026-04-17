// We have two sources:
// - Parsed products from OpenAI: 26 items (fresh from website)
// - Existing sheet data: 4 items (what was saved last time)

const parsedProducts = $('Parse Products').all().map(i => i.json);
const sheetProducts = $('Read Summary').all().map(i => i.json);

// Create a lookup map from sheet data using product name as key
// This lets us quickly find if a product already exists in sheet
const sheetMap = {};
sheetProducts.forEach(p => {
  sheetMap[p.name] = p;
});

const changes = [];

parsedProducts.forEach(product => {
  const existing = sheetMap[product.name];

  if (!existing) {
    // Product is NEW - not in sheet at all
    changes.push({
      json: {
        name: product.name,
        price: product.price,
        category: product.category,
        tags: product.tags,
        change_type: 'NEW',
        old_price: null,
        old_tags: null
      }
    });
  } else {
    // Product exists - check if price or tags changed
    const priceChanged = String(existing.price) !== String(product.price);
    const tagsChanged = existing.tags !== product.tags;

    if (priceChanged || tagsChanged) {
      changes.push({
        json: {
          name: product.name,
          price: product.price,
          category: product.category,
          tags: product.tags,
          change_type: 'UPDATED',
          old_price: priceChanged ? existing.price : null,
          old_tags: tagsChanged ? existing.tags : null
        }
      });
    }
  }
});

// If no changes found, return a signal item so the IF node can handle it
if (changes.length === 0) {
  return [{ json: { change_type: 'NO_CHANGE' } }];
}

return changes;