"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, Tag, ArrowRight, BookOpen, Crown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import NewsletterForm from "@/components/NewsletterForm"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  image_url: string
  featured: boolean
  created_at: string
}

const categories = [
  "All",
  "Astrology Basics",
  "Planetary Transits",
  "Healing",
  "Predictions",
  "Spiritual Practice",
  "Remedies",
]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    fetchPosts()
  }, [searchTerm, selectedCategory])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)
      if (selectedCategory !== "All") params.append("category", selectedCategory)

      const response = await fetch(`/api/blog?${params}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON")
      }

      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error("Error fetching posts:", error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const featuredPosts = posts.filter((post) => post.featured)
  const regularPosts = posts.filter((post) => !post.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(" ").length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min read`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 text-gray-900">
      {/* Hero Section */}
      <section className="royal-section celestial-bg pt-24 md:pt-32">
        <div className="royal-container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-24 md:w-32 h-24 md:h-32 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center animate-pulse">
                <BookOpen className="w-12 md:w-16 h-12 md:h-16 text-amber-700" />
              </div>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 royal-font royal-gold-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Vedic Astrology Wisdom
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 elegant-font leading-relaxed px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Explore the profound depths of Vedic astrology through authentic teachings, practical insights, and
              ancient wisdom for modern living.
            </motion.p>
            <motion.div
              className="flex justify-center space-x-2 md:space-x-4 text-2xl md:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {["♈", "♉", "♊", "♋", "♌", "♍"].map((symbol, i) => (
                <motion.span
                  key={i}
                  className="text-amber-600 planetary-symbol"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  {symbol}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 md:py-12 px-4 bg-white">
        <div className="royal-container">
          <motion.div
            className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
              <Input
                placeholder="Search articles on astrology, planets, remedies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 text-base md:text-lg border-2 border-amber-200 focus:border-amber-400 rounded-xl bg-amber-50/50 form-input"
              />
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs md:text-sm button-hover-effect ${
                    selectedCategory === category
                      ? "royal-button text-white font-semibold"
                      : "border-2 border-amber-400 text-amber-700 hover:bg-amber-50 font-semibold"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="royal-section">
          <div className="royal-container text-center">
            <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4 loading-spinner" />
            <p className="text-gray-600 elegant-font">Loading articles...</p>
          </div>
        </section>
      )}

      {/* Featured Posts */}
      {!loading && featuredPosts.length > 0 && (
        <section className="royal-section bg-gradient-to-b from-white to-amber-50">
          <div className="royal-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16"
            >
              <div className="flex justify-center items-center mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Crown className="w-8 md:w-12 h-8 md:h-12 text-amber-600 mr-4" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold royal-font royal-gold-text">Featured Articles</h2>
              </div>
              <p className="text-lg md:text-xl text-gray-600 elegant-font">
                Essential readings for your astrological journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="royal-card h-full overflow-hidden group card-hover-effect">
                    <div className="relative overflow-hidden image-hover-effect">
                      <Image
                        src={post.image_url || "/placeholder.svg"}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold badge-animate">
                        Featured
                      </Badge>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-sm font-medium text-gray-700">{calculateReadTime(post.content)}</span>
                      </div>
                    </div>
                    <CardHeader className="p-4 md:p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.created_at)}
                        </span>
                        <Badge
                          variant="outline"
                          className="border-amber-400 text-amber-700 font-medium text-xs badge-animate"
                        >
                          {post.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg md:text-xl font-bold royal-font text-gray-800 group-hover:text-amber-700 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0">
                      <p className="text-gray-600 elegant-font mb-4 line-clamp-3 text-sm md:text-base">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-amber-100 text-amber-800 text-xs badge-animate"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-amber-400 text-amber-700 hover:bg-amber-50 group font-semibold text-sm md:text-base button-hover-effect bg-transparent"
                        asChild
                      >
                        <Link href={`/blog/${post.slug}`}>
                          Read Full Article
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      {!loading && regularPosts.length > 0 && (
        <section className="royal-section bg-white astro-bg">
          <div className="royal-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 royal-font royal-gold-text">Latest Articles</h2>
              <p className="text-lg md:text-xl text-gray-600 elegant-font">
                Discover more insights into Vedic astrology
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="royal-card h-full overflow-hidden group card-hover-effect">
                    <div className="relative overflow-hidden image-hover-effect">
                      <Image
                        src={post.image_url || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="w-full h-32 md:h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-sm font-medium text-gray-700">{calculateReadTime(post.content)}</span>
                      </div>
                    </div>
                    <CardHeader className="p-4 md:p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                      <CardTitle className="text-base md:text-lg font-bold royal-font text-gray-800 group-hover:text-amber-700 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0">
                      <p className="text-gray-600 elegant-font mb-4 text-sm line-clamp-2">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <Badge
                          variant="outline"
                          className="border-amber-400 text-amber-700 text-xs font-medium badge-animate"
                        >
                          {post.category}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-amber-700 hover:text-amber-800 p-0 font-semibold text-sm button-hover-effect"
                          asChild
                        >
                          <Link href={`/blog/${post.slug}`}>
                            Read More <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Posts Found */}
      {!loading && posts.length === 0 && (
        <section className="royal-section">
          <div className="royal-container text-center">
            <motion.div
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <BookOpen className="w-16 h-16 text-amber-600 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 royal-font">No Articles Found</h3>
              <p className="text-gray-600 elegant-font mb-6">
                Try adjusting your search terms or browse different categories.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="royal-button text-white font-semibold button-hover-effect"
              >
                View All Articles
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <NewsletterForm />
    </div>
  )
}
