// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { Facebook, Twitter, LinkedinIcon as LinkedIn, Instagram, Mail, Phone, MapPin } from "lucide-react"
// import { Link } from 'react-router-dom';
// import { useUser } from '@clerk/clerk-react';

// const Footer = () => {
//   const {user} = useUser();
//   return (
//    <>
//     <footer className="bg-gray-800 text-white py-8 relative bottom-0 mt-3">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//               {user?.unsafeMetadata?.role !== "recruiter" ? (
//                   <Link to="/search" className="hover:text-gray-300">
//                   Find Jobs
//                 </Link>):(<Link to="/about" className="hover:text-gray-300">
//                   About
//                 </Link>)}
//               </li>
//               <li>
//               {user?.unsafeMetadata?.role !== "recruiter" ? (
//                   <Link to="/interview" className="hover:text-gray-300">
//                   Get Prep.
//                 </Link>
//                 ):(<Link to="/PostJob" className="hover:text-gray-300">
//                   Post a Job
//                 </Link>)}
//               </li>
//               <li>
//               {user?.unsafeMetadata?.role !== "recruiter" ? (
//                   <Link to="/resume" className="hover:text-gray-300">
//                   Upload Resume
//                 </Link>
//                 ):(<Link to="/my-jobs" className="hover:text-gray-300">
//                   My Jobs
//                 </Link>)}
//               </li>
//               <li>
//               {user?.unsafeMetadata?.role !== "recruiter" && (
//                   <Link to="/dashboard" className="hover:text-gray-300">
//                   Career Advice
//                 </Link>)}
//               </li>
//             </ul>
//           </div>

//           {/* For Employers */}
//           <div>
//           <Link to="/FAQ" className="hover:text-gray-300">
//                   FAQ
//                 </Link>
//           </div>

//           {/* Social Media */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
//             <div className="flex space-x-4">
//               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
//                 <Facebook size={24} />
//               </a>
//               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
//                 <Twitter size={24} />
//               </a>
//               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
//                 <LinkedIn size={24} />
//               </a>
//               <a href="https://www.instagram.com/shubhamkr467/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
//                 <Instagram size={24} />
//               </a>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
//             <ul className="space-y-2">
//               <li className="flex items-center">
//                 <Mail size={18} className="mr-2" />
//                 <a href="mailto:1shubham1256@gmail.com" className="hover:text-gray-300">
//                   1shubham1256@gmail.com
//                 </a>
//               </li>
//               <li className="flex items-center">
//                 <Phone size={18} className="mr-2" />
//                 <a href="tel:+918737932414" className="hover:text-gray-300">
//                 +918737932414
//                 </a>
//               </li>
//               <li className="flex items-center">
//                 <MapPin size={18} className="mr-2" />
//                 <span>123 Job Street, Employment City, 12345</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="mt-8 pt-8 border-t border-gray-700 text-center">
//           <p>&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//    </>
//   );
// };

// export default Footer;


"use client"
import { Facebook, Twitter, LinkedinIcon as LinkedIn, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { useUser } from "@clerk/clerk-react"

const Footer = () => {
  const { user } = useUser()

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 relative bottom-0 mt-3">
      <div className="container mx-auto px-4">
        {/* Top section with logo and tagline */}
        <div className="flex flex-col items-center mb-10 pb-10 border-b border-gray-700">
          <h2 className="text-2xl font-bold mb-2">Job Portal</h2>
          <p className="text-gray-400 text-center max-w-md">Connecting talent with opportunity through innovation</p>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-500 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              <li className="transition-transform duration-200 hover:translate-x-1">
                {user?.unsafeMetadata?.role !== "recruiter" ? (
                  <Link to="/search" className="hover:text-blue-400 flex items-center">
                    <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
                    Find Jobs
                  </Link>
                ) : (
                  <Link to="/about" className="hover:text-blue-400 flex items-center">
                    <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
                    About
                  </Link>
                )}
              </li>
              <li className="transition-transform duration-200 hover:translate-x-1">
                {user?.unsafeMetadata?.role !== "recruiter" ? (
                  <Link to="/interview" className="hover:text-blue-400 flex items-center">
                    <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
                    Get Prep.
                  </Link>
                ) : (
                  <Link to="/PostJob" className="hover:text-blue-400 flex items-center">
                    <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
                    Post a Job
                  </Link>
                )}
              </li>
              <li className="transition-transform duration-200 hover:translate-x-1">
                {user?.unsafeMetadata?.role !== "recruiter" ? (
                  <Link to="/resume" className="hover:text-blue-400 flex items-center">
                    <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
                    Upload Resume
                  </Link>
                ) : (
                  <Link to="/my-jobs" className="hover:text-blue-400 flex items-center">
                    <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
                    My Jobs
                  </Link>
                )}
              </li>
              {user?.unsafeMetadata?.role !== "recruiter" && (
                <li className="transition-transform duration-200 hover:translate-x-1">
                  <Link to="/dashboard" className="hover:text-blue-400 flex items-center">
                    <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
                    Career Advice
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-500 inline-block">Resources</h3>
            <ul className="space-y-3">
              <li className="transition-transform duration-200 hover:translate-x-1">
                <Link to="/FAQ" className="hover:text-blue-400 flex items-center">
                  <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
                  FAQ
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-500 inline-block">Connect With Us</h3>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300"
              >
                <div className="bg-gray-700 p-2 rounded-full hover:bg-blue-600 transition-colors duration-300">
                  <Facebook size={20} />
                </div>
                <span>Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300"
              >
                <div className="bg-gray-700 p-2 rounded-full hover:bg-blue-400 transition-colors duration-300">
                  <Twitter size={20} />
                </div>
                <span>Twitter</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300"
              >
                <div className="bg-gray-700 p-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
                  <LinkedIn size={20} />
                </div>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/shubhamkr467/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300"
              >
                <div className="bg-gray-700 p-2 rounded-full hover:bg-pink-600 transition-colors duration-300">
                  <Instagram size={20} />
                </div>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-500 inline-block">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center group">
                <div className="bg-gray-700 p-2 rounded-full mr-3 group-hover:bg-blue-600 transition-colors duration-300">
                  <Mail size={18} />
                </div>
                <a href="mailto:1shubham1256@gmail.com" className="hover:text-blue-400 transition-colors duration-300">
                  1shubham1256@gmail.com
                </a>
              </li>
              <li className="flex items-center group">
                <div className="bg-gray-700 p-2 rounded-full mr-3 group-hover:bg-blue-600 transition-colors duration-300">
                  <Phone size={18} />
                </div>
                <a href="tel:+918737932414" className="hover:text-blue-400 transition-colors duration-300">
                  +91 8737 932 414
                </a>
              </li>
              <li className="flex items-center group">
                <div className="bg-gray-700 p-2 rounded-full mr-3 group-hover:bg-blue-600 transition-colors duration-300">
                  <MapPin size={18} />
                </div>
                <span>ECC, naini, prayagraj</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


