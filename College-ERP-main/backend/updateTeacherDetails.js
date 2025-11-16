const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/college-erp');

const teacherSchema = new mongoose.Schema({
  teacher_Id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phno: { type: String },
  role: { type: String, default: 'teacher' },
  department: { type: String },
  qualification: { type: String },
  experience: { type: String },
  specialization: { type: String }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

async function updateTeacherDetails() {
  try {
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { teacher_Id: '208024' },
      {
        name: 'Dr. srinath',
        email: 'john.srinath@college.edu',
        phno: '+91-9876543210',
        department: 'Computer Science',
        qualification: 'Ph.D. in Computer Science',
        experience: '10 years',
        specialization: 'Machine Learning, Data Structures'
      },
      { new: true }
    );

    if (updatedTeacher) {
      console.log('Teacher details updated successfully:');
      console.log('Name:', updatedTeacher.name);
      console.log('Department:', updatedTeacher.department);
      console.log('Qualification:', updatedTeacher.qualification);
      console.log('Experience:', updatedTeacher.experience);
      console.log('Specialization:', updatedTeacher.specialization);
    } else {
      console.log('Teacher not found');
    }
    
  } catch (error) {
    console.error('Error updating teacher:', error);
  } finally {
    mongoose.connection.close();
  }
}

updateTeacherDetails();