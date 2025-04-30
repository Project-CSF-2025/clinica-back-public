const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/admin-notes/1',
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  }
};

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response:', res.statusCode, data));
});

req.on('error', error => console.error('Error:', error));
req.end();
