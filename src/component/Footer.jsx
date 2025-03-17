import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Facebook, Twitter, LinkedinIcon as LinkedIn, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const Footer = () => {
  const {user} = useUser();
  return (
   <>
    <footer className="bg-gray-800 text-white py-8 relative bottom-0 mt-3">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
              {user?.unsafeMetadata?.role !== "recruiter" ? (
                  <Link to="/search" className="hover:text-gray-300">
                  Find Jobs
                </Link>):(<Link to="/about" className="hover:text-gray-300">
                  About
                </Link>)}
              </li>
              <li>
              {user?.unsafeMetadata?.role !== "recruiter" ? (
                  <Link to="/interview" className="hover:text-gray-300">
                  Get Prep.
                </Link>
                ):(<Link to="/PostJob" className="hover:text-gray-300">
                  Post a Job
                </Link>)}
              </li>
              <li>
              {user?.unsafeMetadata?.role !== "recruiter" ? (
                  <Link to="/resume" className="hover:text-gray-300">
                  Upload Resume
                </Link>
                ):(<Link to="/my-jobs" className="hover:text-gray-300">
                  My Jobs
                </Link>)}
              </li>
              <li>
              {user?.unsafeMetadata?.role !== "recruiter" && (
                  <Link to="/dashboard" className="hover:text-gray-300">
                  Career Advice
                </Link>)}
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/post-job" className="hover:text-gray-300">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-gray-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-gray-300">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gray-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Twitter size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <LinkedIn size={24} />
              </a>
              <a href="https://www.instagram.com/shubhamkr467/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={18} className="mr-2" />
                <a href="mailto:1shubham1256@gmail.com" className="hover:text-gray-300">
                  1shubham1256@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                <a href="tel:+918737932414" className="hover:text-gray-300">
                +918737932414
                </a>
              </li>
              <li className="flex items-center">
                <MapPin size={18} className="mr-2" />
                <span>123 Job Street, Employment City, 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
   </>
  );
};

export default Footer;



