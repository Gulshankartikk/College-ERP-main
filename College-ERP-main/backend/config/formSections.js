/**
 * Standard Form Sections Configuration
 * College ERP System - All Create Forms
 * 4 Main Sections: Basic Info, Academic Details, Assign/Mapping, System Settings
 */

const formSections = {
  // Course Form Sections
  course: {
    basicInfo: {
      title: "Basic Information",
      fields: ["courseName", "courseCode", "department", "courseType"]
    },
    academicDetails: {
      title: "Academic Details", 
      fields: ["duration", "totalSemesters", "description"]
    },
    systemSettings: {
      title: "System Settings",
      fields: ["status", "createdBy", "updatedBy"]
    }
  },

  // Subject Form Sections
  subject: {
    basicInfo: {
      title: "Basic Information",
      fields: ["subjectName", "subjectCode"]
    },
    academicDetails: {
      title: "Academic Details",
      fields: ["course", "semester", "subjectType"]
    },
    assignMapping: {
      title: "Assign/Mappings", 
      fields: ["assignTeacher"]
    },
    systemSettings: {
      title: "System Settings",
      fields: ["status", "createdBy", "updatedBy"]
    }
  },

  // Student Form Sections
  student: {
    basicInfo: {
      title: "Basic Information",
      fields: ["fullName", "email", "phone", "gender", "dob"]
    },
    academicDetails: {
      title: "Academic Details",
      fields: ["course", "semester", "enrollmentNumber", "admissionYear"]
    },
    address: {
      title: "Address",
      fields: ["address", "city", "state", "pincode"]
    },
    systemSettings: {
      title: "System Settings", 
      fields: ["status", "createdBy", "updatedBy"]
    }
  },

  // Teacher Form Sections
  teacher: {
    basicInfo: {
      title: "Basic Information",
      fields: ["fullName", "email", "employeeId", "phone"]
    },
    academicDetails: {
      title: "Academic Details",
      fields: ["department", "qualification", "experience"]
    },
    assignMapping: {
      title: "Assign/Mapping",
      fields: ["assignSubjects", "assignCourse"]
    },
    systemSettings: {
      title: "System Settings",
      fields: ["status", "createdBy", "updatedBy"]
    }
  }
};

module.exports = formSections;