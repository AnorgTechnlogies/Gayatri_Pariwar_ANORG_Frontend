import React from "react";
import Logo from "../assets/Logo.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  const link = {
    facebookLink: "https://www.facebook.com/share/1D33zH3dXL/"
  }

  return (
    <footer className="bg-[#1e150e] text-white py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* MAIN 3 COLUMNS - More Compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-sm">

          {/* LEFT: Logo + Name + Address */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <img src={Logo} alt="Logo" className="w-10 h-10" />
              <div>
                <p className="font-semibold text-gray-200">All World Gayatri Pariwar</p>
                <p className="text-gray-300 text-sm">San Antonio, Texas</p>
              </div>
            </div>

            {/* Address Section - Compact Aside */}
            <aside className="rounded-lg p-3 mt-2">
              <p className="font-medium text-gray-300 text-xs mb-1">Address</p>
              <p className="text-[#ff8c4d] text-xs leading-tight">
                Gayatri Center of Texas<br />
                P.O. Box 592343<br />
                San Antonio, TX 78259
              </p>
            </aside>

            <div className="mt-5">
              <a
                href={link.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 font-medium text-base hover:underline transition duration-200"
              >
                {/* Smaller Facebook Icon */}
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>

                {/* Smaller and lighter text */}
                <span>More Info on Facebook</span>
              </a>
            </div>

            <div className=" pt-2 mb-6">
              <a
                href="https://chat.whatsapp.com/GMB5CMHR1xmIFJuISQdBEz?mode=hqrt2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-green-500 hover:text- transition-colors duration-200 text-base hover:underline"
              >
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  fill="#25D366"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 35 56.1 81.7 56.1 130.5 0 101.7-84.3 184.5-186.6 184.5zM248 224c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm-96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm192 0c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16z" />
                </svg>
                <span className="text-lg font-semibold">Join us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* CENTER: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-orange-400 mb-3">Contact Us</h3>

            <div>
              <p className="font-medium text-gray-300 text-xs">Email</p>
              <a
                href="mailto:awgp.satx@gmail.com"
                className="text-[#ff8c4d] hover:text-orange-300 transition text-sm block mt-1"
              >
                awgp.satx@gmail.com
              </a>
            </div>

            <div>
              <p className="font-medium text-gray-300 text-xs">Phone</p>
              <p className="text-[#ff8c4d] text-sm mt-1 space-y-1">
                <span className="block">210 380 3054</span>
                <span className="block">210 542 3332</span>
                <span className="block">210 542 3336</span>
              </p>
            </div>
          </div>

          {/* RIGHT: Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-orange-400 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/service", label: "Services" },
                { to: "/about", label: "About Us" },
                { to: "/media", label: "Media" },
                { to: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-orange-100 hover:text-orange-300 hover:underline transition text-sm font-medium block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR - More Compact */}
        <div className="border-t border-gray-700/50 mt-6 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-400">

            {/* Tax Info */}
            <p className="text-center md:text-left">
              AWGP San Antonio • Non-profit • Donations are tax deductible
            </p>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-300">
                Copyright © 2025 AWGP San Antonio, TX
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;