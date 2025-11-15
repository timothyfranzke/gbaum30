const fs = require('fs');
const path = require('path');

// Read the XML/SVG file
const xmlFilePath = path.join(__dirname, 'public', 'map.xml');
const xmlContent = fs.readFileSync(xmlFilePath, 'utf-8');

// Regular expression to match path elements with their attributes
const pathRegex = /<path[^>]*>/g;

// Extract all path elements
const paths = xmlContent.match(pathRegex);

if (!paths) {
  console.log('No path elements found in the file.');
  process.exit(1);
}

// Array to store the extracted data
const pathData = [];

// Process each path element
paths.forEach((pathElement) => {
  // Extract the 'd' attribute
  const dMatch = pathElement.match(/\bd="([^"]*)"/);
  const d = dMatch ? dMatch[1] : null;
  
  // Extract the 'id' attribute
  const idMatch = pathElement.match(/\bid="([^"]*)"/);
  const id = idMatch ? idMatch[1] : null;
  
  // Extract the 'title' attribute
  const titleMatch = pathElement.match(/\btitle="([^"]*)"/);
  const title = titleMatch ? titleMatch[1] : null;
  
  // Add to array if at least one attribute exists
  if (d || id || title) {
    pathData.push({
      d: d,
      id: id,
      title: title
    });
  }
});

// Output the JSON array
const jsonOutput = JSON.stringify(pathData, null, 2);

// Write to a file
const outputPath = path.join(__dirname, 'path-data.json');
fs.writeFileSync(outputPath, jsonOutput, 'utf-8');

console.log(`Successfully extracted ${pathData.length} path elements.`);
console.log(`Output written to: ${outputPath}`);

// Also log to console
console.log('\nJSON Output:');
console.log(jsonOutput);
