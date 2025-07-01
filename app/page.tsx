"use client"

import { motion } from "framer-motion"
import { Star, BookOpen, Users, Clock, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

const zodiacSigns = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"]
const planetarySymbols = ["☉", "☽", "☿", "♀", "♂", "♃", "♄", "♅", "♆", "♇"]

const astrologyClasses = [
  {
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
    ],
    whoFor: ["Complete beginners to astrology", "Spiritual seekers", "Those interested in self-discovery"],
    benefits: ["Structured curriculum", "Live doubt-clearing sessions", "Certificate upon completion"],
    icon: "♈",
  },
  {
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
    ],
    whoFor: ["Intermediate astrology students", "Aspiring professional astrologers", "Existing practitioners"],
    benefits: ["Professional certification", "Business setup guidance", "Lifetime support"],
    icon: "☉",
  },
  {
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
    ],
    whoFor: ["Practicing astrologers", "Those seeking specialization", "Advanced students"],
    benefits: ["Specialized expertise", "Niche market knowledge", "Higher consultation fees"],
    icon: "♃",
  },
]

const services = [
  {
    title: "Personal Astrology Consultation",
    description: "Comprehensive birth chart analysis with personalized guidance for life's important decisions.",
    icon: <div className="planetary-symbol">☉</div>,
    href: "/services#consultations",
  },
  {
    title: "Pooja & Grah Remedies",
    description: "Sacred ceremonies and planetary remedies performed online to balance cosmic energies.",
    icon: <div className="planetary-symbol">♃</div>,
    href: "/services#poojas",
  },
  {
    title: "Spiritual Healing Sessions",
    description: "Energy healing and chakra balancing sessions for holistic well-being and spiritual growth.",
    icon: <div className="planetary-symbol">☽</div>,
    href: "/services#healing",
  },
]

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    text: "The Foundation course completely transformed my understanding of astrology. Joshi ji's teaching method is exceptional and the live sessions are incredibly valuable.",
    rating: 5,
    course: "Foundation of Vedic Astrology",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Rajesh Kumar",
    location: "Delhi, India",
    text: "After completing the Advanced course, I started my own astrology practice. The business guidance and certification helped me establish credibility with clients.",
    rating: 5,
    course: "Advanced Predictive Astrology",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Sarah Johnson",
    location: "California, USA",
    text: "Learning astrology online from India was seamless. The specialized courses gave me deep insights into relationship astrology that I use daily.",
    rating: 5,
    course: "Specialized Astrology",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Amit Patel",
    location: "London, UK",
    text: "The consultation was incredibly accurate and insightful. The remedies suggested have brought positive changes in my career and relationships.",
    rating: 5,
    course: "Personal Consultation",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Meera Reddy",
    location: "Bangalore, India",
    text: "The pooja ceremony conducted online was beautiful and powerful. I could feel the positive energy and have noticed significant improvements in my life.",
    rating: 5,
    course: "Pooja & Remedies",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 celestial-bg">
        <div className="text-center max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-12"
          >
            {/* Static Royal Logo */}
            <div className="flex justify-center mb-8">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Static outer circle with zodiac signs */}
                <div
                  className="zodiac-wheel w-60 h-60 md:w-80 md:h-80"
                  style={{
                    background: `conic-gradient(
                      from 0deg,
                      #ffd700 0deg 30deg,
                      #ffa500 30deg 60deg,
                      #ff8c00 60deg 90deg,
                      #daa520 90deg 120deg,
                      #b8860b 120deg 150deg,
                      #cd853f 150deg 180deg,
                      #deb887 180deg 210deg,
                      #f4a460 210deg 240deg,
                      #d2691e 240deg 270deg,
                      #a0522d 270deg 300deg,
                      #8b4513 300deg 330deg,
                      #654321 330deg 360deg
                    )`,
                  }}
                >
                  {/* Static zodiac signs around the circle */}
                  {zodiacSigns.map((symbol, i) => (
                    <motion.div
                      key={i}
                      className="zodiac-symbol absolute text-lg md:text-2xl font-bold text-amber-900"
                      style={{
                        transform: `rotate(${i * 30}deg) translateY(-110px) rotate(-${i * 30}deg)`,
                        left: "50%",
                        top: "50%",
                        marginLeft: "-8px",
                        marginTop: "-8px",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {symbol}
                    </motion.div>
                  ))}
                </div>

                {/* Static inner circle with planetary symbols */}
                <div className="absolute inset-6 md:inset-8 border-2 border-amber-300 rounded-full">
                  {planetarySymbols.slice(0, 8).map((symbol, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-base md:text-xl font-bold text-amber-700"
                      style={{
                        transform: `rotate(${i * 45}deg) translateY(-85px) rotate(-${i * 45}deg)`,
                        left: "50%",
                        top: "50%",
                        marginLeft: "-8px",
                        marginTop: "-8px",
                      }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      {symbol}
                    </motion.div>
                  ))}
                </div>

                {/* Static central sun symbol */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full flex items-center justify-center text-2xl md:text-4xl text-amber-900 shadow-lg border-4 border-amber-200 animate-pulse">
                    ☉
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 royal-font royal-gold-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              JotishByJoshi
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-2xl md:text-3xl mb-8 text-gray-700 elegant-font font-medium text-reveal"
            >
              Unlock the Wisdom of the Stars—Master Vedic Astrology & Transform Lives
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button
              size="lg"
              className="royal-button text-white px-12 py-4 rounded-full text-lg font-semibold royal-font shadow-xl button-hover-effect"
              asChild
            >
              <Link href="/classes">Explore Astrology Classes</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-amber-500 text-amber-700 hover:bg-amber-50 px-12 py-4 rounded-full text-lg font-semibold royal-font button-hover-effect bg-transparent"
              asChild
            >
              <Link href="/contact">Book Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="royal-section bg-gradient-to-b from-white to-amber-50">
        <div className="royal-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center animate-pulse">
                <Star className="w-12 h-12 text-amber-700" />
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 royal-font royal-gold-text text-reveal">
              Master the Ancient Science of Jyotish
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-5xl mx-auto elegant-font text-reveal-delay">
              My journey into astrology began during one of the most challenging periods of my life, when I was
              searching for light and meaning. Today, having experienced the transformative power of Vedic astrology
              firsthand, I am dedicated to sharing this ancient wisdom through comprehensive courses and personalized
              guidance that empowers you to read the cosmic blueprint of life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Classes Preview */}
      <section className="royal-section bg-white astro-bg">
        <div className="royal-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="flex justify-center items-center mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <BookOpen className="w-16 h-16 text-amber-600 mr-4" />
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-bold royal-font royal-gold-text">Astrology Classes</h2>
            </div>
            <p className="text-2xl text-gray-600 elegant-font max-w-4xl mx-auto">
              Transform your life and career with authentic Vedic astrology education.
            </p>
            <div className="royal-divider"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {astrologyClasses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group"
              >
                <Card className="royal-card h-full card-hover-effect">
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className="flex justify-center mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center text-4xl">
                        {course.icon}
                      </div>
                    </motion.div>
                    <Badge
                      variant="secondary"
                      className="mb-3 bg-amber-100 text-amber-800 font-semibold px-4 py-1 badge-animate"
                    >
                      {course.level}
                    </Badge>
                    <CardTitle className="text-2xl font-bold royal-font text-gray-800 mb-2">{course.title}</CardTitle>
                    <p className="text-gray-600 elegant-font text-lg leading-relaxed">{course.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <motion.div
                        className="bg-amber-50 rounded-lg p-3"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Clock className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                        <div className="font-semibold text-gray-800">{course.duration}</div>
                      </motion.div>
                      <motion.div
                        className="bg-amber-50 rounded-lg p-3"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Users className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                        <div className="font-semibold text-gray-800">{course.students}</div>
                      </motion.div>
                    </div>

                    <Button
                      className="w-full royal-button text-white font-semibold py-3 royal-font text-lg button-hover-effect"
                      asChild
                    >
                      <Link href="/classes">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Button
              size="lg"
              className="royal-button text-white px-12 py-4 rounded-full text-xl font-bold royal-font shadow-xl button-hover-effect"
              asChild
            >
              <Link href="/classes">View All Classes</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Other Services */}
      <section className="royal-section bg-gradient-to-b from-amber-50 to-white">
        <div className="royal-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 royal-font royal-gold-text">Additional Services</h2>
            <p className="text-xl text-gray-600 elegant-font">Personalized guidance and spiritual solutions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="royal-card h-full text-center card-hover-effect">
                  <CardContent className="p-8">
                    <motion.div
                      className="mb-6 flex justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-4 royal-font text-gray-800">{service.title}</h3>
                    <p className="text-gray-600 mb-6 elegant-font leading-relaxed">{service.description}</p>
                    <Button className="royal-button text-white font-semibold px-8 py-2 button-hover-effect" asChild>
                      <Link href={service.href}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="royal-section bg-white astro-bg">
        <div className="royal-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 royal-font royal-gold-text">Student Success Stories</h2>
            <p className="text-xl text-gray-600 elegant-font">
              Transformative experiences from our astrology community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <Card className="royal-card h-full testimonial-card">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={60}
                          height={60}
                          className="rounded-full border-2 border-amber-300"
                        />
                      </motion.div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-800 royal-font">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                        <div className="flex mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 * i }}
                            >
                              <Star className="w-4 h-4 text-amber-500 fill-current" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="mb-3 border-amber-300 text-amber-700 badge-animate">
                      {testimonial.course}
                    </Badge>
                    <p className="text-gray-600 italic elegant-font">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="royal-section bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="royal-container text-center"
        >
          <div className="royal-card p-16 max-w-5xl mx-auto">
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center animate-pulse">
                <Crown className="w-16 h-16 text-amber-700" />
              </div>
            </motion.div>
            <h2 className="text-5xl font-bold mb-6 royal-font royal-gold-text text-reveal">
              Begin Your Astrological Journey Today
            </h2>
            <p className="text-2xl text-gray-700 mb-12 elegant-font leading-relaxed text-reveal-delay">
              Join thousands of students who have transformed their lives through the ancient wisdom of Vedic astrology.
              Master the cosmic sciences and unlock your highest potential.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Button
                size="lg"
                className="royal-button text-white px-16 py-6 rounded-full text-xl font-bold royal-font shadow-2xl button-hover-effect"
                asChild
              >
                <Link href="/classes">Explore Classes</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-amber-500 text-amber-700 hover:bg-amber-50 px-16 py-6 rounded-full text-xl font-bold royal-font button-hover-effect bg-transparent"
                asChild
              >
                <Link href="/contact">Book Consultation</Link>
              </Button>
            </motion.div>
            <motion.p
              className="text-lg text-gray-600 mt-8 elegant-font font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              ✦ All classes conducted online ✦ Global accessibility ✦ Traditional Vedic methods ✦
            </motion.p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
