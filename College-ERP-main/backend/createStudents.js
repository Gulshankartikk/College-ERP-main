const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { Student, Course } = require('./models/CompleteModels');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/college-erp');

async function createStudents() {
  try {
    // Get courses
    const courses = await Course.find();
    if (courses.length === 0) {
      console.log('No courses found. Run setupCompleteERP.js first.');
      return;
    }

    // Create students
    const students = [
      {
        name: 'kartikeya',
        email: 'alice@student.edu',//alice@student.edu
        phone: '+91-9876543220',
        rollNo: 'CSE2021001',
        password: await bcrypt.hash('student123', 10),
        courseId: courses[0]._id
      },
      {
        name: 'sandy',
        email: 'bob@student.edu',//bob@student.edu
        phone: '+91-9876543221',
        rollNo: 'CSE2021002',
        password: await bcrypt.hash('student123', 10),
        courseId: courses[0]._id
      }
    ];

    for (const studentData of students) {
      try {
        await Student.create(studentData);
        console.log('✅ Student created:', studentData.name);
      } catch (error) {
        if (error.code === 11000) {
          console.log('Student already exists:', studentData.name);
        } else {
          console.error('Error creating student:', error.message);
        }
      }
    }

    console.log('\n📋 Student Login Credentials:');
    console.log('👨🎓 Student 1: alice@student.edu / student123');//alice@student.edu 
    console.log('👨🎓 Student 2: bob@student.edu / student123');//bob@student.edu 

  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

createStudents();