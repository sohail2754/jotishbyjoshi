"use client"

import { motion } from "framer-motion"
import { FileText, Scale, Users, AlertCircle, Crown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 text-gray-900">
      {/* Hero Section */}
      <section className="royal-section celestial-bg">
        <div className="royal-container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
                <Scale className="w-16 h-16 text-amber-700" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 royal-font royal-gold-text">Terms of Service</h1>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto elegant-font leading-relaxed">
              Clear terms and conditions for our astrology services, classes, and consultations. Understanding our
              mutual commitments and responsibilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="royal-section bg-white">
        <div className="royal-container max-w-4xl mx-auto">
          <div className="space-y-12">
            {/* Service Agreement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="royal-card">
                <CardHeader>
                  <CardTitle className="flex items-center royal-font royal-gold-text text-2xl">
                    <FileText className="w-8 h-8 mr-4 text-amber-600" />
                    Service Agreement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 elegant-font text-gray-700">
                  <p className="text-lg leading-relaxed">
                    By booking our services or enrolling in classes, you agree to these terms and conditions.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• All consultations are for guidance and educational purposes</li>
                    <li>• Astrology readings are based on traditional Vedic principles</li>
                    <li>• Session recordings are provided for personal reference only</li>
                    <li>• Payment is required to confirm bookings and enrollments</li>
                    <li>• Cancellations must be made 24 hours in advance</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* User Responsibilities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="royal-card">
                <CardHeader>
                  <CardTitle className="flex items-center royal-font royal-gold-text text-2xl">
                    <Users className="w-8 h-8 mr-4 text-amber-600" />
                    User Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 elegant-font text-gray-700">
                  <p className="text-lg leading-relaxed">
                    To ensure the best experience, we ask that you follow these guidelines.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• Provide accurate birth information for consultations</li>
                    <li>• Attend scheduled sessions on time</li>
                    <li>• Maintain respectful communication</li>
                    <li>• Use course materials for personal learning only</li>
                    <li>• Respect intellectual property and copyrights</li>
                    <li>• Follow payment terms and conditions</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Disclaimers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="royal-card">
                <CardHeader>
                  <CardTitle className="flex items-center royal-font royal-gold-text text-2xl">
                    <AlertCircle className="w-8 h-8 mr-4 text-amber-600" />
                    Important Disclaimers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 elegant-font text-gray-700">
                  <p className="text-lg leading-relaxed">
                    Please understand the nature and limitations of astrological services.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• Astrology is for guidance and self-understanding, not absolute prediction</li>
                    <li>• We do not provide medical, legal, or financial advice</li>
                    <li>• Individual results and experiences may vary</li>
                    <li>• Remedies are traditional suggestions, not guarantees</li>
                    <li>• Free will and personal choices influence life outcomes</li>
                  </ul>
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                    <p className="text-amber-800 font-semibold">
                      Always consult qualified professionals for medical, legal, or financial decisions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Refund Policy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="royal-card">
                <CardHeader>
                  <CardTitle className="flex items-center royal-font royal-gold-text text-2xl">
                    <Crown className="w-8 h-8 mr-4 text-amber-600" />
                    Refund & Cancellation Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 elegant-font text-gray-700">
                  <p className="text-lg leading-relaxed">
                    We strive for complete satisfaction with our services and offer fair refund policies.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• Full refund for cancellations 48+ hours before consultation</li>
                    <li>• 50% refund for cancellations 24-48 hours before session</li>
                    <li>• No refund for cancellations less than 24 hours</li>
                    <li>• Course refunds available within 7 days of enrollment</li>
                    <li>• Emergency rescheduling accommodated when possible</li>
                    <li>• Refunds processed within 5-7 business days</li>
                  </ul>
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      Contact us immediately if you're unsatisfied with any service for resolution.
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
