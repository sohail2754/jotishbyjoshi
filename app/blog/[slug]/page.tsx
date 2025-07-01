"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Tag, ArrowLeft, Clock, User, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

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

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string)
    }
  }, [params.slug])

  const fetchPost = async (slug: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/blog/${slug}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON")
      }

      const data = await response.json()

      if (data.post) {
        setPost(data.post)
      } else {
        setError("Post not found")
      }
    } catch (error) {
      console.error("Error fetching post:", error)
      setError("Failed to load article")
    } finally {
      setLoading(false)
    }
  }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 elegant-font">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 royal-font">Article Not Found</h1>
          <p className="text-gray-600 elegant-font mb-6">{error || "The article you're looking for doesn't exist."}</p>
          <Button className="royal-button text-white font-semibold" asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 text-gray-900">
      {/* Hero Section */}
      <section className="royal-section pt-24 md:pt-32 pb-12">
        <div className="royal-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Button variant="ghost" className="mb-6 text-amber-700 hover:text-amber-800" asChild>
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold">
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge variant="outline" className="border-amber-400 text-amber-700 font-medium">
                    Featured
                  </Badge>
                )}
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(post.created_at)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {calculateReadTime(post.content)}
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6 royal-font royal-gold-text leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-gray-700 mb-8 elegant-font leading-relaxed">{post.excerpt}</p>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 royal-font">{post.author}</p>
                    <p className="text-sm text-gray-600 elegant-font">Vedic Astrology Master</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-amber-400 text-amber-700 hover:bg-amber-50">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Image */}
      <section className="royal-section py-0">
        <div className="royal-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={post.image_url || "/placeholder.svg"}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="royal-section bg-white">
        <div className="royal-container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="royal-card">
                <CardContent className="p-8 md:p-12">
                  <div className="prose prose-lg max-w-none elegant-font">
                    {post.content.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-amber-200">
                    <h3 className="text-lg font-semibold royal-font text-gray-800 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-amber-100 text-amber-800">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles CTA */}
      <section className="royal-section bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="royal-container text-center"
        >
          <div className="royal-card p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 royal-font royal-gold-text">Explore More Astrological Wisdom</h2>
            <p className="text-xl text-gray-700 mb-8 elegant-font">
              Discover more insights and deepen your understanding of Vedic astrology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="royal-button text-white font-semibold px-8 py-3" asChild>
                <Link href="/blog">Read More Articles</Link>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-amber-500 text-amber-700 hover:bg-amber-50 font-semibold px-8 py-3"
                asChild
              >
                <Link href="/contact">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
