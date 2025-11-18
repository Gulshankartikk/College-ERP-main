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
        email: 'student',//alice@student.edu
        phone: '+91-9876543220',
        rollNo: 'CSE2021001',
        password: await bcrypt.hash('student123', 10),
        courseId: courses[0]._id
      },
      {
        name: 'sandy',
        email: 'student2',//bob@student.edu
        phone: '+91-9876543221',
        rollNo: 'CSE2021002',
        password: await bcrypt.hash('student123', 10),
        courseId: courses[0]._id
      },
      {
  name: 'AADESH KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100001',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'AALOK SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100002',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'AARTI SAMANT',
  email: 'student',
  phone: '',
  rollNo: '2301660100003',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ABHAY KUMAR CHAUDHARY',
  email: 'student',
  phone: '',
  rollNo: '2301660100004',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ABHAY MAURYA',
  email: 'student',
  phone: '',
  rollNo: '2301660100005',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ABHINAV KANNOUGIYA',
  email: 'student',
  phone: '',
  rollNo: '2301660100006',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ABHINAV SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100007',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ABHINAY KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100008',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ABHISHEK GOND',
  email: 'student',
  phone: '',
  rollNo: '2301660100009',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ABHISHEK SHARMA',
  email: 'student',
  phone: '',
  rollNo: '2301660100010',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ABHISHEK SRIVASTAVA',
  email: 'student',
  phone: '',
  rollNo: '2301660100011',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ADARSH DHUSIA',
  email: 'student',
  phone: '',
  rollNo: '2301660100012',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ADARSH PANDEY',
  email: 'student',
  phone: '',
  rollNo: '2301660100013',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ADITYA KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100014',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ADITYA KUMAR GOND',
  email: 'student',
  phone: '',
  rollNo: '2301660100015',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ADITYA KUMAR SHARMA',
  email: 'student',
  phone: '',
  rollNo: '2301660100016',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ADITYA MISHRA',
  email: 'student',
  phone: '',
  rollNo: '2301660100017',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'AKANKSHA SHUKLA',
  email: 'student',
  phone: '',
  rollNo: '2301660100018',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'AKARSH KUMAR SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100019',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ALOK RANJAN',
  email: 'student',
  phone: '',
  rollNo: '2301660100020',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'AMAN',
  email: 'student',
  phone: '',
  rollNo: '2301660100021',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'AMAN GUPTA',
  email: 'student',
  phone: '',
  rollNo: '2301660100022',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'AMAN KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100023',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'AMARJEET YADAV',
  email: 'student',
  phone: '',
  rollNo: '2301660100024',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'AMIT KUSHWAHA',
  email: 'student',
  phone: '',
  rollNo: '2301660100025',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANAMIKA',
  email: 'student',
  phone: '',
  rollNo: '2301660100026',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANAMIKA SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100027',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANANT KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100028',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANANYA CHATURVEDI',
  email: 'student',
  phone: '',
  rollNo: '2301660100029',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANCHAL SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100030',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANJALI DWIVEDI',
  email: 'student',
  phone: '',
  rollNo: '2301660100031',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANKIT KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100032',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANKIT MATHUR',
  email: 'student',
  phone: '',
  rollNo: '2301660100033',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANKIT YADAV',
  email: 'student',
  phone: '',
  rollNo: '2301660100034',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANKITA MAURYA',
  email: 'student',
  phone: '',
  rollNo: '2301660100035',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANKUSH KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100036',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANMOL KUMAR DUBEY',
  email: 'student',
  phone: '',
  rollNo: '2301660100037',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANSHUMAAN GUPTA',
  email: 'student',
  phone: '',
  rollNo: '2301660100038',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANUJ GUPTA',
  email: 'student',
  phone: '',
  rollNo: '2301660100039',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANUJ SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100040',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ANUP',
  email: 'student',
  phone: '',
  rollNo: '2301660100041',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'APURVA SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100042',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ARPIT GANGWAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100043',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ARPIT TIWARI',
  email: 'student',
  phone: '',
  rollNo: '2301660100044',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ARYAN KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100045',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ARYAN PATEL',
  email: 'student',
  phone: '',
  rollNo: '2301660100046',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ARYAN SHRIVASTAVA',
  email: 'student',
  phone: '',
  rollNo: '2301660100047',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ARYAN YADAV',
  email: 'student',
  phone: '',
  rollNo: '2301660100048',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ASHLOK YADAV',
  email: 'student',
  phone: '',
  rollNo: '2301660100049',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ATITH SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100050',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'AYUSH PATEL',
  email: 'student',
  phone: '',
  rollNo: '2301660100051',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'AYUSH SAXENA',
  email: 'student',
  phone: '',
  rollNo: '2301660100052',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'AYUSH VERMA',
  email: 'student',
  phone: '',
  rollNo: '2301660100053',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'BADAL KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100054',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'BHAVESH SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100055',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'CHITTRANSHI GUPTA',
  email: 'student',
  phone: '',
  rollNo: '2301660100056',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'DESHRAJ SINGH PARMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100057',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'DHEERENDRA KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100058',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'DURGESH DIWAKAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100059',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'DURGESH KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100060',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ESMOLI GUPTA',
  email: 'student',
  phone: '',
  rollNo: '2301660100061',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'FAIZ HUSSAIN KHAN',
  email: 'student',
  phone: '',
  rollNo: '2301660100062',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'GARIMA DAROLIA',
  email: 'student',
  phone: '',
  rollNo: '2301660100063',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'GAURAV KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100064',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'GULSHAN KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100065',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'HARSH KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100066',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'HARSH RAI',
  email: 'student',
  phone: '',
  rollNo: '2301660100067',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'HARSH RAJ PAL',
  email: 'student',
  phone: '',
  rollNo: '2301660100068',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'HARSH VERMA',
  email: 'student',
  phone: '',
  rollNo: '2301660100069',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'HARSHIT KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100070',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'HARSHITA OJHA',
  email: 'student',
  phone: '',
  rollNo: '2301660100071',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'HARSHITA SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100072',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'HIMANSHU SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100073',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'HIMANSHU YADAV',
  email: 'student',
  phone: '',
  rollNo: '2301660100074',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'JAISWAR SACHIN LAXMISHANKAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100075',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'JAY SRIVASTAVA',
  email: 'student',
  phone: '',
  rollNo: '2301660100076',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'JHANVI SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100077',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'KAJAL',
  email: 'student',
  phone: '',
  rollNo: '2301660100078',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'KISLAYA SRIVASTAVA',
  email: 'student',
  phone: '',
  rollNo: '2301660100079',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'KOMAL GUPTA',
  email: 'student',
  phone: '',
  rollNo: '2301660100080',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'KRATIKA',
  email: 'student',
  phone: '',
  rollNo: '2301660100081',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'KRISHNA RAJ MISHRA',
  email: 'student',
  phone: '',
  rollNo: '2301660100082',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'KUMAR KAUSTUBH',
  email: 'student',
  phone: '',
  rollNo: '2301660100083',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'MANISH KUMAR MAURYA',
  email: 'student',
  phone: '',
  rollNo: '2301660100084',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'MEHTAB ALI',
  email: 'student',
  phone: '',
  rollNo: '2301660100085',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'MOHAMMAD ZUBAIR',
  email: 'student',
  phone: '',
  rollNo: '2301660100086',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'MOHD AAMIR',
  email: 'student',
  phone: '',
  rollNo: '2301660100087',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'NIDHI GUPTA',
  email: 'student',
  phone: '',
  rollNo: '2301660100089',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'NIDHI MISHRA',
  email: 'student',
  phone: '',
  rollNo: '2301660100090',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'NIKITA YADAV',
  email: 'student',
  phone: '',
  rollNo: '2301660100091',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'NISHANT',
  email: 'student',
  phone: '',
  rollNo: '2301660100092',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'NISHANT KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100093',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'NISHANT PRATAP SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100094',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'NITIN BAGHEL',
  email: 'student',
  phone: '',
  rollNo: '2301660100095',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'NITISH OJHA',
  email: 'student',
  phone: '',
  rollNo: '2301660100096',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'OSHIM RAEEN',
  email: 'student',
  phone: '',
  rollNo: '2301660100097',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'OUM GUPTA',
  email: 'student',
  phone: '',
  rollNo: '2301660100098',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'PAWAN KUSHWAHA',
  email: 'student',
  phone: '',
  rollNo: '2301660100099',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'PRAKHAR DEV DUBEY',
  email: 'student',
  phone: '',
  rollNo: '2301660100100',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'PRATIBHA SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100101',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'PRIYANSHU KUMAR PANDEY',
  email: 'student',
  phone: '',
  rollNo: '2301660100102',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'PRIYANSHU SINGH SIKARWAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100103',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'RAHUL PRAJAPATI',
  email: 'student',
  phone: '',
  rollNo: '2301660100104',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'RAJ ARYAN',
  email: 'student',
  phone: '',
  rollNo: '2301660100105',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'RAJ KAMAL SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100106',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'RAJ KUSHWAHA',
  email: 'student',
  phone: '',
  rollNo: '2301660100107',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'RAJ MAURYA',
  email: 'student',
  phone: '',
  rollNo: '2301660100108',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'RAJAN VERMA',
  email: 'student',
  phone: '',
  rollNo: '2301660100109',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'RIDDHIMA SINHA',
  email: 'student',
  phone: '',
  rollNo: '2301660100110',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'RISHABH KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100111',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'RISHABH SHUKLA',
  email: 'student',
  phone: '',
  rollNo: '2301660100112',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'RIYA SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100113',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'ROHIT YADAV',
  email: 'student',
  phone: '',
  rollNo: '2301660100114',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SACHIN RAJPUT',
  email: 'student',
  phone: '',
  rollNo: '2301660100115',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SAHIL KANAUJIYA',
  email: 'student',
  phone: '',
  rollNo: '2301660100116',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SANDEEP KUMAR PATEL',
  email: 'student',
  phone: '',
  rollNo: '2301660100117',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SANDEEP SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100118',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SANDHYA PANDEY',
  email: 'student',
  phone: '',
  rollNo: '2301660100119',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SANGRAM',
  email: 'student',
  phone: '',
  rollNo: '2301660100120',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SANJANA BHARTI',
  email: 'student',
  phone: '',
  rollNo: '2301660100121',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SANKET YADAV',
  email: 'student',
  phone: '',
  rollNo: '2301660100122',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SATISH KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100123',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SATYAM MISHRA',
  email: 'student',
  phone: '',
  rollNo: '2301660100124',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SHAILESH YADAV',
  email: 'student',
  phone: '',
  rollNo: '2301660100125',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SHIVAM',
  email: 'student',
  phone: '',
  rollNo: '2301660100126',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SHIVAM SHARMA',
  email: 'student',
  phone: '',
  rollNo: '2301660100127',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SHIVAM SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100128',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SHIVANGI',
  email: 'student',
  phone: '',
  rollNo: '2301660100129',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SHOBHIT KATIYAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100130',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SHREYA PANDEY',
  email: 'student',
  phone: '',
  rollNo: '2301660100131',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SHREYANSH KANDU',
  email: 'student',
  phone: '',
  rollNo: '2301660100132',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SIDDHARTH JAISWAL',
  email: 'student',
  phone: '',
  rollNo: '2301660100133',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SONAL YADAV',
  email: 'student',
  phone: '',
  rollNo: '2301660100134',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SRISHTI GUPTA',
  email: 'student',
  phone: '',
  rollNo: '2301660100135',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SULABH GUPTA',
  email: 'student',
  phone: '',
  rollNo: '2301660100136',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SUMIT KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100137',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SURAJ KUMAR YADAV',
  email: 'student',
  phone: '',
  rollNo: '2301660100138',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'SURYBHAN KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100139',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'TANISHK SONI',
  email: 'student',
  phone: '',
  rollNo: '2301660100140',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'TAPAN KUMAR YADAV',
  email: 'student',
  phone: '',
  rollNo: '2301660100141',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'TARKESHWAR GUPTA',
  email: 'student',
  phone: '',
  rollNo: '2301660100142',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'TAUSIF',
  email: 'student',
  phone: '',
  rollNo: '2301660100143',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'UTKARSH KUSHWAHA',
  email: 'student',
  phone: '',
  rollNo: '2301660100144',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'UTKARSH PATHAK',
  email: 'student',
  phone: '',
  rollNo: '2301660100145',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'UTKARSH SAHU',
  email: 'student',
  phone: '',
  rollNo: '2301660100146',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'UTKARSH SINGH',
  email: 'student',
  phone: '',
  rollNo: '2301660100147',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'VIJAY KUMAR',
  email: 'student',
  phone: '',
  rollNo: '2301660100148',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'VISHAL SHARMA',
  email: 'student',
  phone: '',
  rollNo: '2301660100149',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'VISHESH YADAV',
  email: 'student',
  phone: '',
  rollNo: '2301660100150',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},
{
  name: 'VISHWAS CHAUHAN',
  email: 'student',
  phone: '',
  rollNo: '2301660100151',
  password: await bcrypt.hash('student123', 10),
  courseId: courses[0]._id
},


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
    console.log('👨🎓 Student 1: student / student123');//alice@student.edu 
    console.log('👨🎓 Student 2: student2 / student123');//bob@student.edu 

  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

createStudents();