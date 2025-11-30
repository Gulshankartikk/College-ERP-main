const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Teacher, Admin } = require('./models/CompleteModels');
const dotenv = require('dotenv');

dotenv.config();

const seedAuthUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/college-erp');
        console.log('MongoDB Connected');

        // 1. Seed Admin
        const adminPassword = await bcrypt.hash('admin123', 10);
        let admin = await Admin.findOne({ username: 'admin' });
        if (!admin) {
            await Admin.create({
                name: 'Administrator',
                email: 'admin@college.edu',
                username: 'admin',
                password: adminPassword,
                role: 'admin'
            });
            console.log('Admin account created: admin / admin123');
        } else {
            admin.password = adminPassword;
            await admin.save();
            console.log('Admin password updated');
        }

        // 2. Seed Teacher
        const teacherPassword = await bcrypt.hash('teacher123', 10);
        let teacher = await Teacher.findOne({ username: 'teacher' });
        if (!teacher) {
            await Teacher.create({
                name: 'Demo Teacher',
                email: 'teacher@college.edu',
                username: 'teacher',
                password: teacherPassword,
                department: 'CSE',
                designation: 'Professor'
            });
            console.log('Teacher account created: teacher / teacher123');
        } else {
            teacher.password = teacherPassword;
            await teacher.save();
            console.log('Teacher password updated');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error seeding auth users:', error);
        process.exit(1);
    }
};

seedAuthUsers();
