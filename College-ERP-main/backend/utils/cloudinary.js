/**
 * Cloudinary Configuration
 * Created: College ERP System
 * Purpose: Cloud storage service configuration for file uploads
 * Dependencies: cloudinary v2
 * Environment Variables: CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 */

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
