const http = require('http');

// Function to make HTTP requests
function makeRequest(path, callback) {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: path,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      }
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        callback(null, jsonData);
      } catch (error) {
        callback(error, data);
      }
    });
  });

  req.on('error', (error) => {
    callback(error, null);
  });

  req.end();
}

// Test products API
console.log('Testing Products API...');
makeRequest('/api/products', (error, data) => {
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }
  
  console.log('Products API Response:', typeof data);
  console.log('Products data:', JSON.stringify(data, null, 2));
  console.log('');
  
  // Test blogs API
  console.log('Testing Blogs API...');
  makeRequest('/api/blogs', (error, data) => {
    if (error) {
      console.error('Error fetching blogs:', error);
      return;
    }
    
    console.log('Blogs API Response:', typeof data);
    console.log('Blogs data:', JSON.stringify(data, null, 2));
    console.log('');
    
    console.log('✅ API testing completed!');
  });
});