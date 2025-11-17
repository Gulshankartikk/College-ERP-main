const { spawn } = require('child_process');
const path = require('path');

console.log('Starting College ERP System...');

// Start backend server
const backend = spawn('node', ['index.js'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit'
});

// Start frontend server
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

backend.on('error', (err) => {
  console.error('Backend error:', err);
});

frontend.on('error', (err) => {
  console.error('Frontend error:', err);
});

process.on('SIGINT', () => {
  console.log('\nShutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit();
});

console.log('Backend running on http://localhost:4000');
console.log('Frontend running on http://localhost:5173');