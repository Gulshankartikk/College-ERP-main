const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { Admin } = require('./models/CompleteModels');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/college-erp');

async function createAdmin() {
  try {
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await Admin.findOneAndUpdate(
      { email: 'admin@college.edu' },
      {
        name: 'System Administrator',
        email: 'admin@college.edu',
        password: adminPassword
      },
      { upsert: true, new: true }
    );
    console.log('✅ Admin created:', admin.email);
    console.log('Login: admin@college.edu / admin123');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();