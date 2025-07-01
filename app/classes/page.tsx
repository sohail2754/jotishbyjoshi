"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Clock, Users, Award, Crown, ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface ClassPrice {
  id: string
  class_name: string
  price: string
  original_price?: string
}

const astrologyClasses = [
  {
    id: "foundation",
    title: "Foundation of Vedic Astrology",
    level: "Beginner",
    duration: "8 Weeks",
    students: "500+",
    description: "Master the fundamentals of Vedic astrology from ancient texts and traditional methods.",
    features: [
      "12 Zodiac Signs & Their Characteristics",
      "Planetary Influences & Meanings",
      "House System & Significance",
      "Basic Chart Reading Techniques",
      "Live Interactive Sessions",
      "Recorded Modules for Practice",
      "Digital Study Materials",
      "Weekly Assignments & Practice Charts",
    ],
    whoFor: ["Complete beginners to astrology", "Spiritual seekers", "Those interested in self-discovery"],
    benefits: ["Structured curriculum", "Live doubt-clearing sessions", "Certificate upon completion"],
    icon: "♈",
    popular: true,
  },
  {
    id: "advanced",
    title: "Advanced Predictive Astrology",
    level: "Advanced",
    duration: "12 Weeks",
    students: "200+",
    description: "Deep dive into advanced techniques for accurate predictions and professional practice.",
    features: [
      "Advanced Predictive Techniques",
      "Dasha System & Timing",
      "Transit Analysis",
      "Remedial Measures",
      "Professional Practice Setup",
      "Case Study Analysis",
      "Client Consultation Training",
      "Business Development Guidance",
    ],
    whoFor: ["Intermediate astrology students", "Aspiring professional astrologers", "Existing practitioners"],
    benefits: ["Professional certification", "Business setup guidance", "Lifetime support"],
    icon: "☉",
  },
  {
    id: "specialized",
    title: "Specialized Astrology Courses",
    level: "Specialized",
    duration: "6 Weeks",
    students: "150+",
    description: "Focused courses on specific aspects like marriage, career, health, and financial astrology.",
    features: [
      "Marriage & Relationship Astrology",
      "Career & Business Predictions",
      "Health & Medical Astrology",
      "Financial Astrology",
      "Muhurta (Auspicious Timing)",
      "Gemstone & Remedies",
      "Vastu Shastra Integration",
      "Numerology Combination",
    ],
    whoFor: ["Practicing astrologers", "Those seeking specialization", "Advanced students"],
    benefits: ["Specialized expertise", "Niche market knowledge", "Higher consultation fees"],
    icon: "♃",
  },
  {
    id: "remedial",
    title: "Remedial Astrology & Healing",
    level: "Intermediate",
    duration: "10 Weeks",
    students: "120+",
    description: "Learn powerful remedial measures and healing techniques to help clients overcome challenges.",
    features: [
      "Planetary Remedies & Mantras",
      "Gemstone Therapy",
      "Yantra & Tantra Knowledge",
      "Pooja & Ritual Procedures",
      "Energy Healing Techniques",
      "Chakra Balancing Methods",
      "Spiritual Counseling Skills",
      "Karma & Past Life Analysis",
    ],
    whoFor: ["Astrology practitioners", "Spiritual healers", "Those interested in remedial work"],
    benefits: ["Healing expertise", "Comprehensive remedy knowledge", "Spiritual development"],
    icon: "☽",
  },
  {
    id: "professional",
    title: "Professional Astrologer Certification",
    level: "Professional",
    duration: "16 Weeks",
    students: "80+",
    description: "Complete professional training program to become a certified Vedic astrologer.",
    features: [
      "Complete Astrology Curriculum",
      "Professional Ethics & Standards",
      "Client Communication Skills",
      "Business Setup & Marketing",
      "Legal Aspects of Practice",
      "Continuing Education Requirements",
      "Mentorship Program",
      "Professional Network Access",
    ],
    whoFor: ["Serious astrology students", "Career changers", "Professional development seekers"],
    benefits: ["Professional certification", "Career guidance", "Industry recognition"],
    icon: "♄",
  },
  {
    id: "masterclass",
    title: "Master Class Series",
    level: "Master",
    duration: "4 Weeks",
    students: "50+",
    description: "Intensive masterclasses on advanced topics taught by renowned astrology experts.",
    features: [
      "Guest Expert Sessions",
      "Advanced Research Topics",
      "Rare Astrological Techniques",
      "Historical Text Studies",
      "Modern Application Methods",
      "Research Methodology",
      "Publication Opportunities",
      "Academic Collaboration",
    ],
    whoFor: ["Advanced practitioners", "Astrology researchers", "Academic enthusiasts"],
    benefits: ["Expert knowledge", "Research skills", "Academic recognition"],
    icon: "♅",
  },
  {
    id: "practice-kundali",
    title: "Practice Kundali Reading",
    level: "Practice",
    duration: "Monthly",
    students: "300+",
    description: "Monthly practice sessions with 10 real kundali readings for hands-on experience.",
    features: [
      "10 Real Kundali Charts Monthly",
      "Detailed Analysis Practice",
      "Expert Feedback & Guidance",
      "Progressive Difficulty Levels",
      "Chart Reading Techniques",
      "Prediction Accuracy Training",
      "Case Study Discussions",
      "Monthly Progress Assessment",
    ],
    whoFor: ["Astrology students", "Practicing astrologers", "Those wanting hands-on experience"],
    benefits: ["Practical experience", "Expert feedback", "Skill improvement"],
    icon: "♇",
  },
]

export default function ClassesPage() {
  const [classPrices, setClassPrices] = useState<ClassPrice[]>([])

  useEffect(() => {
    // Fetch class prices from API
    const fetchPrices = async () => {
      try {
        const response = await fetch("/api/class-prices")
        if (response.ok) {
          const data = await response.json()
          setClassPrices(data.prices || [])
        }
      } catch (error) {
        console.error("Error fetching class prices:", error)
      }
    }

    fetchPrices()
  }, [])

  const getClassPrice = (classId: string) => {
    const priceData = classPrices.find((p) => p.class_name === classId)
    return priceData || { price: "Contact for Price", original_price: null }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 text-gray-900">
      {/* Hero Section */}
      <section className="royal-section celestial-bg">
        <div className="royal-container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
                <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-amber-700" />
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 royal-font royal-gold-text">
              Astrology Classes
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 max-w-4xl mx-auto mb-6 md:mb-8 elegant-font leading-relaxed px-4">
              Comprehensive Vedic astrology education from beginner to professional level. Learn authentic techniques
              from traditional texts with modern teaching methods.
            </p>
            <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 text-lg royal-font">
              <Users className="w-5 h-5 mr-2" />
              1000+ Students Trained Worldwide
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="royal-section bg-white astro-bg">
        <div className="royal-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-4 royal-font royal-gold-text">Choose Your Learning Path</h2>
            <p className="text-xl text-gray-600 elegant-font">From beginner foundations to professional mastery</p>
            <div className="royal-divider"></div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:gap-10">
            {astrologyClasses.map((course, index) => {
              const priceData = getClassPrice(course.id)

              return (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative mx-2 md:mx-0"
                >
                  {course.popular && (
                    <Badge className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1 royal-font">
                      Most Popular
                    </Badge>
                  )}

                  <Card className="royal-card h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center text-4xl">
                          {course.icon}
                        </div>
                      </div>
                      <Badge variant="secondary" className="mb-3 bg-amber-100 text-amber-800 font-semibold px-4 py-1">
                        {course.level}
                      </Badge>
                      <CardTitle className="text-2xl font-bold royal-font text-gray-800 mb-2">{course.title}</CardTitle>
                      <p className="text-gray-600 elegant-font text-lg leading-relaxed">{course.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Course Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-amber-50 rounded-lg p-3">
                          <Clock className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                          <div className="font-semibold text-gray-800">{course.duration}</div>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-3">
                          <Users className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                          <div className="font-semibold text-gray-800">{course.students}</div>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-3">
                          <Crown className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                          <div className="font-semibold text-amber-800 text-lg">{priceData.price}</div>
                          {priceData.original_price && (
                            <div className="text-sm text-gray-500 line-through">{priceData.original_price}</div>
                          )}
                        </div>
                      </div>

                      {/* Course Features */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-3 royal-font">Course Curriculum:</h4>
                        <ul className="space-y-2">
                          {course.features.map((feature, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-600">
                              <Star className="w-4 h-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Who it's for */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-3 royal-font">Perfect for:</h4>
                        <ul className="space-y-1">
                          {course.whoFor.map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-600">
                              <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-3 royal-font">Key Benefits:</h4>
                        <ul className="space-y-1">
                          {course.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-600">
                              <Award className="w-4 h-4 mr-2 text-amber-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full royal-button text-white font-semibold py-3 royal-font text-lg" asChild>
                        <Link href="/contact">
                          Enroll Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Class Features */}
      <section className="royal-section bg-gradient-to-b from-amber-50 to-white">
        <div className="royal-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 royal-font royal-gold-text">Why Choose JotishByJoshi Classes?</h2>
            <p className="text-xl text-gray-600 elegant-font">Professional excellence with traditional authenticity</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BookOpen className="w-12 h-12 text-amber-600" />,
                title: "Traditional Texts",
                description: "Learn from authentic Vedic scriptures and classical texts",
              },
              {
                icon: <Users className="w-12 h-12 text-amber-600" />,
                title: "Live Interaction",
                description: "Interactive sessions with doubt clearing and Q&A",
              },
              {
                icon: <Award className="w-12 h-12 text-amber-600" />,
                title: "Certification",
                description: "Professional certification recognized in the industry",
              },
              {
                icon: <Clock className="w-12 h-12 text-amber-600" />,
                title: "Flexible Schedule",
                description: "Weekend batches and recorded sessions for convenience",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <Card className="royal-card h-full p-8">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 royal-font text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 elegant-font">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="royal-section bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="royal-container text-center"
        >
          <div className="royal-card p-16 max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 royal-font royal-gold-text">Ready to Begin Your Journey?</h2>
            <p className="text-xl text-gray-700 mb-8 elegant-font">
              Join our community of astrology students and transform your understanding of cosmic wisdom
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="royal-button text-white px-12 py-4 rounded-full text-xl font-bold royal-font shadow-xl"
                asChild
              >
                <Link href="/contact">Enroll Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-amber-500 text-amber-700 hover:bg-amber-50 px-12 py-4 rounded-full text-xl font-bold royal-font bg-transparent"
                asChild
              >
                <Link href="/contact">Book Free Consultation</Link>
              </Button>
            </div>
            <p className="text-lg text-gray-600 mt-6 elegant-font">
              ✦ All classes conducted online ✦ Global accessibility ✦ Traditional Vedic methods ✦
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
