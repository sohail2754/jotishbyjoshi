"use client"

import { motion } from "framer-motion"
import { Star, Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Classes", href: "/classes" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  const services = [
    { name: "Personal Consultation", href: "/services#consultations" },
    { name: "Marriage Compatibility", href: "/services#consultations" },
    { name: "Career Guidance", href: "/services#consultations" },
    { name: "Practice Kundali", href: "/services#practice-kundali" },
    { name: "Sacred Poojas", href: "/services#poojas" },
    { name: "Spiritual Healing", href: "/services#healing" },
  ]

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com/jyotishjoshi", icon: Instagram },
    { name: "Facebook", href: "https://facebook.com/jyotishjoshi", icon: Facebook },
    { name: "Twitter", href: "https://twitter.com/jyotishjoshi", icon: Twitter },
    { name: "YouTube", href: "https://youtube.com/@jyotishjoshi", icon: Youtube },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold royal-font text-amber-400">Jyotish Joshi</h3>
                  <p className="text-sm text-gray-400 elegant-font">Vedic Astrology Master</p>
                </div>
              </div>
              <p className="text-gray-300 elegant-font leading-relaxed mb-6">
                Guiding souls through the ancient wisdom of Vedic astrology, helping you discover your true path and
                unlock the cosmic secrets that shape your destiny.
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-bold royal-font text-amber-400 mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="footer-link text-gray-300 elegant-font hover:text-amber-400">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-bold royal-font text-amber-400 mb-6">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link href={service.href} className="footer-link text-gray-300 elegant-font hover:text-amber-400">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-bold royal-font text-amber-400 mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-gray-300 elegant-font">+91 8390255850</p>
                    <p className="text-sm text-gray-400">WhatsApp Available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-gray-300 elegant-font">joshijyotish2025@gmail.com</p>
                    <p className="text-sm text-gray-400">24/7 Email Support</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-gray-300 elegant-font">Mon-Sun 11am to 5pm</p>
                    <p className="text-sm text-gray-400">Consultation Hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-gray-300 elegant-font">Online Consultations</p>
                    <p className="text-sm text-gray-400">Worldwide Service</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400 elegant-font">© {currentYear} Jyotish Joshi. All rights reserved.</p>
                <p className="text-sm text-gray-500 mt-1">Vedic Astrology • Spiritual Guidance • Ancient Wisdom</p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors footer-link">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-amber-400 transition-colors footer-link">
                  Terms of Service
                </Link>
                <Link href="/contact" className="text-gray-400 hover:text-amber-400 transition-colors footer-link">
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
