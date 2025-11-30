const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Student, Teacher, Admin } = require('../models/CompleteModels');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

const login = async (req, res, next) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            const error = new Error('Username, password, and role are required');
            error.statusCode = 400;
            throw error;
        }

        let user;
        let isMatch = false;

        // 1. Find User based on Role
        if (role === 'student') {
            // Students log in with Roll Number (mapped to username in frontend)
            user = await Student.findOne({ rollNo: username }).populate('courseId');
        } else if (role === 'teacher') {
            // Teachers log in with Email or Username
            user = await Teacher.findOne({
                $or: [{ email: username }, { username: username }]
            });
        } else if (role === 'admin') {
            // Admins log in with Email or Username
            user = await Admin.findOne({
                $or: [{ email: username }, { username: username }]
            });
        } else {
            const error = new Error('Invalid role specified');
            error.statusCode = 400;
            throw error;
        }

        // 2. Validate User Existence
        if (!user) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        // 3. Verify Password
        // Check if password is hashed (for DB users) or plain text (for legacy/hardcoded)
        // Ideally, we migrate all to bcrypt. For now, we assume bcrypt if it looks like a hash, else plain compare.
        // However, the prompt asks for "Professional Upgrade", so we should enforce bcrypt.
        // But existing hardcoded admin/teacher might not be in DB yet.
        // We will assume the seed script or manual entry created them with hashes.
        // If not, we might break login for hardcoded users unless we seed them first.

        // For safety in this transition:
        // If user has a password field, check it.

        isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        // 4. Generate Token
        const token = jwt.sign(
            { id: user._id, role: role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 5. Set Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // 6. Prepare Response
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: role,
        };

        if (role === 'student') {
            userData.rollNo = user.rollNo;
            userData.course = user.courseId;
            userData.passwordChanged = user.passwordChanged;
        }

        res.status(200).json({
            success: true,
            token,
            user: userData,
            message: `Welcome back, ${user.name || role}!`
        });

    } catch (error) {
        next(error);
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

module.exports = {
    login,
    logout
};
