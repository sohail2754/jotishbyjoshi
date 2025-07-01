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
                    <p className="text-gray-300 elegant-font">joshijyotish2025@gmail.com</p>
                    <p className="text-sm text-gray-400">Email for consultations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-gray-300 elegant-font">+91 8390255850</p>
                    <p className="text-sm text-gray-400">WhatsApp available</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-gray-300 elegant-font">Mon-Sun: 11 AM - 5 PM IST</p>
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
            <div className="flex items-center space-x-4">
              <Link
                href="https://www.instagram.com/ashleshaastro?igsh=MWhtYm5oZnU2N2ZlaA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link
                href="mailto:joshijyotish2025@gmail.com"
                className="text-amber-400 hover:text-amber-300 transition-colors"
                aria-label="Send us an email"
              >
                <Mail className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
