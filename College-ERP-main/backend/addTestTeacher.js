const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/college-erp');

// Teacher Schema (simplified)
const teacherSchema = new mongoose.Schema({
  teacher_Id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phno: { type: String },
  role: { type: String, default: 'teacher' }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

async function addTestTeacher() {
  try {
    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ teacher_Id: '208024' });
    
    if (existingTeacher) {
      console.log('Teacher with ID 208024 already exists');
      process.exit(0);
    }

    // Hash the password
    const salt = 10;
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Create new teacher
    const newTeacher = new Teacher({
      teacher_Id: '208024',
      name: 'Test Teacher',
      email: 'teacher@test.com',
      password: hashedPassword,
      phno: '1234567890',
      role: 'teacher'
    });

    await newTeacher.save();
    console.log('Test teacher created successfully with ID: 208024 and password: admin123');
    
  } catch (error) {
    console.error('Error creating teacher:', error);
  } finally {
    mongoose.connection.close();
  }
}

addTestTeacher();