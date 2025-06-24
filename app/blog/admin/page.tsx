"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Save, X, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  tags: string[]
  image: string
  featured: boolean
  published: boolean
}

interface PriceItem {
  id: string
  name: string
  type: "class" | "service"
  price: string
  originalPrice?: string
}

export default function BlogAdminPage() {
  // Mock authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Mock blog posts data
  const initialPosts: BlogPost[] = [
    {
      id: "1",
      title: "Understanding Your Birth Chart: A Beginner's Guide",
      excerpt: "Learn how to read the cosmic blueprint of your life through your birth chart analysis.",
      content:
        "Your birth chart is like a cosmic fingerprint that reveals the unique energies present at the moment of your birth. This comprehensive guide will walk you through the essential elements of chart interpretation, from understanding planetary positions to recognizing significant aspects and their meanings in your life journey.",
      author: "Joshi",
      date: "2024-01-15",
      category: "Astrology Basics",
      tags: ["birth chart", "beginner", "astrology"],
      image: "/placeholder.svg?height=300&width=400",
      featured: true,
      published: true,
    },
    {
      id: "2",
      title: "Mercury Retrograde: Myths vs Reality",
      excerpt: "Debunking common misconceptions about Mercury retrograde and how to navigate it.",
      content:
        "Mercury retrograde often gets blamed for everything from technology failures to communication breakdowns. But what does this astrological phenomenon really mean, and how can we work with its energy constructively? Let's separate fact from fiction and discover practical ways to thrive during these periods.",
      author: "Joshi",
      date: "2024-01-10",
      category: "Planetary Transits",
      tags: ["mercury retrograde", "planets", "transits"],
      image: "/placeholder.svg?height=300&width=400",
      featured: false,
      published: true,
    },
  ]

  // Mock prices data
  const initialPrices: PriceItem[] = [
    { id: "1", name: "foundation", type: "class", price: "₹15,999", originalPrice: "₹19,999" },
    { id: "2", name: "advanced", type: "class", price: "₹25,999", originalPrice: "₹29,999" },
    { id: "3", name: "birth-chart", type: "service", price: "₹2,999", originalPrice: "₹3,999" },
    { id: "4", name: "relationship", type: "service", price: "₹2,499", originalPrice: "₹3,299" },
  ]

  const categories = [
    "Astrology Basics",
    "Planetary Transits",
    "Healing",
    "Predictions",
    "Spiritual Practice",
    "Remedies",
  ]

  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [prices, setPrices] = useState<PriceItem[]>(initialPrices)
  const [isEditing, setIsEditing] = useState(false)
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState<Partial<BlogPost>>({})
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })

  // Price management states
  const [isPriceEditing, setIsPriceEditing] = useState(false)
  const [currentPrice, setCurrentPrice] = useState<PriceItem | null>(null)
  const [priceFormData, setPriceFormData] = useState<Partial<PriceItem>>({})

  // Simple authentication check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.username === "admin" && loginForm.password === "cosmic123") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials")
    }
  }

  // Blog post functions
  const handleCreatePost = () => {
    setCurrentPost(null)
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "Joshi",
      category: categories[0],
      tags: [],
      image: "/placeholder.svg?height=300&width=400",
      featured: false,
      published: false,
    })
    setIsEditing(true)
  }

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post)
    setFormData(post)
    setIsEditing(true)
  }

  const handleSavePost = () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      alert("Please fill in all required fields")
      return
    }

    const postData: BlogPost = {
      id: currentPost?.id || Date.now().toString(),
      title: formData.title || "",
      excerpt: formData.excerpt || "",
      content: formData.content || "",
      author: formData.author || "Joshi",
      date: currentPost?.date || new Date().toISOString().split("T")[0],
      category: formData.category || categories[0],
      tags: formData.tags || [],
      image: formData.image || "/placeholder.svg?height=300&width=400",
      featured: formData.featured || false,
      published: formData.published || false,
    }

    if (currentPost) {
      setPosts(posts.map((p) => (p.id === currentPost.id ? postData : p)))
    } else {
      setPosts([...posts, postData])
    }

    setIsEditing(false)
    setCurrentPost(null)
    setFormData({})
  }

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((p) => p.id !== id))
    }
  }

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag)
    setFormData({ ...formData, tags })
  }

  // Price management functions
  const handleCreatePrice = () => {
    setCurrentPrice(null)
    setPriceFormData({
      name: "",
      type: "class",
      price: "",
      originalPrice: "",
    })
    setIsPriceEditing(true)
  }

  const handleEditPrice = (price: PriceItem) => {
    setCurrentPrice(price)
    setPriceFormData(price)
    setIsPriceEditing(true)
  }

  const handleSavePrice = () => {
    if (!priceFormData.name || !priceFormData.price) {
      alert("Please fill in required fields")
      return
    }

    const priceData: PriceItem = {
      id: currentPrice?.id || Date.now().toString(),
      name: priceFormData.name || "",
      type: priceFormData.type || "class",
      price: priceFormData.price || "",
      originalPrice: priceFormData.originalPrice || undefined,
    }

    if (currentPrice) {
      setPrices(prices.map((p) => (p.id === currentPrice.id ? priceData : p)))
    } else {
      setPrices([...prices, priceData])
    }

    setIsPriceEditing(false)
    setCurrentPrice(null)
    setPriceFormData({})
  }

  const handleDeletePrice = (id: string) => {
    if (confirm("Are you sure you want to delete this price?")) {
      setPrices(prices.filter((p) => p.id !== id))
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 text-white flex items-center justify-center">
        <Card className="w-full max-w-md bg-gradient-to-br from-purple-800/50 to-indigo-800/50 border-purple-400/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-purple-200">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-purple-200">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="bg-purple-800/30 border-purple-400/30 text-white"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-purple-200">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="bg-purple-800/30 border-purple-400/30 text-white"
                  placeholder="Enter password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                Login
              </Button>
            </form>
            <p className="text-sm text-purple-300 mt-4 text-center">Demo credentials: admin / cosmic123</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 text-white">
      {/* Header */}
      <div className="border-b border-purple-400/30 bg-purple-800/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-200">Admin Dashboard</h1>
          <Button
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
            className="border-purple-400 text-purple-200 hover:bg-purple-600 hover:text-white"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-purple-800/30 border border-purple-400/30">
            <TabsTrigger value="blog" className="data-[state=active]:bg-purple-600 text-purple-200">
              Blog Management
            </TabsTrigger>
            <TabsTrigger value="prices" className="data-[state=active]:bg-purple-600 text-purple-200">
              Price Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blog" className="mt-6">
            {isEditing ? (
              /* Blog Edit Form */
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 border-purple-400/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-purple-200 flex items-center justify-between">
                      {currentPost ? "Edit Post" : "Create New Post"}
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="ghost"
                        size="sm"
                        className="text-purple-300 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title" className="text-purple-200">
                          Title *
                        </Label>
                        <Input
                          id="title"
                          value={formData.title || ""}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="bg-purple-800/30 border-purple-400/30 text-white"
                          placeholder="Enter post title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category" className="text-purple-200">
                          Category
                        </Label>
                        <Select
                          value={formData.category || categories[0]}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger className="bg-purple-800/30 border-purple-400/30 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="excerpt" className="text-purple-200">
                        Excerpt *
                      </Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt || ""}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        className="bg-purple-800/30 border-purple-400/30 text-white"
                        placeholder="Brief description of the post"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="content" className="text-purple-200">
                        Content *
                      </Label>
                      <Textarea
                        id="content"
                        value={formData.content || ""}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="bg-purple-800/30 border-purple-400/30 text-white"
                        placeholder="Full post content"
                        rows={10}
                      />
                    </div>

                    <div>
                      <Label htmlFor="tags" className="text-purple-200">
                        Tags (comma-separated)
                      </Label>
                      <Input
                        id="tags"
                        value={formData.tags?.join(", ") || ""}
                        onChange={(e) => handleTagsChange(e.target.value)}
                        className="bg-purple-800/30 border-purple-400/30 text-white"
                        placeholder="tag1, tag2, tag3"
                      />
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={formData.featured || false}
                          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                        />
                        <Label htmlFor="featured" className="text-purple-200">
                          Featured Post
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="published"
                          checked={formData.published || false}
                          onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                        />
                        <Label htmlFor="published" className="text-purple-200">
                          Published
                        </Label>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={handleSavePost}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Post
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-purple-400 text-purple-200 hover:bg-purple-600 hover:text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              /* Blog Posts List */
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-purple-200">All Posts ({posts.length})</h2>
                  <Button
                    onClick={handleCreatePost}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </div>

                <div className="grid gap-6">
                  {posts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Card className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 border-purple-400/30 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-semibold text-purple-100">{post.title}</h3>
                                {post.featured && <Badge className="bg-yellow-500 text-black">Featured</Badge>}
                                <Badge variant={post.published ? "default" : "secondary"}>
                                  {post.published ? "Published" : "Draft"}
                                </Badge>
                              </div>
                              <p className="text-purple-200 mb-2">{post.excerpt}</p>
                              <div className="flex items-center gap-4 text-sm text-purple-300">
                                <span>{post.category}</span>
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                                <div className="flex gap-1">
                                  {post.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="outline"
                                      className="border-purple-400 text-purple-200 text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                onClick={() => handleEditPost(post)}
                                size="sm"
                                variant="outline"
                                className="border-purple-400 text-purple-200 hover:bg-purple-600 hover:text-white"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                onClick={() => handleDeletePost(post.id)}
                                size="sm"
                                variant="outline"
                                className="border-red-400 text-red-300 hover:bg-red-600 hover:text-white"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="prices" className="mt-6">
            {isPriceEditing ? (
              /* Price Edit Form */
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 border-purple-400/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-purple-200 flex items-center justify-between">
                      {currentPrice ? "Edit Price" : "Add New Price"}
                      <Button
                        onClick={() => setIsPriceEditing(false)}
                        variant="ghost"
                        size="sm"
                        className="text-purple-300 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-purple-200">
                          Item Name *
                        </Label>
                        <Input
                          id="name"
                          value={priceFormData.name || ""}
                          onChange={(e) => setPriceFormData({ ...priceFormData, name: e.target.value })}
                          className="bg-purple-800/30 border-purple-400/30 text-white"
                          placeholder="e.g., foundation, birth-chart"
                        />
                      </div>
                      <div>
                        <Label htmlFor="type" className="text-purple-200">
                          Type
                        </Label>
                        <Select
                          value={priceFormData.type || "class"}
                          onValueChange={(value: "class" | "service") =>
                            setPriceFormData({ ...priceFormData, type: value })
                          }
                        >
                          <SelectTrigger className="bg-purple-800/30 border-purple-400/30 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="class">Class</SelectItem>
                            <SelectItem value="service">Service</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price" className="text-purple-200">
                          Current Price *
                        </Label>
                        <Input
                          id="price"
                          value={priceFormData.price || ""}
                          onChange={(e) => setPriceFormData({ ...priceFormData, price: e.target.value })}
                          className="bg-purple-800/30 border-purple-400/30 text-white"
                          placeholder="₹15,999"
                        />
                      </div>
                      <div>
                        <Label htmlFor="originalPrice" className="text-purple-200">
                          Original Price (Optional)
                        </Label>
                        <Input
                          id="originalPrice"
                          value={priceFormData.originalPrice || ""}
                          onChange={(e) => setPriceFormData({ ...priceFormData, originalPrice: e.target.value })}
                          className="bg-purple-800/30 border-purple-400/30 text-white"
                          placeholder="₹19,999"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={handleSavePrice}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Price
                      </Button>
                      <Button
                        onClick={() => setIsPriceEditing(false)}
                        variant="outline"
                        className="border-purple-400 text-purple-200 hover:bg-purple-600 hover:text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              /* Prices List */
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-purple-200">Price Management ({prices.length})</h2>
                  <Button
                    onClick={handleCreatePrice}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Price
                  </Button>
                </div>

                <div className="grid gap-6">
                  {prices.map((price, index) => (
                    <motion.div
                      key={price.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Card className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 border-purple-400/30 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <DollarSign className="w-8 h-8 text-amber-400" />
                              <div>
                                <h3 className="text-xl font-semibold text-purple-100">{price.name}</h3>
                                <div className="flex items-center gap-2">
                                  <Badge variant={price.type === "class" ? "default" : "secondary"}>{price.type}</Badge>
                                  <span className="text-2xl font-bold text-amber-400">{price.price}</span>
                                  {price.originalPrice && (
                                    <span className="text-lg text-gray-400 line-through">{price.originalPrice}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleEditPrice(price)}
                                size="sm"
                                variant="outline"
                                className="border-purple-400 text-purple-200 hover:bg-purple-600 hover:text-white"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                onClick={() => handleDeletePrice(price.id)}
                                size="sm"
                                variant="outline"
                                className="border-red-400 text-red-300 hover:bg-red-600 hover:text-white"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
