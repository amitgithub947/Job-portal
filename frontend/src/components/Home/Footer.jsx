import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <a
            href="/about"
            className="text-gray-400 hover:text-white transition-colors"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Contact
          </a>
          <a
            href="/privacy"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          Empowering careers, connecting talent with opportunity.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
