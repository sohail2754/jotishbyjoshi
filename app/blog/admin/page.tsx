"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Save, X, DollarSign, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

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
  published: boolean
  created_at: string
  updated_at: string
}

interface ServicePrice {
  id: number
  service_name: string
  display_name: string
  price: string
  original_price?: string
  description?: string
  active: boolean
}

interface ClassPrice {
  id: number
  class_name: string
  display_name: string
  price: string
  original_price?: string
  description?: string
  duration?: string
  active: boolean
}

interface User {
  username: string
  email: string
  role: string
}

export default function BlogAdminPage() {
  const { toast } = useToast()

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Blog state
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState<Partial<BlogPost>>({})

  // Price state
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>([])
  const [classPrices, setClassPrices] = useState<ClassPrice[]>([])
  const [isPriceEditing, setIsPriceEditing] = useState(false)
  const [priceType, setPriceType] = useState<"service" | "class">("service")
  const [currentServicePrice, setCurrentServicePrice] = useState<ServicePrice | null>(null)
  const [currentClassPrice, setCurrentClassPrice] = useState<ClassPrice | null>(null)
  const [servicePriceFormData, setServicePriceFormData] = useState<Partial<ServicePrice>>({})
  const [classPriceFormData, setClassPriceFormData] = useState<Partial<ClassPrice>>({})

  // Login form
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })

  const categories = [
    "Astrology Basics",
    "Planetary Transits",
    "Healing",
    "Predictions",
    "Spiritual Practice",
    "Remedies",
  ]

  // Check authentication on mount
  useEffect(() => {
    checkAuth()
  }, [])

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadBlogPosts()
      loadPrices()
    }
  }, [isAuthenticated])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify" }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          username: loginForm.username,
          password: loginForm.password,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setIsAuthenticated(true)
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel!",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Login failed",
          description: error.error || "Invalid credentials",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "Failed to connect to server",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      })

      setIsAuthenticated(false)
      setUser(null)
      setPosts([])
      setServicePrices([])
      setClassPrices([])

      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const loadBlogPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog")
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts)
      }
    } catch (error) {
      console.error("Failed to load blog posts:", error)
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      })
    }
  }

  const loadPrices = async () => {
    try {
      const [serviceResponse, classResponse] = await Promise.all([
        fetch("/api/service-prices"),
        fetch("/api/class-prices"),
      ])

      if (serviceResponse.ok) {
        const serviceData = await serviceResponse.json()
        setServicePrices(serviceData.prices)
      }

      if (classResponse.ok) {
        const classData = await classResponse.json()
        setClassPrices(classData.prices)
      }
    } catch (error) {
      console.error("Failed to load prices:", error)
      toast({
        title: "Error",
        description: "Failed to load prices",
        variant: "destructive",
      })
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
      image_url: "/placeholder.svg?height=300&width=400",
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

  const handleSavePost = async () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      const method = currentPost ? "PUT" : "POST"
      const body = currentPost ? { id: currentPost.id, ...formData } : formData

      const response = await fetch("/api/admin/blog", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        const data = await response.json()

        if (currentPost) {
          setPosts(posts.map((p) => (p.id === currentPost.id ? data.post : p)))
        } else {
          setPosts([data.post, ...posts])
        }

        setIsEditing(false)
        setCurrentPost(null)
        setFormData({})

        toast({
          title: "Success",
          description: `Blog post ${currentPost ? "updated" : "created"} successfully`,
        })
      } else {
        throw new Error("Failed to save post")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      })
    }
  }

  const handleDeletePost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const response = await fetch("/api/admin/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        setPosts(posts.filter((p) => p.id !== id))
        toast({
          title: "Success",
          description: "Blog post deleted successfully",
        })
      } else {
        throw new Error("Failed to delete post")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      })
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
  const handleCreatePrice = (type: "service" | "class") => {
    setPriceType(type)
    setCurrentServicePrice(null)
    setCurrentClassPrice(null)

    if (type === "service") {
      setServicePriceFormData({
        service_name: "",
        display_name: "",
        price: "",
        original_price: "",
        description: "",
        active: true,
      })
    } else {
      setClassPriceFormData({
        class_name: "",
        display_name: "",
        price: "",
        original_price: "",
        description: "",
        duration: "",
        active: true,
      })
    }

    setIsPriceEditing(true)
  }

  const handleEditServicePrice = (price: ServicePrice) => {
    setPriceType("service")
    setCurrentServicePrice(price)
    setServicePriceFormData(price)
    setIsPriceEditing(true)
  }

  const handleEditClassPrice = (price: ClassPrice) => {
    setPriceType("class")
    setCurrentClassPrice(price)
    setClassPriceFormData(price)
    setIsPriceEditing(true)
  }

  const handleSavePrice = async () => {
    try {
      const isService = priceType === "service"
      const formData = isService ? servicePriceFormData : classPriceFormData
      const currentPrice = isService ? currentServicePrice : currentClassPrice

      if (!formData.display_name || !formData.price) {
        toast({
          title: "Validation Error",
          description: "Please fill in required fields",
          variant: "destructive",
        })
        return
      }

      const method = currentPrice ? "PUT" : "POST"
      const body = currentPrice ? { id: currentPrice.id, ...formData } : formData
      const endpoint = isService ? "/api/service-prices" : "/api/class-prices"

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        const data = await response.json()

        if (isService) {
          if (currentServicePrice) {
            setServicePrices(servicePrices.map((p) => (p.id === currentServicePrice.id ? data.price : p)))
          } else {
            setServicePrices([...servicePrices, data.price])
          }
        } else {
          if (currentClassPrice) {
            setClassPrices(classPrices.map((p) => (p.id === currentClassPrice.id ? data.price : p)))
          } else {
            setClassPrices([...classPrices, data.price])
          }
        }

        setIsPriceEditing(false)
        setCurrentServicePrice(null)
        setCurrentClassPrice(null)
        setServicePriceFormData({})
        setClassPriceFormData({})

        toast({
          title: "Success",
          description: `${isService ? "Service" : "Class"} price ${currentPrice ? "updated" : "created"} successfully`,
        })
      } else {
        throw new Error("Failed to save price")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save price",
        variant: "destructive",
      })
    }
  }

  const handleDeleteServicePrice = async (id: number) => {
    if (!confirm("Are you sure you want to delete this price?")) return

    try {
      const response = await fetch("/api/service-prices", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        setServicePrices(servicePrices.filter((p) => p.id !== id))
        toast({
          title: "Success",
          description: "Service price deleted successfully",
        })
      } else {
        throw new Error("Failed to delete price")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete service price",
        variant: "destructive",
      })
    }
  }

  const handleDeleteClassPrice = async (id: number) => {
    if (!confirm("Are you sure you want to delete this price?")) return

    try {
      const response = await fetch("/api/class-prices", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        setClassPrices(classPrices.filter((p) => p.id !== id))
        toast({
          title: "Success",
          description: "Class price deleted successfully",
        })
      } else {
        throw new Error("Failed to delete price")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete class price",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-purple-200">Loading admin panel...</p>
        </div>
      </div>
    )
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
                  required
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
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <p className="text-sm text-purple-300 mt-4 text-center">Default credentials: admin / cosmic123</p>
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
          <div>
            <h1 className="text-2xl font-bold text-purple-200">Admin Dashboard</h1>
            <p className="text-sm text-purple-300">Welcome, {user?.username}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-purple-400 text-purple-200 hover:bg-purple-600 hover:text-white bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-purple-800/30 border border-purple-400/30">
            <TabsTrigger value="blog" className="data-[state=active]:bg-purple-600 text-purple-200">
              Blog Management ({posts.length})
            </TabsTrigger>
            <TabsTrigger value="prices" className="data-[state=active]:bg-purple-600 text-purple-200">
              Price Management ({servicePrices.length + classPrices.length})
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
                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
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

                  {posts.length === 0 && (
                    <Card className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 border-purple-400/30 backdrop-blur-sm">
                      <CardContent className="p-12 text-center">
                        <p className="text-purple-200 text-lg mb-4">No blog posts found</p>
                        <Button
                          onClick={handleCreatePost}
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Create Your First Post
                        </Button>
                      </CardContent>
                    </Card>
                  )}
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
                      {(priceType === "service" ? currentServicePrice : currentClassPrice)
                        ? "Edit Price"
                        : "Add New Price"}
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
                        <Label htmlFor="display_name" className="text-purple-200">
                          Display Name *
                        </Label>
                        <Input
                          id="display_name"
                          value={
                            priceType === "service"
                              ? servicePriceFormData.display_name || ""
                              : classPriceFormData.display_name || ""
                          }
                          onChange={(e) => {
                            if (priceType === "service") {
                              setServicePriceFormData({ ...servicePriceFormData, display_name: e.target.value })
                            } else {
                              setClassPriceFormData({ ...classPriceFormData, display_name: e.target.value })
                            }
                          }}
                          className="bg-purple-800/30 border-purple-400/30 text-white"
                          placeholder="e.g., Birth Chart Analysis"
                        />
                      </div>
                      <div>
                        <Label htmlFor="internal_name" className="text-purple-200">
                          Internal Name
                        </Label>
                        <Input
                          id="internal_name"
                          value={
                            priceType === "service"
                              ? servicePriceFormData.service_name || ""
                              : classPriceFormData.class_name || ""
                          }
                          onChange={(e) => {
                            if (priceType === "service") {
                              setServicePriceFormData({ ...servicePriceFormData, service_name: e.target.value })
                            } else {
                              setClassPriceFormData({ ...classPriceFormData, class_name: e.target.value })
                            }
                          }}
                          className="bg-purple-800/30 border-purple-400/30 text-white"
                          placeholder="e.g., birth-chart"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price" className="text-purple-200">
                          Current Price *
                        </Label>
                        <Input
                          id="price"
                          value={
                            priceType === "service" ? servicePriceFormData.price || "" : classPriceFormData.price || ""
                          }
                          onChange={(e) => {
                            if (priceType === "service") {
                              setServicePriceFormData({ ...servicePriceFormData, price: e.target.value })
                            } else {
                              setClassPriceFormData({ ...classPriceFormData, price: e.target.value })
                            }
                          }}
                          className="bg-purple-800/30 border-purple-400/30 text-white"
                          placeholder="₹950"
                        />
                      </div>
                      <div>
                        <Label htmlFor="originalPrice" className="text-purple-200">
                          Original Price (Optional)
                        </Label>
                        <Input
                          id="originalPrice"
                          value={
                            priceType === "service"
                              ? servicePriceFormData.original_price || ""
                              : classPriceFormData.original_price || ""
                          }
                          onChange={(e) => {
                            if (priceType === "service") {
                              setServicePriceFormData({ ...servicePriceFormData, original_price: e.target.value })
                            } else {
                              setClassPriceFormData({ ...classPriceFormData, original_price: e.target.value })
                            }
                          }}
                          className="bg-purple-800/30 border-purple-400/30 text-white"
                          placeholder="₹1200"
                        />
                      </div>
                    </div>

                    {priceType === "class" && (
                      <div>
                        <Label htmlFor="duration" className="text-purple-200">
                          Duration
                        </Label>
                        <Input
                          id="duration"
                          value={classPriceFormData.duration || ""}
                          onChange={(e) => setClassPriceFormData({ ...classPriceFormData, duration: e.target.value })}
                          className="bg-purple-800/30 border-purple-400/30 text-white"
                          placeholder="3 months"
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="description" className="text-purple-200">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={
                          priceType === "service"
                            ? servicePriceFormData.description || ""
                            : classPriceFormData.description || ""
                        }
                        onChange={(e) => {
                          if (priceType === "service") {
                            setServicePriceFormData({ ...servicePriceFormData, description: e.target.value })
                          } else {
                            setClassPriceFormData({ ...classPriceFormData, description: e.target.value })
                          }
                        }}
                        className="bg-purple-800/30 border-purple-400/30 text-white"
                        placeholder="Brief description of the service or class"
                        rows={3}
                      />
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
                  <h2 className="text-2xl font-bold text-purple-200">Price Management</h2>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleCreatePrice("service")}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Service Price
                    </Button>
                    <Button
                      onClick={() => handleCreatePrice("class")}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Class Price
                    </Button>
                  </div>
                </div>

                {/* Service Prices */}
                <div>
                  <h3 className="text-xl font-semibold text-purple-200 mb-4">
                    Service Prices ({servicePrices.length})
                  </h3>
                  <div className="grid gap-4">
                    {servicePrices.map((price, index) => (
                      <motion.div
                        key={price.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Card className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 border-purple-400/30 backdrop-blur-sm">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <DollarSign className="w-6 h-6 text-amber-400" />
                                <div>
                                  <h4 className="text-lg font-semibold text-purple-100">{price.display_name}</h4>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary">Service</Badge>
                                    <span className="text-xl font-bold text-amber-400">{price.price}</span>
                                    {price.original_price && (
                                      <span className="text-sm text-gray-400 line-through">{price.original_price}</span>
                                    )}
                                  </div>
                                  {price.description && (
                                    <p className="text-sm text-purple-300 mt-1">{price.description}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleEditServicePrice(price)}
                                  size="sm"
                                  variant="outline"
                                  className="border-purple-400 text-purple-200 hover:bg-purple-600 hover:text-white"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  onClick={() => handleDeleteServicePrice(price.id)}
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

                {/* Class Prices */}
                <div>
                  <h3 className="text-xl font-semibold text-purple-200 mb-4">Class Prices ({classPrices.length})</h3>
                  <div className="grid gap-4">
                    {classPrices.map((price, index) => (
                      <motion.div
                        key={price.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Card className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 border-purple-400/30 backdrop-blur-sm">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <DollarSign className="w-6 h-6 text-amber-400" />
                                <div>
                                  <h4 className="text-lg font-semibold text-purple-100">{price.display_name}</h4>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="default">Class</Badge>
                                    <span className="text-xl font-bold text-amber-400">{price.price}</span>
                                    {price.original_price && (
                                      <span className="text-sm text-gray-400 line-through">{price.original_price}</span>
                                    )}
                                    {price.duration && (
                                      <Badge variant="outline" className="border-purple-400 text-purple-200">
                                        {price.duration}
                                      </Badge>
                                    )}
                                  </div>
                                  {price.description && (
                                    <p className="text-sm text-purple-300 mt-1">{price.description}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleEditClassPrice(price)}
                                  size="sm"
                                  variant="outline"
                                  className="border-purple-400 text-purple-200 hover:bg-purple-600 hover:text-white"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  onClick={() => handleDeleteClassPrice(price.id)}
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

                {servicePrices.length === 0 && classPrices.length === 0 && (
                  <Card className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 border-purple-400/30 backdrop-blur-sm">
                    <CardContent className="p-12 text-center">
                      <p className="text-purple-200 text-lg mb-4">No prices configured</p>
                      <div className="flex gap-4 justify-center">
                        <Button
                          onClick={() => handleCreatePrice("service")}
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Service Price
                        </Button>
                        <Button
                          onClick={() => handleCreatePrice("class")}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Class Price
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
