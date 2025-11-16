const mongoose = require("mongoose");

const studSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
  },
  user_image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      default:
        "https://icons.iconarchive.com/icons/icons8/android/256/Users-User-icon.png",
    },
  },
  first_name: {
    type: String,
    required: true,
    trim: true, // Removes surrounding whitespace
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    zip_code: {
      type: String,
      default: "",
    },
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  role: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    default: 0,
  },
});

const Student = mongoose.model("Student", studSchema);
module.exports = Student;
