const axios = require('axios');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:4000';
const FRONTEND_URL = 'http://localhost:5173';

async function healthCheck() {
  console.log('🏥 College ERP Health Check\n');
  
  const results = {
    backend: false,
    frontend: false,
    database: false,
    uploads: false,
    routes: false
  };

  // Check Backend Server
  try {
    const response = await axios.get(BASE_URL, { timeout: 5000 });
    if (response.status === 200) {
      results.backend = true;
      console.log('✅ Backend Server: Running');
    }
  } catch (error) {
    console.log('❌ Backend Server: Not responding');
  }

  // Check Frontend Server
  try {
    const response = await axios.get(FRONTEND_URL, { timeout: 5000 });
    if (response.status === 200) {
      results.frontend = true;
      console.log('✅ Frontend Server: Running');
    }
  } catch (error) {
    console.log('❌ Frontend Server: Not responding');
  }

  // Check Database Connection
  try {
    await mongoose.connect('mongodb://localhost:27017/college-erp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    results.database = true;
    console.log('✅ Database: Connected');
    await mongoose.disconnect();
  } catch (error) {
    console.log('❌ Database: Connection failed');
  }

  // Check Uploads Directory
  const uploadsPath = path.join(__dirname, 'backend', 'uploads');
  if (fs.existsSync(uploadsPath)) {
    results.uploads = true;
    console.log('✅ Uploads Directory: Exists');
  } else {
    console.log('❌ Uploads Directory: Missing');
  }

  // Check Critical Routes
  if (results.backend) {
    try {
      const routes = [
        '/api/admin/login',
        '/api/teacher/login', 
        '/api/student/login'
      ];
      
      let routeCount = 0;
      for (const route of routes) {
        try {
          await axios.post(`${BASE_URL}${route}`, {}, { timeout: 3000 });
          routeCount++;
        } catch (error) {
          // Expected to fail without credentials, but route exists
          if (error.response && error.response.status !== 404) {
            routeCount++;
          }
        }
      }
      
      if (routeCount === routes.length) {
        results.routes = true;
        console.log('✅ API Routes: Available');
      } else {
        console.log('❌ API Routes: Some missing');
      }
    } catch (error) {
      console.log('❌ API Routes: Check failed');
    }
  }

  // Summary
  console.log('\n📊 Health Check Summary:');
  const totalChecks = Object.keys(results).length;
  const passedChecks = Object.values(results).filter(Boolean).length;
  
  console.log(`✅ Passed: ${passedChecks}/${totalChecks}`);
  console.log(`❌ Failed: ${totalChecks - passedChecks}/${totalChecks}`);
  
  if (passedChecks === totalChecks) {
    console.log('\n🎉 System Status: ALL SYSTEMS OPERATIONAL');
  } else {
    console.log('\n⚠️  System Status: ISSUES DETECTED');
    console.log('📖 Check TROUBLESHOOTING.md for solutions');
  }

  return results;
}

// Run health check
if (require.main === module) {
  healthCheck().catch(console.error);
}

module.exports = healthCheck;