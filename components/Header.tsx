"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Crown, Star, Phone, Mail, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Services",
    href: "/services",
    submenu: [
      { name: "Personal Consultation", href: "/services#consultations" },
      { name: "Pooja & Remedies", href: "/services#poojas" },
      { name: "Spiritual Healing", href: "/services#healing" },
    ],
  },
  { name: "Classes", href: "/#classes" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmenuToggle = (itemName: string) => {
    setActiveSubmenu(activeSubmenu === itemName ? null : itemName)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-amber-200/50 py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl border-2 border-amber-300">
                <Crown className="w-5 h-5 md:w-7 md:h-7 text-white drop-shadow-sm" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center border border-white">
                <Star className="w-2 h-2 md:w-2.5 md:h-2.5 text-amber-800" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1
                className={`text-xl md:text-2xl lg:text-3xl font-bold royal-font transition-colors ${
                  scrolled ? "text-amber-700" : "text-amber-600"
                }`}
              >
                JotishByJoshi
              </h1>
              <p
                className={`text-xs lg:text-sm elegant-font transition-colors ${
                  scrolled ? "text-gray-600" : "text-gray-500"
                }`}
              >
                Vedic Astrology Master
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`nav-item px-4 py-2 text-sm font-medium royal-font transition-all duration-300 rounded-lg flex items-center ${
                    pathname === item.href
                      ? "text-amber-600 bg-amber-50"
                      : scrolled
                        ? "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                        : "text-gray-600 hover:text-amber-600 hover:bg-white/80"
                  }`}
                  onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                  onMouseLeave={() => item.submenu && setActiveSubmenu(null)}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="w-4 h-4 ml-1" />}
                </Link>

                {/* Submenu */}
                {item.submenu && (
                  <AnimatePresence>
                    {activeSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-amber-200 py-2 z-50"
                        onMouseEnter={() => setActiveSubmenu(item.name)}
                        onMouseLeave={() => setActiveSubmenu(null)}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors elegant-font"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <div className="hidden xl:flex items-center space-x-4 text-sm">
              <div
                className={`flex items-center space-x-2 transition-colors ${
                  scrolled ? "text-gray-600" : "text-gray-500"
                }`}
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span className="elegant-font font-medium">+91 98765 43210</span>
              </div>
              <div className="w-px h-5 bg-gray-300"></div>
              <div
                className={`flex items-center space-x-2 transition-colors ${
                  scrolled ? "text-gray-600" : "text-gray-500"
                }`}
              >
                <Mail className="w-4 h-4 text-amber-600" />
                <span className="elegant-font font-medium">joshi@jotishbyjoshi.com</span>
              </div>
            </div>
            <Button
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-4 lg:px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/contact">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${
              scrolled ? "hover:bg-amber-50 text-gray-700" : "hover:bg-white/80 text-gray-600"
            }`}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden mt-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-amber-200 overflow-hidden"
            >
              <nav className="p-4 space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl font-medium royal-font transition-all duration-300 ${
                        pathname === item.href
                          ? "bg-amber-100 text-amber-700 shadow-sm"
                          : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                      }`}
                    >
                      {item.name}
                    </Link>

                    {/* Mobile Submenu */}
                    {item.submenu && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors elegant-font"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Mobile Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="pt-4 border-t border-amber-200"
                >
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-3 px-4 py-2">
                      <Phone className="w-5 h-5 text-amber-600" />
                      <span className="text-sm font-medium text-gray-700 elegant-font">+91 98765 43210</span>
                    </div>
                    <div className="flex items-center space-x-3 px-4 py-2">
                      <Mail className="w-5 h-5 text-amber-600" />
                      <span className="text-sm font-medium text-gray-700 elegant-font">joshi@jotishbyjoshi.com</span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 rounded-xl shadow-lg"
                    asChild
                  >
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Book Consultation
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
