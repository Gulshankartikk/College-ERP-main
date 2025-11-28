const http = require('http');

const BASE_URL = 'http://localhost:4000/api';

const login = (role, username, password) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ username, password });
        const options = {
            hostname: 'localhost',
            port: 4000,
            path: `/api/${role}/login`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => (body += chunk));
            res.on('end', () => {
                if (res.statusCode === 200) {
                    const parsed = JSON.parse(body);
                    let token;
                    if (role === 'admin') {
                        token = parsed.token;
                    } else {
                        token = parsed.token;
                    }
                    resolve({ token, body: parsed });
                } else {
                    reject(new Error(`Login failed for ${role}: ${res.statusCode} ${body}`));
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
};

const updateProfile = (role, id, token, targetRole, targetId) => {
    return new Promise((resolve, reject) => {
        let path = '';
        let method = 'PUT';
        let data = JSON.stringify({ name: 'Updated Name' });

        if (targetRole === 'teacher_self') {
            path = `/api/teacher/${targetId}/profile`;
        } else if (targetRole === 'student_self') {
            path = `/api/student/${targetId}/profile`;
        } else if (targetRole === 'teacher_update_student') {
            path = `/api/teacher/students/${targetId}`;
        }

        const options = {
            hostname: 'localhost',
            port: 4000,
            path: path,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'Authorization': `Bearer ${token}`,
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => (body += chunk));
            res.on('end', () => {
                resolve({ statusCode: res.statusCode, body });
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
};

const runTests = async () => {
    try {
        console.log('Logging in...');
        const adminAuth = await login('admin', 'admin', 'admin123');
        const teacherAuth = await login('teacher', 'teacher', 'teacher123');
        const studentAuth = await login('student', 'student', 'student123');

        console.log('Login successful.');
        // Log bodies to debug ID extraction
        console.log('Teacher Auth Body:', JSON.stringify(teacherAuth.body).substring(0, 200));
        console.log('Student Auth Body:', JSON.stringify(studentAuth.body).substring(0, 200));

        // Extract IDs - try multiple possible fields
        const teacherId = teacherAuth.body.teacher?.id || teacherAuth.body.teacher?._id || teacherAuth.body.result?._id;
        const studentId = studentAuth.body.student?.id || studentAuth.body.student?._id || studentAuth.body.result?._id;

        console.log('IDs found:', { teacherId, studentId });

        if (!teacherId || !studentId) {
            throw new Error("Could not extract IDs from login response");
        }

        // Test 1: Teacher tries to update own profile (Should fail - 403)
        console.log('Test 1: Teacher updating own profile...');
        const res1 = await updateProfile('teacher', teacherId, teacherAuth.token, 'teacher_self', teacherId);
        if (res1.statusCode === 403) {
            console.log('PASS: Teacher cannot update own profile (403)');
        } else {
            console.log(`FAIL: Teacher update returned ${res1.statusCode}`);
            console.log('Body:', res1.body);
        }

        // Test 2: Student tries to update own profile (Should fail - 403)
        console.log('Test 2: Student updating own profile...');
        const res2 = await updateProfile('student', studentId, studentAuth.token, 'student_self', studentId);
        if (res2.statusCode === 403) {
            console.log('PASS: Student cannot update own profile (403)');
        } else {
            console.log(`FAIL: Student update returned ${res2.statusCode}`);
            console.log('Body:', res2.body);
        }

        // Test 3: Teacher tries to update student (Should fail - 403)
        console.log('Test 3: Teacher updating student...');
        const res3 = await updateProfile('teacher', teacherId, teacherAuth.token, 'teacher_update_student', studentId);
        if (res3.statusCode === 403) {
            console.log('PASS: Teacher cannot update student (403)');
        } else {
            console.log(`FAIL: Teacher update student returned ${res3.statusCode}`);
            console.log('Body:', res3.body);
        }

        // Test 4: Admin tries to update teacher profile (Should pass - 200)
        console.log('Test 4: Admin updating teacher profile via teacher route...');
        const res4 = await updateProfile('admin', null, adminAuth.token, 'teacher_self', teacherId);
        if (res4.statusCode === 200) {
            console.log('PASS: Admin can update teacher profile (200)');
        } else {
            console.log(`FAIL: Admin update teacher returned ${res4.statusCode}`);
            console.log('Body:', res4.body);
        }

    } catch (error) {
        console.error('Test failed:', error);
    }
};

runTests();
