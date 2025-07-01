"use client"

import { motion } from "framer-motion"
import { Star, BookOpen, Users, Award, Heart, Crown, Sparkles, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const achievements = [
  {
    icon: Users,
    number: "10,000+",
    label: "Students Worldwide",
    description: "Taught authentic Vedic astrology",
  },
  {
    icon: Star,
    number: "15+",
    label: "Years Experience",
    description: "In Vedic astrology practice",
  },
  {
    icon: BookOpen,
    number: "50+",
    label: "Ancient Texts",
    description: "Studied and mastered",
  },
  {
    icon: Award,
    number: "25+",
    label: "Countries",
    description: "Students from around the globe",
  },
]

const expertise = [
  {
    title: "Birth Chart Analysis",
    description: "Deep understanding of planetary positions and their impact on life events",
    icon: "☉",
  },
  {
    title: "Predictive Astrology",
    description: "Accurate timing of life events using Dasha systems and transits",
    icon: "☽",
  },
  {
    title: "Remedial Measures",
    description: "Traditional Vedic remedies including mantras, gemstones, and poojas",
    icon: "♃",
  },
  {
    title: "Marriage Compatibility",
    description: "Comprehensive Guna Milan and relationship harmony analysis",
    icon: "♀",
  },
  {
    title: "Career Guidance",
    description: "Professional path analysis and business timing predictions",
    icon: "♂",
  },
  {
    title: "Spiritual Healing",
    description: "Chakra balancing and energy healing for holistic wellness",
    icon: "♆",
  },
]

const journey = [
  {
    year: "2008",
    title: "Spiritual Awakening",
    description:
      "Began studying Vedic astrology during a challenging period, finding solace and direction in ancient wisdom.",
    icon: "☽",
  },
  {
    year: "2012",
    title: "Traditional Training",
    description:
      "Completed intensive study of classical texts including Brihat Parashara Hora Shastra and Jaimini Sutras.",
    icon: "♄",
  },
  {
    year: "2015",
    title: "Professional Practice",
    description:
      "Started offering consultations and witnessed the transformative power of accurate astrological guidance.",
    icon: "☿",
  },
  {
    year: "2018",
    title: "Teaching Journey",
    description: "Launched online classes to share authentic Vedic astrology knowledge with students worldwide.",
    icon: "☉",
  },
  {
    year: "2020",
    title: "Digital Expansion",
    description: "Expanded online presence to reach and help more people during global challenges.",
  },
  {
    year: "2024",
    title: "Continued Growth",
    description: "Now serving 10,000+ students across 25+ countries with comprehensive astrology education.",
    icon: "♃",
  },
]

const timeline = [
  {
    year: "2008",
    event: "Spiritual Awakening",
    description:
      "Began studying Vedic astrology during a challenging period, finding solace and direction in ancient wisdom.",
  },
  {
    year: "2012",
    event: "Traditional Training",
    description:
      "Completed intensive study of classical texts including Brihat Parashara Hora Shastra and Jaimini Sutras.",
  },
  {
    year: "2015",
    event: "Professional Practice",
    description:
      "Started offering consultations and witnessed the transformative power of accurate astrological guidance.",
  },
  {
    year: "2018",
    event: "Teaching Journey",
    description: "Launched online classes to share authentic Vedic astrology knowledge with students worldwide.",
  },
  {
    year: "2020",
    event: "Digital Expansion",
    description: "Expanded online presence to reach and help more people during global challenges.",
  },
  {
    year: "2024",
    event: "Continued Growth",
    description: "Now serving 10,000+ students across 25+ countries with comprehensive astrology education.",
  },
]

const credentials = [
  {
    title: "Vedic Astrology Master",
    year: "2012",
    description:
      "Completed intensive study of classical texts including Brihat Parashara Hora Shastra and Jaimini Sutras.",
    icon: "☉",
  },
  {
    title: "Professional Astrologer",
    year: "2015",
    description:
      "Started offering consultations and witnessed the transformative power of accurate astrological guidance.",
    icon: "☽",
  },
  {
    title: "Online Astrology Teacher",
    year: "2018",
    description: "Launched online classes to share authentic Vedic astrology knowledge with students worldwide.",
    icon: "♄",
  },
  {
    title: "Global Astrology Educator",
    year: "2024",
    description: "Now serving 10,000+ students across 25+ countries with comprehensive astrology education.",
    icon: "♃",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 text-gray-900">
      {/* Hero Section */}
      <section className="royal-section celestial-bg pt-24 md:pt-32">
        <div className="royal-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 text-lg royal-font">
                  Vedic Astrology Master
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 royal-font royal-gold-text">Meet Jyotish Joshi</h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-8 elegant-font leading-relaxed">
                A journey from darkness to light, guided by the ancient wisdom of Vedic astrology. Now dedicated to
                illuminating paths for thousands of souls worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="royal-button text-white px-8 py-3" asChild>
                  <Link href="/contact">Book Consultation</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-amber-500 text-amber-700 hover:bg-amber-50 px-8 py-3 bg-transparent"
                  asChild
                >
                  <Link href="/classes">Join Classes</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full blur-3xl opacity-20"></div>
                <Image
                  src="/placeholder.svg?height=400&width=400&text=Jyotish+Joshi"
                  alt="Jyotish Joshi - Vedic Astrology Master"
                  width={400}
                  height={400}
                  className="relative z-10 rounded-full border-4 border-amber-300 shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full flex items-center justify-center z-20">
                  <Star className="w-12 h-12 text-amber-800" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="royal-section bg-white">
        <div className="royal-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 royal-font royal-gold-text">Achievements & Impact</h2>
            <p className="text-xl text-gray-600 elegant-font">Transforming lives through authentic Vedic wisdom</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <Card className="royal-card text-center h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold royal-font royal-gold-text mb-2">{achievement.number}</h3>
                    <h4 className="text-lg font-semibold royal-font text-gray-800 mb-2">{achievement.label}</h4>
                    <p className="text-gray-600 elegant-font text-sm">{achievement.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="royal-section bg-gradient-to-b from-amber-50 to-white astro-bg">
        <div className="royal-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 royal-font royal-gold-text">My Journey</h2>
            <p className="text-xl text-gray-600 elegant-font max-w-3xl mx-auto">
              From personal transformation to guiding thousands - a story of finding light in ancient wisdom
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-xl mb-12"
            >
              <div className="flex items-center mb-6">
                <Heart className="w-8 h-8 text-amber-600 mr-4" />
                <h3 className="text-2xl font-bold royal-font text-gray-800">The Beginning</h3>
              </div>
              <p className="text-lg text-gray-700 elegant-font leading-relaxed mb-6">
                My journey into astrology began during one of the most challenging periods of my life. At a time when I
                found myself in a place of darkness and uncertainty, I was searching for light and meaning. From a young
                age, I had always been spiritually inclined, and this innate spirituality naturally drew me towards the
                ancient wisdom of astrology.
              </p>
              <p className="text-lg text-gray-700 elegant-font leading-relaxed">
                Through years of dedicated study of ancient texts like Brihat Parashara Hora Shastra, Jaimini Sutras,
                and other classical works, I learned that astrology is not just about predictions—it's about
                understanding the cosmic blueprint of our lives and using that knowledge for spiritual growth and
                practical guidance.
              </p>
            </motion.div>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className="flex-1">
                    <Card className="royal-card">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-3">
                          <Badge className="bg-amber-600 text-white px-3 py-1 royal-font mr-3">{item.year}</Badge>
                          <h4 className="text-xl font-bold royal-font text-gray-800">{item.event}</h4>
                        </div>
                        <p className="text-gray-600 elegant-font">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-8 flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="royal-section bg-white">
        <div className="royal-container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16 royal-font royal-gold-text"
          >
            Professional Credentials & Expertise
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {credentials.map((credential, index) => (
              <motion.div
                key={credential.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <Card className="royal-card h-full text-center">
                  <CardContent className="p-8">
                    <div className="text-amber-600 mb-6 flex justify-center">{credential.icon}</div>
                    <h3 className="text-lg font-bold mb-2 royal-font text-gray-800">{credential.title}</h3>
                    <Badge className="bg-amber-100 text-amber-800 font-bold mb-3">{credential.year}</Badge>
                    <p className="text-gray-600 elegant-font text-sm">{credential.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy & Approach Section */}
      <section className="royal-section bg-gradient-to-b from-amber-50 to-white">
        <div className="royal-container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16 royal-font royal-gold-text"
          >
            My Teaching Philosophy & Approach
          </motion.h2>

          <Tabs defaultValue="philosophy" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-amber-100 border-2 border-amber-200 rounded-xl p-2 mb-12">
              <TabsTrigger
                value="philosophy"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-white royal-font font-semibold text-lg py-4"
              >
                Philosophy
              </TabsTrigger>
              <TabsTrigger
                value="methodology"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-white royal-font font-semibold text-lg py-4"
              >
                Methodology
              </TabsTrigger>
              <TabsTrigger
                value="commitment"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-white royal-font font-semibold text-lg py-4"
              >
                Commitment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="philosophy" className="mt-8">
              <Card className="royal-card">
                <CardContent className="p-12">
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mr-6">
                      <Heart className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="text-3xl font-bold royal-font royal-gold-text">Holistic Spiritual Philosophy</h3>
                  </div>
                  <p className="text-xl text-gray-700 leading-relaxed elegant-font mb-6">
                    I believe that astrology is not about predicting a fixed fate, but about understanding the cosmic
                    energies that influence our lives. My approach combines ancient Vedic wisdom with modern
                    psychological insights to provide practical guidance for personal growth and spiritual evolution.
                  </p>
                  <p className="text-xl text-gray-700 leading-relaxed elegant-font">
                    Every soul has a unique journey, and astrology serves as a compass to navigate life's challenges and
                    opportunities with greater awareness, purpose, and divine connection. I emphasize empowerment over
                    dependency, teaching students to become their own spiritual guides.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="methodology" className="mt-8">
              <Card className="royal-card">
                <CardContent className="p-12">
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mr-6">
                      <BookOpen className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="text-3xl font-bold royal-font royal-gold-text">
                      Traditional Yet Accessible Methods
                    </h3>
                  </div>
                  <p className="text-xl text-gray-700 leading-relaxed elegant-font mb-6">
                    Each consultation begins with a detailed birth chart analysis using authentic Vedic techniques
                    passed down through generations. I integrate multiple astrological systems including classical
                    Jyotish, numerology, and remedial astrology to provide a complete picture of your spiritual journey.
                  </p>
                  <p className="text-xl text-gray-700 leading-relaxed elegant-font">
                    My teaching methodology focuses on practical application rather than mere theory. Students learn
                    through real case studies, interactive sessions, and hands-on practice that builds confidence and
                    competence in reading charts and providing meaningful guidance.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="commitment" className="mt-8">
              <Card className="royal-card">
                <CardContent className="p-12">
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mr-6">
                      <Users className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="text-3xl font-bold royal-font royal-gold-text">Lifelong Learning Partnership</h3>
                  </div>
                  <p className="text-xl text-gray-700 leading-relaxed elegant-font mb-6">
                    My commitment extends far beyond individual consultations or course completion. I provide ongoing
                    support, practical remedies, and spiritual practices tailored to each person's unique needs and
                    evolutionary path. Every client and student receives personalized guidance that empowers them to
                    navigate life's challenges with confidence and clarity.
                  </p>
                  <p className="text-xl text-gray-700 leading-relaxed elegant-font">
                    I believe in building long-term relationships with my students and clients, supporting them through
                    various phases of their spiritual journey and personal evolution. This includes lifetime access to
                    course materials, ongoing mentorship opportunities, and a supportive community of fellow seekers.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="royal-section bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="royal-container text-center"
        >
          <div className="royal-card p-16 max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center">
                <Calendar className="w-12 h-12 text-amber-700" />
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-6 royal-font royal-gold-text">Global Spiritual Community</h2>
            <p className="text-2xl text-gray-700 mb-8 elegant-font leading-relaxed">
              All services and classes are conducted online, making authentic Vedic astrology education and guidance
              accessible to seekers worldwide. Join our global community of spiritual learners and practitioners.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold royal-font royal-gold-text mb-2">25+</div>
                <p className="text-gray-700 elegant-font">Countries Served</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold royal-font royal-gold-text mb-2">24/7</div>
                <p className="text-gray-700 elegant-font">Online Availability</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold royal-font royal-gold-text mb-2">100%</div>
                <p className="text-gray-700 elegant-font">Authentic Vedic Methods</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
