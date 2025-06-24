"use client"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Star, Crown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import ConsultationForm from "@/components/ConsultationForm"

const services = [
  { value: "birth-chart", label: "Complete Birth Chart Analysis", price: "₹2,999", duration: "90 min" },
  { value: "relationship", label: "Relationship & Marriage Consultation", price: "₹2,499", duration: "75 min" },
  { value: "career", label: "Career & Business Astrology", price: "₹2,799", duration: "75 min" },
  { value: "health", label: "Health & Wellness Reading", price: "₹2,299", duration: "60 min" },
  { value: "healing", label: "Chakra Balancing & Energy Healing", price: "₹1,999", duration: "60 min" },
  { value: "pooja", label: "Personalized Grah Shanti Pooja", price: "₹3,999", duration: "2-3 hours" },
  { value: "foundation-class", label: "Foundation of Vedic Astrology", price: "₹15,999", duration: "8 weeks" },
  { value: "advanced-class", label: "Advanced Predictive Astrology", price: "₹25,999", duration: "12 weeks" },
  { value: "specialized-class", label: "Specialized Astrology Courses", price: "₹12,999", duration: "6 weeks" },
]

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 text-gray-900">
      {/* Hero Section */}
      <section className="royal-section celestial-bg pt-24 md:pt-32">
        <div className="royal-container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center mb-8">
              <div className="w-24 md:w-32 h-24 md:h-32 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
                <Crown className="w-12 md:w-16 h-12 md:h-16 text-amber-700" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 royal-font royal-gold-text">
              Connect With Cosmic Wisdom
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 elegant-font leading-relaxed px-4">
              Begin your journey of self-discovery through personalized Vedic astrology consultations and guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="royal-section bg-white">
        <div className="royal-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
            {[
              {
                icon: <Mail className="w-8 h-8 text-amber-600" />,
                title: "Email Us",
                content: "joshi@jotishbyjoshi.com",
                description: "Get in touch for consultations",
              },
              {
                icon: <Phone className="w-8 h-8 text-amber-600" />,
                title: "Call Us",
                content: "+91 98765 43210",
                description: "WhatsApp available",
              },
              {
                icon: <Clock className="w-8 h-8 text-amber-600" />,
                title: "Availability",
                content: "Mon-Sat: 9 AM - 6 PM IST",
                description: "Available for consultations",
              },
              {
                icon: <MapPin className="w-8 h-8 text-amber-600" />,
                title: "Location",
                content: "Online Worldwide",
                description: "Serving 25+ countries",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="royal-card text-center h-full">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold royal-font text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-base md:text-lg font-semibold text-amber-700 mb-2 elegant-font">
                      {item.content}
                    </p>
                    <p className="text-sm text-gray-600 elegant-font">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="royal-section bg-gradient-to-b from-amber-50 to-white">
        <div className="royal-container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <ConsultationForm />
          </motion.div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="royal-section bg-white">
        <div className="royal-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-8 md:p-12">
              <div className="flex justify-center mb-6">
                <Star className="w-12 h-12 text-amber-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 royal-font royal-gold-text">
                What to Expect in Your Consultation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
                <div>
                  <h3 className="text-lg font-semibold royal-font text-gray-800 mb-3">Detailed Analysis</h3>
                  <p className="text-gray-600 elegant-font text-sm md:text-base">
                    Comprehensive birth chart reading covering all aspects of your life including career, relationships,
                    health, and spiritual growth.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold royal-font text-gray-800 mb-3">Personalized Guidance</h3>
                  <p className="text-gray-600 elegant-font text-sm md:text-base">
                    Tailored advice and remedies based on your unique planetary positions and current life
                    circumstances.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold royal-font text-gray-800 mb-3">Future Insights</h3>
                  <p className="text-gray-600 elegant-font text-sm md:text-base">
                    Timing predictions for major life events and guidance on how to navigate upcoming planetary
                    transits.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
