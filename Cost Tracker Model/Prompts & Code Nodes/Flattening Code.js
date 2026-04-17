// Each item coming in is already flat from Detect Changes
// We just need to clean and structure it for Google Sheets
const item = $input.item.json;

return {
  json: {
    name: item.name,
    price: item.price,
    category: item.category,
    tags: item.tags,
    change_type: item.change_type,        // NEW or UPDATED
    old_price: item.old_price || '',      // empty string if no change
    old_tags: item.old_tags || '',        // empty string if no change
    scraped_at: new Date().toISOString().split('T')[0]  // today's date
  }
};
