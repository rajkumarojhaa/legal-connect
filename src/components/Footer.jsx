import React from "react";
import { motion } from "framer-motion";
import {
  Scale,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Family Law", href: "#" },
        { name: "Business Law", href: "#" },
        { name: "Criminal Law", href: "#" },
        { name: "Real Estate Law", href: "#" },
        { name: "Employment Law", href: "#" },
        { name: "Civil Law", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Our Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Blog", href: "/blog" },
        { name: "News", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Legal Guides", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "Legal Forms", href: "#" },
        { name: "Consultation", href: "#" },
        { name: "Support", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
    { icon: Instagram, href: "#", name: "Instagram" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">LegalConnect</span>
              </Link>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Connecting you with experienced legal professionals who
                understand your needs. Get expert legal advice and
                representation for any legal matter.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-blue-400" />
                  <span>contact@legalconnect.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                  <span>123 Legal Street, Law City, LC 12345</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-300 mb-4 md:mb-0"
            >
              <p>&copy; {new Date().getFullYear()} LegalConnect. All rights reserved.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex space-x-4"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-center items-center mt-4 space-y-2 md:space-y-0 md:space-x-6"
          >
            <Link to="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              Cookie Policy
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
