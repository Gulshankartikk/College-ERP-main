const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  senderType: { 
    type: String, 
    enum: ["teacher", "student", "admin"],
    required: true 
  },
  recipients: [{
    recipientId: { type: mongoose.Schema.Types.ObjectId, required: true },
    recipientType: { 
      type: String, 
      enum: ["teacher", "student", "admin"],
      required: true 
    },
    readAt: { type: Date },
    isRead: { type: Boolean, default: false }
  }],
  subject: { type: String, required: true },
  content: { type: String, required: true },
  messageType: { 
    type: String, 
    enum: ["individual", "group", "class", "broadcast"],
    required: true 
  },
  priority: { 
    type: String, 
    enum: ["low", "normal", "high", "urgent"],
    default: "normal" 
  },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  attachments: [{ fileName: String, fileUrl: String }],
  isActive: { type: Boolean, default: true },
  expiryDate: { type: Date },
  deliveryStatus: { 
    type: String, 
    enum: ["sent", "delivered", "failed"],
    default: "sent" 
  }
}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema);