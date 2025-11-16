const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Admin } = require('./models/CompleteModels');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/college-erp');

async function createAdmin() {
  try {
    const existingAdmin = await Admin.findOne({ email: 'admin@college.edu' });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      console.log('Email: admin@college.edu');
      console.log('Password: admin123');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new Admin({
      name: 'System Administrator',
      email: 'admin@college.edu',
      password: hashedPassword
    });

    await admin.save();
    console.log('Admin created successfully!');
    console.log('Login credentials:');
    console.log('Email: admin@college.edu');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();