const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/college-erp');

const teacherSchema = new mongoose.Schema({
  teacher_Id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phno: { type: String },
  role: { type: String, default: 'teacher' }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

async function createAdmin() {
  try {
    const existingAdmin = await Teacher.findOne({ teacher_Id: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new Teacher({
      teacher_Id: 'admin',
      name: 'System Administrator',
      email: 'admin@college.edu',
      password: hashedPassword,
      phno: '+91-1234567890',
      role: 'admin'
    });

    await admin.save();
    console.log('Admin created successfully');
    console.log('Login credentials:');
    console.log('Roll Number: admin');
    console.log('Password: admin123');
    console.log('Role: Teacher (will auto-redirect to admin panel)');
    
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();