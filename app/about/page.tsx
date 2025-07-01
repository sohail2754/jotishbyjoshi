"use client"

import { motion } from "framer-motion"
import { Award, BookOpen, Heart, Users, Star, Crown, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const credentials = [
  {
    title: "Certified Vedic Astrologer",
    year: "2008",
    icon: <Award className="w-8 h-8" />,
    description: "Traditional Jyotish certification",
  },
  {
    title: "Spiritual Counselor",
    year: "2012",
    icon: <Heart className="w-8 h-8" />,
    description: "Holistic healing practitioner",
  },
  {
    title: "Astrology Teacher",
    year: "2015",
    icon: <BookOpen className="w-8 h-8" />,
    description: "Professional educator certification",
  },
  {
    title: "Remedial Astrology Expert",
    year: "2018",
    icon: <Users className="w-8 h-8" />,
    description: "Specialized in Vedic remedies",
  },
]

const timeline = [
  {
    year: "Early Years",
    event: "Spiritual Awakening",
    description:
      "From a young age, I was spiritually inclined, asking profound questions about life, existence, and the cosmic order that governs our destinies.",
    icon: "☽",
  },
  {
    year: "Challenging Period",
    event: "Journey into Darkness",
    description:
      "During one of life's most challenging periods, I found myself in a place of darkness and uncertainty, desperately searching for light and meaning.",
    icon: "♄",
  },
  {
    year: "Self-Discovery",
    event: "Path of Self-Learning",
    description:
      "Too shy to approach an astrologer directly, I embarked on the transformative path of self-learning, diving deep into ancient Vedic texts.",
    icon: "☿",
  },
  {
    year: "Transformation",
    event: "Finding the Light",
    description:
      "Astrology became the guiding light that illuminated my path when I needed it most, providing answers, clarity, and profound purpose.",
    icon: "☉",
  },
  {
    year: "Present",
    event: "Sharing the Light",
    description:
      "Today, I am dedicated to sharing this transformative light with others through authentic Vedic astrology education and personalized guidance.",
    icon: "♃",
  },
]

const achievements = [
  { number: "15+", label: "Years of Experience", description: "Dedicated practice in Vedic astrology" },
  { number: "10,000+", label: "Consultations Given", description: "Lives transformed through guidance" },
  { number: "2,500+", label: "Students Taught", description: "Astrology enthusiasts trained" },
  { number: "25+", label: "Countries Served", description: "Global reach and impact" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 text-gray-900">
      {/* Hero Section */}
      <section className="royal-section celestial-bg">
        <div className="royal-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
                <Crown className="w-16 h-16 text-amber-700" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 royal-font royal-gold-text">My Astrology Journey</h1>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto elegant-font leading-relaxed">
              A transformative journey through the ancient wisdom of Vedic astrology, from personal darkness to
              enlightenment, now dedicated to guiding souls worldwide on their spiritual path.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col xl:flex-row items-center gap-16"
          >
            <div className="xl:w-1/2">
              <div className="relative">
                <div className="absolute -inset-8 border-2 border-amber-300 rounded-full opacity-30" />
                <div className="absolute -inset-12 border border-amber-200 rounded-full opacity-20" />
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Joshi - Vedic Astrology Master"
                  width={600}
                  height={600}
                  className="rounded-full border-4 border-amber-400 shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full p-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <div className="xl:w-1/2 space-y-8">
              <div className="prose prose-xl max-w-none">
                <p className="text-xl text-gray-700 mb-8 leading-relaxed elegant-font">
                  My journey into astrology began during one of the most challenging periods of my life. At a time when
                  I found myself in a place of darkness and uncertainty, I was searching for light and meaning. From a
                  young age, I had always been spiritually inclined, and this innate spirituality naturally drew me
                  towards the ancient wisdom of astrology.
                </p>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed elegant-font">
                  Despite my curiosity, I was too shy to approach an astrologer directly. Instead, I decided to embark
                  on the path of self-learning. My inquisitive nature, which had always prompted me to ask profound
                  questions—such as "Why is a person born in a particular body?", "Who am I?", "Are our lives governed
                  by a higher power?"—found direction through the study of astrology.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed elegant-font">
                  Astrology became the guiding light that illuminated my path when I needed it most. It provided me with
                  answers, clarity, and a sense of purpose. Today, having experienced the transformative power of
                  astrology firsthand, I am dedicated to sharing this light with others through authentic Vedic
                  teachings and personalized guidance.
                </p>
              </div>
            </div>
          </motion.div>
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
            <h2 className="text-4xl font-bold mb-4 royal-font royal-gold-text">Journey Milestones</h2>
            <p className="text-xl text-gray-600 elegant-font">Transforming lives through authentic Vedic wisdom</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <Card className="royal-card h-full p-8">
                  <div className="text-5xl font-bold royal-font royal-gold-text mb-4">{achievement.number}</div>
                  <h3 className="text-xl font-bold mb-2 royal-font text-gray-800">{achievement.label}</h3>
                  <p className="text-gray-600 elegant-font">{achievement.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="royal-section bg-gradient-to-b from-amber-50 to-white astro-bg">
        <div className="royal-container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-20 royal-font royal-gold-text"
          >
            Spiritual Evolution Timeline
          </motion.h2>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-600"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative flex items-center mb-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                  <Card className="royal-card">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-3xl">{item.icon}</div>
                        <div>
                          <div className="text-2xl font-bold text-amber-600 royal-font">{item.year}</div>
                          <h3 className="text-xl font-semibold text-gray-800 royal-font">{item.event}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 elegant-font leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </motion.div>
            ))}
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
