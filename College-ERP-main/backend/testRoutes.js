const axios = require('axios');

const BASE_URL = 'http://localhost:4000';

async function testRoutes() {
  try {
    // Test basic server
    console.log('Testing server...');
    const serverTest = await axios.get(BASE_URL);
    console.log('✅ Server is running');

    // Test courses endpoint
    console.log('Testing courses endpoint...');
    const coursesTest = await axios.get(`${BASE_URL}/courses`);
    console.log('✅ Courses endpoint working');
    console.log('Courses found:', coursesTest.data.data.length);

    // Test teachers endpoint
    console.log('Testing teachers endpoint...');
    const teachersTest = await axios.get(`${BASE_URL}/teacher`);
    console.log('✅ Teachers endpoint working');
    console.log('Teachers found:', teachersTest.data.teachers.length);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testRoutes();