# College ERP System

A comprehensive College ERP System designed to streamline student and course management. Built using the MERN stack, this system allows administrators, faculty, and students to efficiently manage academic activities, attendance, and communications. The ERP includes role-based access but does not include grade management.

## Features

• Student Management: Maintain student profiles, course enrollments, and attendance.
• Attendance Tracking: Monitor student attendance across various classes and subjects.
• Role-Based Access Control: Separate dashboards and permissions for administrators, teachers, and students.
• Course Management: Create and manage courses, assign students, and organize course details.
• Timetable Management: Easily manage class schedules for all courses.
• User Authentication: Secure login system with role-based authentication for different users.
• Reports: Generate and view reports on attendance and course enrollment.
• Department Management: Manage departments and faculty with ease.
• Communication Module: Send announcements and updates to students and faculty members.

## Tech Stack

### Frontend:
• React.js for building the user interface
• Tailwind CSS for a clean, responsive design
• Axios for API communication

### Backend:
• Node.js with Express.js for the server
• MongoDB for the database
• Mongoose for object data modeling (ODM)
• JWT for secure authentication

## Installation and Setup

### Prerequisites:
• Node.js installed
• MongoDB instance running

1. Clone the Repository:
  => git clone 
2. Backend Setup:
   => 1. Navigate to the backend directory:
      2. Install the dependencies:
         => npm insrtall
      3. Create a .env file and add the following environment variables:
         => PORT=5000
            MONGO_URI=your-mongodb-uri
            JWT_SECRET=your-jwt-secret
            CLOUDINARY_API_SECRET= ENTER KEY
            CLOUDINARY_API_NAME = ENTER NAME
      4. Start the backend server:
         => npm start

   Frontend Setup:
     1. Navigate to the frontend directory:
     2. Install the dependencies:
        => npm install
     3. Start the frontend development server:
        => npm run dev
        
## Running the Application
After setting up both the frontend and backend, you can access the app at http://localhost:5173 and the backend API at http://localhost:4000.

## Default Admin Credentials
To create an admin user, run:
```bash
node createAdminUser.js
```

**Admin Login:**
- Email: admin@college.edu
- Password: admin123



