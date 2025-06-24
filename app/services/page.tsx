"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Clock, Crown, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ServicePrice {
  id: string
  service_name: string
  price: string
  original_price?: string
}

const consultationServices = [
  {
    id: "birth-chart",
    title: "Complete Birth Chart Analysis",
    description: "Comprehensive natal chart reading with detailed life guidance and predictions",
    duration: "90 minutes",
    features: [
      "Detailed birth chart analysis",
      "Life path and purpose guidance",
      "Career and profession insights",
      "Relationship compatibility analysis",
      "Health and wellness predictions",
      "Recorded session for reference",
    ],
    whoFor: ["Anyone seeking life clarity", "Individuals at crossroads", "Those planning major decisions"],
    benefits: ["Deep self-understanding", "Clear life direction", "Practical remedies"],
    icon: "☉",
    popular: true,
  },
  {
    id: "relationship",
    title: "Relationship & Marriage Consultation",
    description: "Specialized analysis for love, marriage, and relationship compatibility",
    duration: "75 minutes",
    features: [
      "Compatibility analysis (Guna Milan)",
      "Relationship timing predictions",
      "Marriage obstacles identification",
      "Partner characteristics analysis",
      "Remedies for relationship harmony",
      "Future relationship prospects",
    ],
    whoFor: ["Couples planning marriage", "Those seeking life partner", "Relationship challenges"],
    benefits: ["Relationship clarity", "Marriage timing", "Harmony solutions"],
    icon: "♀",
  },
  {
    id: "career",
    title: "Career & Business Astrology",
    description: "Professional guidance for career growth, business success, and financial prosperity",
    duration: "75 minutes",
    features: [
      "Career path analysis",
      "Business timing and partnerships",
      "Financial prosperity periods",
      "Professional growth opportunities",
      "Investment and property guidance",
      "Success strategies and remedies",
    ],
    whoFor: ["Professionals seeking growth", "Entrepreneurs and business owners", "Career transition phases"],
    benefits: ["Career acceleration", "Business success", "Financial growth"],
    icon: "♃",
  },
  {
    id: "health",
    title: "Health & Wellness Reading",
    description: "Astrological insights into health patterns, wellness, and healing guidance",
    duration: "60 minutes",
    features: [
      "Health pattern analysis",
      "Disease prediction and prevention",
      "Healing and recovery timing",
      "Lifestyle recommendations",
      "Dietary and wellness guidance",
      "Remedial measures for health",
    ],
    whoFor: ["Health-conscious individuals", "Those with chronic conditions", "Wellness seekers"],
    benefits: ["Health awareness", "Prevention strategies", "Healing acceleration"],
    icon: "☽",
  },
]

const healingSessions = [
  {
    id: "chakra-healing",
    title: "Chakra Balancing & Energy Healing",
    description: "Comprehensive energy healing session to balance chakras and restore harmony",
    duration: "60 minutes",
    features: [
      "Complete chakra assessment",
      "Energy blockage removal",
      "Guided healing meditation",
      "Personalized mantras",
      "Crystal healing guidance",
      "Follow-up care instructions",
    ],
    icon: "♆",
  },
  {
    id: "spiritual-counseling",
    title: "Spiritual Counseling Session",
    description: "Deep spiritual guidance for life purpose, karmic patterns, and soul evolution",
    duration: "75 minutes",
    features: [
      "Life purpose clarity",
      "Karmic pattern analysis",
      "Spiritual block removal",
      "Meditation techniques",
      "Soul evolution guidance",
      "Spiritual practice recommendations",
    ],
    icon: "♇",
  },
  {
    id: "past-life",
    title: "Past Life Regression Therapy",
    description: "Explore past lives to understand current life patterns and heal karmic wounds",
    duration: "90 minutes",
    features: [
      "Past life exploration",
      "Karmic debt understanding",
      "Soul lesson identification",
      "Healing integration",
      "Life pattern clarity",
      "Spiritual liberation",
    ],
    icon: "♄",
  },
]

const poojaServices = [
  {
    id: "grah-shanti",
    title: "Personalized Grah Shanti Pooja",
    description: "Customized planetary peace rituals based on your birth chart analysis",
    duration: "2-3 hours",
    features: [
      "Birth chart analysis for doshas",
      "Customized ritual design",
      "Sacred mantras and offerings",
      "Live online participation",
      "Blessed prasadam delivery",
      "Video recording provided",
    ],
    icon: "♂",
  },
  {
    id: "navagraha",
    title: "Navagraha Pooja & Remedies",
    description: "Complete nine-planet worship for overall life balance and prosperity",
    duration: "3-4 hours",
    features: [
      "Nine planetary worship",
      "Vedic fire ceremony (Havan)",
      "Gemstone recommendations",
      "Yantra energization",
      "Mantra initiation",
      "Ongoing remedy guidance",
    ],
    icon: "☿",
  },
  {
    id: "monthly-pooja",
    title: "Monthly Pooja Subscription",
    description: "Regular monthly poojas for continuous blessings and spiritual protection",
    duration: "Monthly",
    features: [
      "Weekly mini poojas",
      "Monthly detailed reports",
      "Personalized mantras",
      "Priority consultation booking",
      "Spiritual guidance calls",
      "Festival special ceremonies",
    ],
    icon: "♅",
  },
]

function ServiceSection({
  title,
  services,
  icon,
  id,
  description,
  servicePrices,
}: {
  title: string
  services: any[]
  icon: React.ReactNode
  id: string
  description: string
  servicePrices: ServicePrice[]
}) {
  const getServicePrice = (serviceId: string) => {
    const priceData = servicePrices.find((p) => p.service_name === serviceId)
    return priceData || { price: "Contact for Price", original_price: null }
  }

  return (
    <section id={id} className="royal-section bg-white astro-bg">
      <div className="royal-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center items-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center mr-6">
              {icon}
            </div>
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-bold royal-font royal-gold-text">{title}</h2>
              <p className="text-xl text-gray-600 elegant-font mt-2">{description}</p>
            </div>
          </div>
          <div className="royal-divider"></div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:gap-10 px-2 md:px-0">
          {services.map((service, index) => {
            const priceData = getServicePrice(service.id)

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative"
              >
                {service.popular && (
                  <Badge className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1 royal-font">
                    Most Popular
                  </Badge>
                )}

                <Card className="royal-card h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center text-3xl">
                        {service.icon}
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold royal-font text-gray-800 mb-2">{service.title}</CardTitle>
                    <p className="text-gray-600 elegant-font text-lg leading-relaxed">{service.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Pricing */}
                    <div className="text-center bg-amber-50 rounded-lg p-4">
                      <div className="flex items-center justify-center space-x-3">
                        <Clock className="w-5 h-5 text-amber-600" />
                        <span className="font-semibold text-gray-800">{service.duration}</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-amber-600 royal-font">{priceData.price}</span>
                        {priceData.original_price && (
                          <span className="text-lg text-gray-500 line-through ml-2">{priceData.original_price}</span>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3 royal-font">What's Included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature: string, i: number) => (
                          <li key={i} className="flex items-start text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full royal-button text-white font-semibold py-3 royal-font text-lg" asChild>
                      <Link href="/contact">Book Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>([])

  useEffect(() => {
    // Fetch service prices from API
    const fetchPrices = async () => {
      try {
        const response = await fetch("/api/service-prices")
        if (response.ok) {
          const data = await response.json()
          setServicePrices(data.prices || [])
        }
      } catch (error) {
        console.error("Error fetching service prices:", error)
      }
    }

    fetchPrices()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 text-gray-900">
      {/* Hero Section */}
      <section className="royal-section celestial-bg">
        <div className="royal-container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
                <Crown className="w-12 h-12 md:w-16 md:h-16 text-amber-700" />
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 royal-font royal-gold-text">
              Professional Astrology Services
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 max-w-4xl mx-auto mb-6 md:mb-8 elegant-font leading-relaxed px-4">
              Comprehensive Vedic astrology services combining ancient wisdom with modern insights. Transform your life
              through personalized guidance and spiritual solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <ServiceSection
        title="Consultation Services"
        services={consultationServices}
        icon={<Star className="w-12 h-12 text-amber-700" />}
        id="consultations"
        description="Personalized birth chart analysis and life guidance"
        servicePrices={servicePrices}
      />

      <ServiceSection
        title="Healing & Spiritual Sessions"
        services={healingSessions}
        icon={<div className="text-4xl">☽</div>}
        id="healing"
        description="Energy healing and spiritual counseling for holistic wellness"
        servicePrices={servicePrices}
      />

      <ServiceSection
        title="Poojas & Vedic Remedies"
        services={poojaServices}
        icon={<div className="text-4xl">♃</div>}
        id="poojas"
        description="Sacred ceremonies and planetary remedies for cosmic harmony"
        servicePrices={servicePrices}
      />
    </div>
  )
}
