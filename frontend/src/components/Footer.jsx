import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="font-sans" style={{ background: 'linear-gradient(135deg, #12343b 0%, #2d545e 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#e1b382' }}>About A.I.T.D.</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'white' }}>
              Dr. Ambedkar Institute of Technology for Divyangjan (A.I.T.D.) was established in 1997 at Kanpur, U.P., India by Government of Uttar Pradesh under World Bank assisted project. 
              A.I.T.D. imparts technical education through B.Tech. and Diploma courses. The entire facility is barrier-free, where normal and disabled students study together.
            </p>
            <div className="w-16 h-1" style={{ backgroundColor: '#c89666' }}></div>
          </div>

          {/* Quick Resources */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#e1b382' }}>Quick Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm font-medium transition-colors" style={{ color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#e1b382'} onMouseLeave={(e) => e.target.style.color = 'white'}>
                  📄 Download Prospectus
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-medium transition-colors" style={{ color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#e1b382'} onMouseLeave={(e) => e.target.style.color = 'white'}>
                  📅 Academic Calendar
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-medium transition-colors" style={{ color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#e1b382'} onMouseLeave={(e) => e.target.style.color = 'white'}>
                  ✅ Attendance Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-medium transition-colors" style={{ color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#e1b382'} onMouseLeave={(e) => e.target.style.color = 'white'}>
                  📊 Exam Results
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-medium transition-colors" style={{ color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#e1b382'} onMouseLeave={(e) => e.target.style.color = 'white'}>
                  🎓 Scholarship Info
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#e1b382' }}>Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="mt-1" style={{ color: '#c89666' }} />
                <span className="text-sm font-medium" style={{ color: 'white' }}>
                  Awadhpuri, Khyora, Lakhanpur, Kanpur - 208024, Uttar Pradesh, India
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone style={{ color: '#c89666' }} />
                <span className="text-sm font-medium" style={{ color: 'white' }}>
                  +91 1234567890
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone style={{ color: '#c89666' }} />
                <span className="text-sm font-medium" style={{ color: 'white' }}>
                  +91 8726321083
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope style={{ color: '#c89666' }} />
                <span className="text-sm font-medium" style={{ color: 'white' }}>
                  admin@college.edu
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope style={{ color: '#c89666' }} />
                <span className="text-sm font-medium" style={{ color: 'white' }}>
                  admissions@college.edu
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#e1b382' }}>Connect With Us</h3>
            <p className="text-sm mb-4 font-medium" style={{ color: 'white' }}>
              Follow us on social media for updates and news
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-3 rounded-full transition-all transform hover:scale-110 shadow-lg"
                style={{ backgroundColor: '#e1b382' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#c89666'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e1b382'}
              >
                <FaFacebook className="text-xl" style={{ color: '#12343b' }} />
              </a>
              <a 
                href="#" 
                className="p-3 rounded-full transition-all transform hover:scale-110 shadow-lg"
                style={{ backgroundColor: '#e1b382' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#c89666'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e1b382'}
              >
                <FaInstagram className="text-xl" style={{ color: '#12343b' }} />
              </a>
              <a 
                href="#" 
                className="p-3 rounded-full transition-all transform hover:scale-110 shadow-lg"
                style={{ backgroundColor: '#e1b382' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#c89666'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e1b382'}
              >
                <FaLinkedin className="text-xl" style={{ color: '#12343b' }} />
              </a>
              <a 
                href="#" 
                className="p-3 rounded-full transition-all transform hover:scale-110 shadow-lg"
                style={{ backgroundColor: '#e1b382' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#c89666'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e1b382'}
              >
                <FaYoutube className="text-xl" style={{ color: '#12343b' }} />
              </a>
              <a 
                href="#" 
                className="p-3 rounded-full transition-all transform hover:scale-110 shadow-lg"
                style={{ backgroundColor: '#e1b382' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#c89666'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e1b382'}
              >
                <FaTwitter className="text-xl" style={{ color: '#12343b' }} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8" style={{ borderTop: '2px solid #c89666' }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm font-semibold mb-4 md:mb-0" style={{ color: '#e1b382' }}>
              © 2025 College Management System. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm font-medium transition-colors" style={{ color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#e1b382'} onMouseLeave={(e) => e.target.style.color = 'white'}>
                Privacy Policy
              </a>
              <a href="#" className="text-sm font-medium transition-colors" style={{ color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#e1b382'} onMouseLeave={(e) => e.target.style.color = 'white'}>
                Terms of Service
              </a>
              <a href="#" className="text-sm font-medium transition-colors" style={{ color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#e1b382'} onMouseLeave={(e) => e.target.style.color = 'white'}>
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
