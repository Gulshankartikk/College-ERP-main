const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/college-erp');

const Course = mongoose.model('Course', new mongoose.Schema({}));

async function clearCourses() {
  try {
    await Course.deleteMany({});
    console.log('All courses cleared');
  } catch (error) {
    console.error('Error clearing courses:', error);
  } finally {
    mongoose.connection.close();
  }
}

clearCourses();