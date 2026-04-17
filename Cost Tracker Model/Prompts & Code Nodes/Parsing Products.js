// output is an ARRAY - so we need output[0], not just output
const item = $input.first().json;

const products = item.output[0].content[0].text.results;

return products.map(product => ({
  json: {
    name: product.name,
    price: product.price,
    category: product.category,
    tags: Array.isArray(product.tags) ? product.tags.join(', ') : product.tags
  }
}));