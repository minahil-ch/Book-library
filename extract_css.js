const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');
const match = html.match(/<style>([\s\S]*?)<\/style>/);
if (match) {
  const css = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');\n` + match[1];
  fs.writeFileSync('frontend/src/index.css', css);
  console.log('CSS extracted');
} else {
  console.log('No style block found');
}
