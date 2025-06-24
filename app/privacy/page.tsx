"use client"

import { motion } from "framer-motion"
import { Shield, Eye, Lock, UserCheck, Crown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 text-gray-900">
      {/* Hero Section */}
      <section className="royal-section celestial-bg">
        <div className="royal-container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
                <Shield className="w-16 h-16 text-amber-700" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 royal-font royal-gold-text">Privacy Policy</h1>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto elegant-font leading-relaxed">
              Your privacy and personal information are sacred to us. Learn how we protect and handle your data with the
              utmost care and respect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="royal-section bg-white">
        <div className="royal-container max-w-4xl mx-auto">
          <div className="space-y-12">
            {/* Information Collection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="royal-card">
                <CardHeader>
                  <CardTitle className="flex items-center royal-font royal-gold-text text-2xl">
                    <Eye className="w-8 h-8 mr-4 text-amber-600" />
                    Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 elegant-font text-gray-700">
                  <p className="text-lg leading-relaxed">
                    We collect information that you provide directly to us when you book consultations, enroll in
                    classes, or contact us for services.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• Personal details: Name, email, phone number, birth information</li>
                    <li>• Consultation data: Birth charts, questions, session recordings</li>
                    <li>• Payment information: Processed securely through encrypted gateways</li>
                    <li>• Communication records: Emails, messages, and support interactions</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* How We Use Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="royal-card">
                <CardHeader>
                  <CardTitle className="flex items-center royal-font royal-gold-text text-2xl">
                    <UserCheck className="w-8 h-8 mr-4 text-amber-600" />
                    How We Use Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 elegant-font text-gray-700">
                  <p className="text-lg leading-relaxed">
                    Your information is used exclusively to provide you with the best possible astrological services and
                    educational experience.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• Conducting personalized astrology consultations and readings</li>
                    <li>• Providing access to online classes and educational materials</li>
                    <li>• Sending appointment confirmations and session recordings</li>
                    <li>• Improving our services based on your feedback</li>
                    <li>• Sending relevant astrological insights and updates (with consent)</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Protection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="royal-card">
                <CardHeader>
                  <CardTitle className="flex items-center royal-font royal-gold-text text-2xl">
                    <Lock className="w-8 h-8 mr-4 text-amber-600" />
                    Data Protection & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 elegant-font text-gray-700">
                  <p className="text-lg leading-relaxed">
                    We implement industry-standard security measures to protect your personal and astrological data.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• SSL encryption for all data transmission</li>
                    <li>• Secure cloud storage with regular backups</li>
                    <li>• Limited access to authorized personnel only</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Confidential handling of all astrological consultations</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="royal-card">
                <CardHeader>
                  <CardTitle className="flex items-center royal-font royal-gold-text text-2xl">
                    <Crown className="w-8 h-8 mr-4 text-amber-600" />
                    Your Rights & Choices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 elegant-font text-gray-700">
                  <p className="text-lg leading-relaxed">
                    You have complete control over your personal information and how it's used in our services.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• Access and review your personal data at any time</li>
                    <li>• Request corrections to inaccurate information</li>
                    <li>• Delete your account and associated data</li>
                    <li>• Opt-out of marketing communications</li>
                    <li>• Request data portability for your records</li>
                  </ul>
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                    <p className="text-amber-800 font-semibold">
                      Contact us at joshi@jotishbyjoshi.com to exercise any of these rights or for privacy-related
                      questions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
