"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, CheckCircle, Phone, Calendar, Award, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface ServicePrice {
  id: string
  name: string
  price: number
  currency: string
  description: string
  billing?: string
}

interface ClassPrice {
  id: string
  name: string
  price: number
  currency: string
  duration: string
  level: string
  description: string
}

export default function ServicesPage() {
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>([])
  const [classPrices, setClassPrices] = useState<ClassPrice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const [serviceRes, classRes] = await Promise.all([fetch("/api/service-prices"), fetch("/api/class-prices")])

        if (serviceRes.ok) {
          const serviceData = await serviceRes.json()
          setServicePrices(Array.isArray(serviceData) ? serviceData : [])
        }

        if (classRes.ok) {
          const classData = await classRes.json()
          setClassPrices(Array.isArray(classData) ? classData : [])
        }
      } catch (error) {
        console.error("Error fetching prices:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrices()
  }, [])

  const getPriceById = (id: string, type: "service" | "class" = "service"): string => {
    const prices = type === "service" ? servicePrices : classPrices
    if (!Array.isArray(prices)) return "Contact for pricing"

    const item = prices.find((p) => p.id === id)
    if (!item) return "Contact for pricing"

    const billing = "billing" in item && item.billing ? `/${item.billing}` : ""
    return `₹${item.price.toLocaleString()}${billing}`
  }

  const practiceKundaliService = {
    title: "Practice Kundali for Students",
    description:
      "Specialized monthly program designed for astrology students to practice chart reading with real cases under expert guidance.",
    features: [
      "Monthly practice sessions with real birth charts",
      "Step-by-step guidance on chart interpretation",
      "Doubt clearing sessions with experienced astrologer",
      "Practice worksheets and study materials",
      "Certificate upon completion of 6-month program",
      "Small batch size for personalized attention",
    ],
    price: getPriceById("practice-kundali"),
    duration: "Monthly Sessions",
    batchSize: "Max 15 students",
    level: "Beginner to Intermediate",
  }

  const consultationServices = [
    {
      title: "Birth Chart Analysis",
      description:
        "Comprehensive analysis of your birth chart revealing personality traits, life patterns, and future possibilities.",
      features: [
        "Complete birth chart interpretation",
        "Personality analysis",
        "Life path guidance",
        "Career insights",
        "Relationship compatibility",
        "Lucky numbers & colors",
      ],
      price: getPriceById("birth-chart-analysis"),
      duration: "60-90 minutes",
      icon: <Star className="w-8 h-8 text-amber-600" />,
    },
    {
      title: "Marriage Compatibility",
      description:
        "Detailed compatibility analysis for couples planning marriage or seeking to understand their relationship dynamics.",
      features: [
        "Guna matching analysis",
        "Mangal dosha check",
        "Compatibility percentage",
        "Relationship strengths & challenges",
        "Remedial suggestions",
        "Auspicious marriage timing",
      ],
      price: getPriceById("marriage-compatibility"),
      duration: "45-60 minutes",
      icon: <Heart className="w-8 h-8 text-pink-600" />,
    },
    {
      title: "Career Guidance",
      description:
        "Professional guidance to help you choose the right career path and achieve success in your chosen field.",
      features: [
        "Career suitability analysis",
        "Business vs job guidance",
        "Promotion timing",
        "Financial prospects",
        "Professional challenges",
        "Success remedies",
      ],
      price: getPriceById("career-guidance"),
      duration: "45-60 minutes",
      icon: <Award className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Health & Wellness",
      description:
        "Health predictions and wellness guidance based on planetary positions and their influence on your well-being.",
      features: [
        "Health vulnerability analysis",
        "Disease prediction & timing",
        "Wellness recommendations",
        "Dietary suggestions",
        "Lifestyle modifications",
        "Healing gemstone guidance",
      ],
      price: getPriceById("health-wellness"),
      duration: "45-60 minutes",
      icon: <Sparkles className="w-8 h-8 text-green-600" />,
    },
  ]

  const poojaServices = [
    {
      title: "Grah Shanti Pooja",
      description:
        "Planetary peace ceremony to reduce negative planetary influences and enhance positive energies in your life.",
      features: [
        "Complete planetary appeasement",
        "Vedic mantras & rituals",
        "Online ceremony participation",
        "Blessed prasadam delivery",
        "Post-pooja guidance",
        "Remedial measures",
      ],
      price: getPriceById("grah-shanti-pooja"),
      duration: "2-3 hours",
      icon: <Star className="w-8 h-8 text-orange-600" />,
    },
    {
      title: "Mangal Dosha Pooja",
      description: "Specialized ceremony to neutralize Mars-related doshas affecting marriage and relationships.",
      features: [
        "Mangal dosha neutralization",
        "Marriage obstacle removal",
        "Relationship harmony",
        "Traditional rituals",
        "Personalized mantras",
        "Ongoing support",
      ],
      price: getPriceById("mangal-dosha-pooja"),
      duration: "2 hours",
      icon: <Heart className="w-8 h-8 text-red-600" />,
    },
    {
      title: "Kaal Sarp Pooja",
      description: "Sacred ceremony to appease serpent deities and remove obstacles caused by Kaal Sarp Yoga.",
      features: [
        "Kaal Sarp dosha removal",
        "Obstacle elimination",
        "Life progress enhancement",
        "Spiritual protection",
        "Family harmony",
        "Prosperity attraction",
      ],
      price: getPriceById("kaal-sarp-pooja"),
      duration: "3 hours",
      icon: <Sparkles className="w-8 h-8 text-purple-600" />,
    },
  ]

  const healingServices = [
    {
      title: "Chakra Balancing",
      description:
        "Energy healing session to align and balance your seven chakras for optimal physical and spiritual well-being.",
      features: [
        "Complete chakra assessment",
        "Energy blockage removal",
        "Chakra alignment & balancing",
        "Meditation guidance",
        "Crystal healing recommendations",
        "Follow-up support",
      ],
      price: getPriceById("chakra-balancing"),
      duration: "60 minutes",
      icon: <Sparkles className="w-8 h-8 text-violet-600" />,
    },
    {
      title: "Aura Cleansing",
      description: "Spiritual cleansing session to remove negative energies and strengthen your protective aura.",
      features: [
        "Aura reading & analysis",
        "Negative energy removal",
        "Protective shield strengthening",
        "Spiritual cleansing rituals",
        "Energy maintenance tips",
        "Ongoing guidance",
      ],
      price: getPriceById("aura-cleansing"),
      duration: "45 minutes",
      icon: <Star className="w-8 h-8 text-cyan-600" />,
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-amber-200 rounded-lg w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-amber-100 rounded-lg w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="h-6 bg-amber-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-amber-100 rounded w-full mb-2"></div>
                  <div className="h-4 bg-amber-100 rounded w-2/3 mb-4"></div>
                  <div className="h-8 bg-amber-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 celestial-bg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 royal-font royal-gold-text">
              Astrology Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 elegant-font max-w-4xl mx-auto leading-relaxed">
              Discover your cosmic blueprint through personalized consultations, sacred ceremonies, and spiritual
              healing sessions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Practice Kundali - Featured Section */}
      <section className="py-16 bg-gradient-to-r from-amber-100 to-yellow-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-amber-600 text-white px-4 py-2 text-lg font-semibold">New Program</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 royal-font royal-gold-text">
              {practiceKundaliService.title}
            </h2>
            <p className="text-lg text-gray-700 elegant-font max-w-3xl mx-auto">{practiceKundaliService.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="royal-card shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold royal-font text-gray-800 mb-6">Program Features</h3>
                    <ul className="space-y-3">
                      {practiceKundaliService.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 elegant-font">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-6">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-amber-700 royal-font mb-2">
                        {practiceKundaliService.price}
                      </div>
                      <p className="text-gray-600 elegant-font">Monthly Investment</p>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold">{practiceKundaliService.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Batch Size:</span>
                        <span className="font-semibold">{practiceKundaliService.batchSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Level:</span>
                        <span className="font-semibold">{practiceKundaliService.level}</span>
                      </div>
                    </div>
                    <Button className="w-full royal-button text-white font-semibold py-3 text-lg" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Consultation Services */}
      <section id="consultations" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 royal-font royal-gold-text">Personal Consultations</h2>
            <p className="text-xl text-gray-600 elegant-font max-w-3xl mx-auto">
              Get personalized insights and guidance through detailed astrological analysis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {consultationServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="royal-card h-full card-hover-effect">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      {service.icon}
                      <div>
                        <CardTitle className="text-xl font-bold royal-font text-gray-800">{service.title}</CardTitle>
                        <p className="text-sm text-gray-600">{service.duration}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 elegant-font leading-relaxed">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">What's Included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-amber-700 royal-font">{service.price}</div>
                      <Button className="royal-button text-white font-semibold px-6 py-2" asChild>
                        <Link href="/contact">Book Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pooja Services */}
      <section id="poojas" className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 royal-font royal-gold-text">Sacred Poojas & Remedies</h2>
            <p className="text-xl text-gray-600 elegant-font max-w-3xl mx-auto">
              Traditional Vedic ceremonies performed online to balance planetary energies and remove obstacles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {poojaServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="royal-card h-full card-hover-effect">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      {service.icon}
                      <div>
                        <CardTitle className="text-lg font-bold royal-font text-gray-800">{service.title}</CardTitle>
                        <p className="text-sm text-gray-600">{service.duration}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 elegant-font leading-relaxed text-sm">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Benefits:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-amber-700 royal-font">{service.price}</div>
                      <Button className="royal-button text-white font-semibold px-4 py-2 text-sm" asChild>
                        <Link href="/contact">Book Pooja</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Healing Services */}
      <section id="healing" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 royal-font royal-gold-text">Spiritual Healing</h2>
            <p className="text-xl text-gray-600 elegant-font max-w-3xl mx-auto">
              Energy healing sessions to restore balance and harmony in your mind, body, and spirit
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {healingServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="royal-card h-full card-hover-effect">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      {service.icon}
                      <div>
                        <CardTitle className="text-xl font-bold royal-font text-gray-800">{service.title}</CardTitle>
                        <p className="text-sm text-gray-600">{service.duration}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 elegant-font leading-relaxed">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Session Includes:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-amber-700 royal-font">{service.price}</div>
                      <Button className="royal-button text-white font-semibold px-6 py-2" asChild>
                        <Link href="/contact">Book Session</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gradient-to-r from-amber-100 to-yellow-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 royal-font royal-gold-text">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-gray-700 mb-8 elegant-font">
              Book your consultation today and discover what the stars have in store for you
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="royal-button text-white px-8 py-4 rounded-full text-lg font-bold royal-font shadow-xl"
                asChild
              >
                <Link href="/contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Consultation
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-amber-500 text-amber-700 hover:bg-amber-50 px-8 py-4 rounded-full text-lg font-bold royal-font bg-transparent"
                asChild
              >
                <Link href="tel:+919876543210">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
