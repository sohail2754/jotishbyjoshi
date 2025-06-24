"use client"

import { motion } from "framer-motion"
import { Crown, Mail, Phone, MapPin, Clock, Star, Heart, BookOpen } from "lucide-react"
import Link from "next/link"

const quickLinks = [
  { name: "About Joshi", href: "/about" },
  { name: "Astrology Services", href: "/services" },
  { name: "Online Classes", href: "/#classes" },
  { name: "Blog & Articles", href: "/blog" },
  { name: "Book Consultation", href: "/contact" },
]

const services = [
  { name: "Birth Chart Reading", href: "/services#consultations" },
  { name: "Marriage Astrology", href: "/services#consultations" },
  { name: "Career Guidance", href: "/services#consultations" },
  { name: "Spiritual Healing", href: "/services#healing" },
  { name: "Vedic Remedies", href: "/services#poojas" },
]

const learningResources = [
  { name: "Foundation Course", href: "/contact" },
  { name: "Advanced Training", href: "/contact" },
  { name: "Specialized Classes", href: "/contact" },
  { name: "Free Resources", href: "/blog" },
  { name: "Student Portal", href: "/contact" },
]

export default function Footer() {
  return (
    <footer className="footer-bg text-white">
      {/* Main Footer Content */}
      <div className="royal-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold royal-font royal-gold-text">JotishByJoshi</h3>
                  <p className="text-sm text-gray-300 elegant-font">Vedic Astrology Master</p>
                </div>
              </div>
              <p className="text-gray-300 elegant-font leading-relaxed mb-6">
                Transforming lives through authentic Vedic astrology education and personalized guidance. Join thousands
                who have discovered their cosmic blueprint.
              </p>
              <div className="flex space-x-4">
                {["♈", "♉", "♊", "♋", "♌", "♍"].map((symbol, i) => (
                  <motion.span
                    key={i}
                    className="text-amber-400 text-xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10 + i * 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {symbol}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-bold royal-font text-amber-400 mb-6 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Quick Links
              </h4>
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
              <h4 className="text-lg font-bold royal-font text-amber-400 mb-6 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Our Services
              </h4>
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

          {/* Contact & Learning */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-bold royal-font text-amber-400 mb-6 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Get in Touch
              </h4>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-gray-300 elegant-font">joshi@jotishbyjoshi.com</p>
                    <p className="text-sm text-gray-400">Email for consultations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-gray-300 elegant-font">+91 98765 43210</p>
                    <p className="text-sm text-gray-400">WhatsApp available</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-gray-300 elegant-font">Mon-Sat: 9 AM - 6 PM IST</p>
                    <p className="text-sm text-gray-400">Available for consultations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-gray-300 elegant-font">Online Worldwide</p>
                    <p className="text-sm text-gray-400">Serving 25+ countries</p>
                  </div>
                </div>
              </div>

              <h5 className="text-md font-semibold royal-font text-amber-300 mb-4">Learning Resources</h5>
              <ul className="space-y-2">
                {learningResources.slice(0, 3).map((resource) => (
                  <li key={resource.name}>
                    <Link
                      href={resource.href}
                      className="footer-link text-gray-400 text-sm elegant-font hover:text-amber-400"
                    >
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="royal-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 elegant-font">
                © 2024 JotishByJoshi. All rights reserved. | Authentic Vedic Astrology Since 2008
              </p>
              <p className="text-sm text-gray-500 elegant-font mt-1">
                Transforming lives through ancient wisdom and modern teaching methods
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-amber-400 transition-colors elegant-font">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-amber-400 transition-colors elegant-font">
                Terms of Service
              </Link>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="elegant-font">Trusted by 10,000+ students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
