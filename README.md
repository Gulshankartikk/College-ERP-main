# College ERP System

A comprehensive, modern ERP solution for colleges and universities. Streamline administration, empower teachers, and engage students with a unified platform.

## Features

### 🎓 Student Portal
- **Dashboard**: View attendance, notices, and upcoming events.
- **Academics**: Access notes, study materials, and assignments.
- **Administrative**: Pay fees, apply for leave, and view timetable.
- **Profile**: Manage personal information and change password.

### 👨‍🏫 Teacher Portal
- **Class Management**: Mark attendance, upload marks, and manage subjects.
- **Learning Resources**: Upload and manage notes, videos, syllabus, and assignments.
- **Communication**: Post notices and view student details.

### 🛡️ Admin Portal
- **User Management**: Manage students, teachers, and admins.
- **Course Management**: Create and manage courses and subjects.
- **Reports**: Generate attendance, fee, and academic reports.
- **Settings**: Configure system-wide settings.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Redux Toolkit
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/college-erp.git
    cd college-erp
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    - Create a `.env` file in the `backend` directory based on `.sample.env`:
      ```env
      PORT=5000
      MONGO_URL=mongodb://localhost:27017/college-erp
      JWT_SECRET=your_secret_key
      ```
    - Seed the database (optional but recommended for first run):
      ```bash
      node seed_auth_users.js
      ```

3.  **Frontend Setup**
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1.  **Start the Backend**
    ```bash
    cd backend
    npm start
    ```

2.  **Start the Frontend**
    ```bash
    cd frontend
    npm start
    ```

3.  Access the application at `http://localhost:3000`

## Project Structure

- `backend/`: Node.js/Express API
- `frontend/`: React.js Client
- `docs/`: Project documentation

## License

This project is licensed under the MIT License.