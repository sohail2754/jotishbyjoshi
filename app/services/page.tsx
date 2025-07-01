"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Star,
  Clock,
  Users,
  BookOpen,
  Heart,
  Sparkles,
  GraduationCap,
  Calendar,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface ServicePrice {
  id: string
  name: string
  price: number
  duration?: string
  description?: string
}

interface ClassPrice {
  id: string
  name: string
  price: number
  duration: string
  description?: string
}

export default function ServicesPage() {
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>([])
  const [classPrices, setClassPrices] = useState<ClassPrice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const [serviceRes, classRes] = await Promise.all([fetch("/api/service-prices"), fetch("/api/class-prices")])

        const serviceData = await serviceRes.json()
        const classData = await classRes.json()

        setServicePrices(serviceData)
        setClassPrices(classData)
      } catch (error) {
        console.error("Error fetching prices:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrices()
  }, [])

  const getPriceById = (prices: ServicePrice[] | ClassPrice[], id: string) => {
    const item = prices.find((p) => p.id === id)
    return item ? `₹${item.price}` : "Contact for pricing"
  }

  const consultationServices = [
    {
      id: "personal-consultation",
      title: "Personal Consultation",
      description:
        "Comprehensive birth chart analysis with personalized guidance for life decisions, career, relationships, and spiritual growth.",
      icon: Star,
      features: [
        "Complete birth chart analysis",
        "Life path guidance",
        "Career and relationship advice",
        "Remedial measures",
        "Follow-up support",
      ],
      duration: "60-90 minutes",
      priceId: "personal-consultation",
    },
    {
      id: "marriage-compatibility",
      title: "Marriage Compatibility",
      description:
        "Detailed compatibility analysis for couples using traditional Vedic astrology methods to ensure harmonious relationships.",
      icon: Heart,
      features: [
        "Guna Milan analysis",
        "Mangal Dosha check",
        "Compatibility scoring",
        "Remedial solutions",
        "Auspicious timing",
      ],
      duration: "45-60 minutes",
      priceId: "marriage-compatibility",
    },
    {
      id: "career-guidance",
      title: "Career Guidance",
      description:
        "Professional astrology consultation focused on career choices, business decisions, and financial planning.",
      icon: BookOpen,
      features: [
        "Career path analysis",
        "Business timing",
        "Financial planning",
        "Professional growth",
        "Investment guidance",
      ],
      duration: "45-60 minutes",
      priceId: "career-guidance",
    },
    {
      id: "health-wellness",
      title: "Health & Wellness",
      description:
        "Astrological insights into health patterns, preventive measures, and wellness recommendations based on planetary positions.",
      icon: Sparkles,
      features: [
        "Health pattern analysis",
        "Preventive measures",
        "Wellness recommendations",
        "Gemstone therapy",
        "Lifestyle guidance",
      ],
      duration: "45-60 minutes",
      priceId: "health-wellness",
    },
    {
      id: "practice-kundali",
      title: "Practice Kundali for Students",
      description:
        "Monthly program designed for astrology students to practice chart reading with real birth charts under expert guidance.",
      icon: GraduationCap,
      features: [
        "Weekly practice sessions",
        "Real birth chart analysis",
        "Step-by-step guidance",
        "Study materials provided",
        "Certificate upon completion",
      ],
      duration: "Monthly program",
      priceId: "practice-kundali",
      isNew: true,
    },
  ]

  const poojaServices = [
    {
      id: "ganesh-pooja",
      title: "Ganesh Pooja",
      description: "Traditional Ganesh worship for removing obstacles and ensuring success in new ventures.",
      icon: Star,
      features: ["Complete ritual setup", "Sacred mantras", "Prasad distribution", "Blessing ceremony"],
      priceId: "ganesh-pooja",
    },
    {
      id: "navagraha-pooja",
      title: "Navagraha Pooja",
      description: "Nine planetary worship to balance cosmic energies and reduce negative planetary influences.",
      icon: Sparkles,
      features: ["Nine planet worship", "Energy balancing", "Negative influence reduction", "Cosmic harmony"],
      priceId: "navagraha-pooja",
    },
    {
      id: "mahamrityunjaya-jaap",
      title: "Mahamrityunjaya Jaap",
      description: "Powerful healing mantra recitation for health, longevity, and protection from negative energies.",
      icon: Heart,
      features: ["Healing mantras", "Health improvement", "Longevity blessings", "Protection rituals"],
      priceId: "mahamrityunjaya-jaap",
    },
  ]

  const healingServices = [
    {
      id: "chakra-balancing",
      title: "Chakra Balancing",
      description:
        "Energy healing session to align and balance your seven chakras for optimal physical and spiritual health.",
      icon: Sparkles,
      features: ["Seven chakra alignment", "Energy cleansing", "Meditation guidance", "Crystal therapy"],
      priceId: "chakra-balancing",
    },
    {
      id: "aura-cleansing",
      title: "Aura Cleansing",
      description: "Spiritual cleansing to remove negative energies and restore your natural protective aura.",
      icon: Star,
      features: ["Negative energy removal", "Aura restoration", "Protection enhancement", "Spiritual cleansing"],
      priceId: "aura-cleansing",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold royal-font mb-6">
              <span className="royal-gold-text">Our Services</span>
            </h1>
            <p className="text-xl text-gray-600 elegant-font max-w-3xl mx-auto mb-8">
              Comprehensive Vedic astrology services, spiritual healing, and traditional poojas to guide you on your
              life journey with ancient wisdom and modern understanding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Consultation Services */}
      <section id="consultations" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold royal-font mb-4 text-gray-800">Astrology Consultations</h2>
            <p className="text-lg text-gray-600 elegant-font max-w-2xl mx-auto">
              Personalized guidance through the wisdom of Vedic astrology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultationServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="royal-card h-full relative overflow-hidden">
                  {service.isNew && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                      New
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl royal-font text-gray-800">{service.title}</CardTitle>
                    <CardDescription className="elegant-font text-gray-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="text-2xl font-bold royal-font text-amber-600">
                        {loading ? "Loading..." : getPriceById(servicePrices, service.priceId)}
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full royal-button" asChild>
                      <Link href="/contact">
                        Book Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pooja Services */}
      <section id="poojas" className="py-16 px-4 bg-gradient-to-r from-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold royal-font mb-4 text-gray-800">Sacred Poojas & Rituals</h2>
            <p className="text-lg text-gray-600 elegant-font max-w-2xl mx-auto">
              Traditional Vedic rituals for spiritual purification and divine blessings
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {poojaServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="royal-card h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl royal-font text-gray-800">{service.title}</CardTitle>
                    <CardDescription className="elegant-font text-gray-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold royal-font text-amber-600 mb-4">
                        {loading ? "Loading..." : getPriceById(servicePrices, service.priceId)}
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full royal-button" asChild>
                      <Link href="/contact">
                        Book Pooja
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Healing Services */}
      <section id="healing" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold royal-font mb-4 text-gray-800">Spiritual Healing</h2>
            <p className="text-lg text-gray-600 elegant-font max-w-2xl mx-auto">
              Energy healing and spiritual cleansing for holistic well-being
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {healingServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="royal-card h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl royal-font text-gray-800">{service.title}</CardTitle>
                    <CardDescription className="elegant-font text-gray-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold royal-font text-amber-600 mb-4">
                        {loading ? "Loading..." : getPriceById(servicePrices, service.priceId)}
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full royal-button" asChild>
                      <Link href="/contact">
                        Book Session
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl font-bold royal-font mb-6 text-white">Ready to Begin Your Journey?</h2>
            <p className="text-xl text-amber-100 elegant-font mb-8 max-w-2xl mx-auto">
              Take the first step towards understanding your cosmic blueprint and unlocking your true potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50 font-semibold px-8 py-3" asChild>
                <Link href="/contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Consultation
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-amber-600 font-semibold px-8 py-3 bg-transparent"
                asChild
              >
                <Link href="/about">
                  <Users className="w-5 h-5 mr-2" />
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
