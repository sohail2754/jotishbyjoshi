import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPostBySlug } from "@/lib/database" // Assuming you have this function
import { Calendar, Tag, ArrowLeft, Clock, User, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

type BlogPostPageProps = {
  params: {
    slug: string
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.created_at,
      authors: [post.author],
      images: [
        {
          url: post.image_url || "/placeholder.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image_url || "/placeholder.jpg"],
    },
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
  const wordCount = content?.split(" ").length || 0
  const readTime = Math.ceil(wordCount / wordsPerMinute)
  return `${readTime} min read`
}

// This is now a Server Component for maximum performance
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound() // Triggers the not-found.tsx page
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 text-gray-900">
      <section className="royal-section pt-24 md:pt-32 pb-12">
        <div className="royal-container">
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
              <Button
                variant="outline"
                size="sm"
                className="border-amber-400 text-amber-700 hover:bg-amber-50 bg-transparent"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="royal-section py-0">
        <div className="royal-container">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={post.image_url || "/placeholder.svg"}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-64 md:h-96 object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="royal-section bg-white">
        <div className="royal-container">
          <div className="max-w-4xl mx-auto">
            <Card className="royal-card">
              <CardContent className="p-8 md:p-12">
                <div
                  className="prose prose-lg max-w-none elegant-font text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg"
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
                />

                {post.tags && post.tags.length > 0 && (
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
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
