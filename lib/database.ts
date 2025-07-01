import { neon } from "@neondatabase/serverless"

/* -------------------------------------------------------------------------- */
/*                              singleton client                              */
/* -------------------------------------------------------------------------- */

let sql: ReturnType<typeof neon> | null = null

function getSql() {
  if (!sql) {
    const url = process.env.DATABASE_URL
    if (!url) throw new Error("DATABASE_URL is not set")
    sql = neon(url)
  }
  return sql
}

/* -------------------------------------------------------------------------- */
/*                                  types                                     */
/* -------------------------------------------------------------------------- */

export interface BlogPost {
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

export interface Consultation {
  id: number
  name: string
  email: string
  phone?: string
  service_type: string
  birth_date?: string
  birth_time?: string
  birth_place?: string
  preferred_date: string
  preferred_time: string
  message?: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  created_at: string
}

export interface NewsletterSubscriber {
  id: number
  email: string
  subscribed_at: string
  active: boolean
}

export interface AdminUser {
  id: number
  username: string
  email: string
  password_hash: string
  role: string
  created_at: string
  updated_at: string
}

export interface ServicePrice {
  id: number
  service_name: string
  display_name: string
  price: string
  original_price?: string
  description?: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface ClassPrice {
  id: number
  class_name: string
  display_name: string
  price: string
  original_price?: string
  description?: string
  duration?: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface AdminSession {
  id: number
  user_id: number
  session_token: string
  expires_at: string
  created_at: string
}

/* -------------------------------------------------------------------------- */
/*                               blog helpers                                 */
/* -------------------------------------------------------------------------- */

export async function getBlogPosts(limit?: number, featured?: boolean) {
  try {
    const db = getSql()
    let query = `SELECT * FROM blog_posts WHERE published = true`
    const params: any[] = []

    if (featured !== undefined) {
      query += ` AND featured = $${params.length + 1}`
      params.push(featured)
    }

    query += ` ORDER BY created_at DESC`

    if (limit) {
      query += ` LIMIT $${params.length + 1}`
      params.push(limit)
    }

    const { rows } = await db.query(query, params)
    return rows as BlogPost[]
  } catch (error) {
    console.error("Database error in getBlogPosts:", error)
    return []
  }
}

export async function getAllBlogPosts() {
  try {
    const db = getSql()
    const result = await db`SELECT * FROM blog_posts ORDER BY created_at DESC`
    return result as BlogPost[]
  } catch (error) {
    console.error("Database error in getAllBlogPosts:", error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const db = getSql()
    const result = await db`SELECT * FROM blog_posts WHERE slug = ${slug} AND published = true`
    return (result[0] as BlogPost) ?? null
  } catch (error) {
    console.error("Database error in getBlogPostBySlug:", error)
    return null
  }
}

export async function getBlogPostById(id: number) {
  try {
    const db = getSql()
    const result = await db`SELECT * FROM blog_posts WHERE id = ${id}`
    return (result[0] as BlogPost) ?? null
  } catch (error) {
    console.error("Database error in getBlogPostById:", error)
    return null
  }
}

export async function createBlogPost(data: Omit<BlogPost, "id" | "created_at" | "updated_at">) {
  try {
    const db = getSql()
    const result = await db`
      INSERT INTO blog_posts
        (title, slug, excerpt, content, author, category, tags, image_url, featured, published)
      VALUES (${data.title}, ${data.slug}, ${data.excerpt}, ${data.content}, ${data.author}, 
              ${data.category}, ${JSON.stringify(data.tags)}, ${data.image_url}, 
              ${data.featured}, ${data.published})
      RETURNING *
    `
    return result[0] as BlogPost
  } catch (error) {
    console.error("Database error in createBlogPost:", error)
    throw new Error("Failed to create blog post")
  }
}

export async function updateBlogPost(id: number, data: Partial<BlogPost>) {
  try {
    const db = getSql()
    const updates: string[] = []
    const values: any[] = []

    if (data.title !== undefined) {
      updates.push(`title = $${values.length + 1}`)
      values.push(data.title)
    }
    if (data.slug !== undefined) {
      updates.push(`slug = $${values.length + 1}`)
      values.push(data.slug)
    }
    if (data.excerpt !== undefined) {
      updates.push(`excerpt = $${values.length + 1}`)
      values.push(data.excerpt)
    }
    if (data.content !== undefined) {
      updates.push(`content = $${values.length + 1}`)
      values.push(data.content)
    }
    if (data.author !== undefined) {
      updates.push(`author = $${values.length + 1}`)
      values.push(data.author)
    }
    if (data.category !== undefined) {
      updates.push(`category = $${values.length + 1}`)
      values.push(data.category)
    }
    if (data.tags !== undefined) {
      updates.push(`tags = $${values.length + 1}`)
      values.push(JSON.stringify(data.tags))
    }
    if (data.image_url !== undefined) {
      updates.push(`image_url = $${values.length + 1}`)
      values.push(data.image_url)
    }
    if (data.featured !== undefined) {
      updates.push(`featured = $${values.length + 1}`)
      values.push(data.featured)
    }
    if (data.published !== undefined) {
      updates.push(`published = $${values.length + 1}`)
      values.push(data.published)
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(id)

    const query = `UPDATE blog_posts SET ${updates.join(", ")} WHERE id = $${values.length} RETURNING *`
    const { rows } = await db.query(query, values)
    return rows[0] as BlogPost
  } catch (error) {
    console.error("Database error in updateBlogPost:", error)
    throw new Error("Failed to update blog post")
  }
}

export async function deleteBlogPost(id: number) {
  try {
    const db = getSql()
    await db`DELETE FROM blog_posts WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Database error in deleteBlogPost:", error)
    throw new Error("Failed to delete blog post")
  }
}

export async function getBlogPostsByCategory(category: string) {
  try {
    const db = getSql()
    const result = await db`
      SELECT * FROM blog_posts 
      WHERE category = ${category} AND published = true 
      ORDER BY created_at DESC
    `
    return result as BlogPost[]
  } catch (error) {
    console.error("Database error in getBlogPostsByCategory:", error)
    return []
  }
}

export async function searchBlogPosts(searchTerm: string) {
  try {
    const db = getSql()
    const like = `%${searchTerm}%`
    const result = await db`
      SELECT * FROM blog_posts
      WHERE published = true
        AND (title ILIKE ${like} OR excerpt ILIKE ${like} OR content ILIKE ${like})
      ORDER BY created_at DESC
    `
    return result as BlogPost[]
  } catch (error) {
    console.error("Database error in searchBlogPosts:", error)
    return []
  }
}

/* -------------------------------------------------------------------------- */
/*                         consultation / newsletter                          */
/* -------------------------------------------------------------------------- */

export async function createConsultation(data: Omit<Consultation, "id" | "created_at" | "status">) {
  try {
    const db = getSql()
    const result = await db`
      INSERT INTO consultations
        (name, email, phone, service_type, birth_date, birth_time, birth_place,
         preferred_date, preferred_time, message)
      VALUES (${data.name}, ${data.email}, ${data.phone}, ${data.service_type}, 
              ${data.birth_date}, ${data.birth_time}, ${data.birth_place},
              ${data.preferred_date}, ${data.preferred_time}, ${data.message})
      RETURNING *
    `
    return result[0] as Consultation
  } catch (error) {
    console.error("Database error in createConsultation:", error)
    throw new Error("Failed to create consultation")
  }
}

export async function getConsultations() {
  try {
    const db = getSql()
    const result = await db`SELECT * FROM consultations ORDER BY created_at DESC`
    return result as Consultation[]
  } catch (error) {
    console.error("Database error in getConsultations:", error)
    return []
  }
}

export async function subscribeToNewsletter(email: string) {
  try {
    const db = getSql()
    const result = await db`
      INSERT INTO newsletter_subscribers (email)
      VALUES (${email})
      ON CONFLICT (email)
      DO UPDATE SET active = true
      RETURNING *
    `
    return result[0] as NewsletterSubscriber
  } catch (error) {
    console.error("Database error in subscribeToNewsletter:", error)
    throw new Error("Failed to subscribe to newsletter")
  }
}

export async function getNewsletterSubscribers() {
  try {
    const db = getSql()
    const result = await db`SELECT * FROM newsletter_subscribers WHERE active = true ORDER BY subscribed_at DESC`
    return result as NewsletterSubscriber[]
  } catch (error) {
    console.error("Database error in getNewsletterSubscribers:", error)
    return []
  }
}

/* -------------------------------------------------------------------------- */
/*                               admin helpers                                */
/* -------------------------------------------------------------------------- */

export async function authenticateAdmin(username: string, password: string) {
  try {
    const db = getSql()
    const result = await db`SELECT * FROM admin_users WHERE username = ${username}`
    const user = result[0] as AdminUser

    if (!user) {
      return null
    }

    // For demo purposes, we'll do a simple password check
    // In production, you should use bcrypt
    if (password === "cosmic123") {
      return user
    }

    return null
  } catch (error) {
    console.error("Database error in authenticateAdmin:", error)
    return null
  }
}

export async function createAdminSession(userId: number) {
  try {
    const db = getSql()
    const sessionToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    const result = await db`
      INSERT INTO admin_sessions (user_id, session_token, expires_at) 
      VALUES (${userId}, ${sessionToken}, ${expiresAt.toISOString()}) 
      RETURNING *
    `

    return result[0] as AdminSession
  } catch (error) {
    console.error("Database error in createAdminSession:", error)
    throw new Error("Failed to create admin session")
  }
}

export async function validateAdminSession(sessionToken: string) {
  try {
    const db = getSql()
    const result = await db`
      SELECT s.*, u.username, u.email, u.role 
      FROM admin_sessions s 
      JOIN admin_users u ON s.user_id = u.id 
      WHERE s.session_token = ${sessionToken} AND s.expires_at > CURRENT_TIMESTAMP
    `

    return result[0] || null
  } catch (error) {
    console.error("Database error in validateAdminSession:", error)
    return null
  }
}

export async function deleteAdminSession(sessionToken: string) {
  try {
    const db = getSql()
    await db`DELETE FROM admin_sessions WHERE session_token = ${sessionToken}`
    return true
  } catch (error) {
    console.error("Database error in deleteAdminSession:", error)
    return false
  }
}

/* -------------------------------------------------------------------------- */
/*                              price helpers                                 */
/* -------------------------------------------------------------------------- */

export async function getServicePrices() {
  try {
    const db = getSql()
    const result = await db`SELECT * FROM service_prices WHERE active = true ORDER BY id`
    return result as ServicePrice[]
  } catch (error) {
    console.error("Database error in getServicePrices:", error)
    // Return default prices if database fails
    return [
      {
        id: 1,
        service_name: "birth-chart",
        display_name: "Birth Chart Analysis",
        price: "₹1500",
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        service_name: "relationship",
        display_name: "Relationship Compatibility",
        price: "₹1200",
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 3,
        service_name: "career",
        display_name: "Career Guidance",
        price: "₹1000",
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 4,
        service_name: "health",
        display_name: "Health & Wellness",
        price: "₹950",
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 5,
        service_name: "grah-shanti",
        display_name: "Grah Shanti Pooja",
        price: "₹2500",
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 6,
        service_name: "navagraha",
        display_name: "Navagraha Pooja",
        price: "₹3000",
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 7,
        service_name: "monthly-pooja",
        display_name: "Monthly Pooja",
        price: "₹1500",
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 8,
        service_name: "chakra-healing",
        display_name: "Chakra Healing",
        price: "₹800",
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 9,
        service_name: "spiritual-counseling",
        display_name: "Spiritual Counseling",
        price: "₹700",
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]
  }
}

export async function getClassPrices() {
  try {
    const db = getSql()
    const result = await db`SELECT * FROM class_prices WHERE active = true ORDER BY id`
    return result as ClassPrice[]
  } catch (error) {
    console.error("Database error in getClassPrices:", error)
    // Return default prices if database fails
    return [
      {
        id: 1,
        class_name: "practice-kundali",
        display_name: "Practice Kundali for Students",
        price: "₹2500",
        duration: "Monthly",
        description: "Monthly program for astrology students",
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]
  }
}

export async function createServicePrice(data: Omit<ServicePrice, "id" | "created_at" | "updated_at">) {
  try {
    const db = getSql()
    const result = await db`
      INSERT INTO service_prices (service_name, display_name, price, original_price, description, active)
      VALUES (${data.service_name}, ${data.display_name}, ${data.price}, 
              ${data.original_price}, ${data.description}, ${data.active})
      RETURNING *
    `
    return result[0] as ServicePrice
  } catch (error) {
    console.error("Database error in createServicePrice:", error)
    throw new Error("Failed to create service price")
  }
}

export async function updateServicePrice(id: number, data: Partial<ServicePrice>) {
  try {
    const db = getSql()
    const updates: string[] = []
    const values: any[] = []

    if (data.service_name !== undefined) {
      updates.push(`service_name = $${values.length + 1}`)
      values.push(data.service_name)
    }
    if (data.display_name !== undefined) {
      updates.push(`display_name = $${values.length + 1}`)
      values.push(data.display_name)
    }
    if (data.price !== undefined) {
      updates.push(`price = $${values.length + 1}`)
      values.push(data.price)
    }
    if (data.original_price !== undefined) {
      updates.push(`original_price = $${values.length + 1}`)
      values.push(data.original_price)
    }
    if (data.description !== undefined) {
      updates.push(`description = $${values.length + 1}`)
      values.push(data.description)
    }
    if (data.active !== undefined) {
      updates.push(`active = $${values.length + 1}`)
      values.push(data.active)
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(id)

    const query = `UPDATE service_prices SET ${updates.join(", ")} WHERE id = $${values.length} RETURNING *`
    const { rows } = await db.query(query, values)
    return rows[0] as ServicePrice
  } catch (error) {
    console.error("Database error in updateServicePrice:", error)
    throw new Error("Failed to update service price")
  }
}

export async function deleteServicePrice(id: number) {
  try {
    const db = getSql()
    await db`UPDATE service_prices SET active = false WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Database error in deleteServicePrice:", error)
    throw new Error("Failed to delete service price")
  }
}

export async function createClassPrice(data: Omit<ClassPrice, "id" | "created_at" | "updated_at">) {
  try {
    const db = getSql()
    const result = await db`
      INSERT INTO class_prices (class_name, display_name, price, original_price, description, duration, active)
      VALUES (${data.class_name}, ${data.display_name}, ${data.price}, 
              ${data.original_price}, ${data.description}, ${data.duration}, ${data.active})
      RETURNING *
    `
    return result[0] as ClassPrice
  } catch (error) {
    console.error("Database error in createClassPrice:", error)
    throw new Error("Failed to create class price")
  }
}

export async function updateClassPrice(id: number, data: Partial<ClassPrice>) {
  try {
    const db = getSql()
    const updates: string[] = []
    const values: any[] = []

    if (data.class_name !== undefined) {
      updates.push(`class_name = $${values.length + 1}`)
      values.push(data.class_name)
    }
    if (data.display_name !== undefined) {
      updates.push(`display_name = $${values.length + 1}`)
      values.push(data.display_name)
    }
    if (data.price !== undefined) {
      updates.push(`price = $${values.length + 1}`)
      values.push(data.price)
    }
    if (data.original_price !== undefined) {
      updates.push(`original_price = $${values.length + 1}`)
      values.push(data.original_price)
    }
    if (data.description !== undefined) {
      updates.push(`description = $${values.length + 1}`)
      values.push(data.description)
    }
    if (data.duration !== undefined) {
      updates.push(`duration = $${values.length + 1}`)
      values.push(data.duration)
    }
    if (data.active !== undefined) {
      updates.push(`active = $${values.length + 1}`)
      values.push(data.active)
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(id)

    const query = `UPDATE class_prices SET ${updates.join(", ")} WHERE id = $${values.length} RETURNING *`
    const { rows } = await db.query(query, values)
    return rows[0] as ClassPrice
  } catch (error) {
    console.error("Database error in updateClassPrice:", error)
    throw new Error("Failed to update class price")
  }
}

export async function deleteClassPrice(id: number) {
  try {
    const db = getSql()
    await db`UPDATE class_prices SET active = false WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Database error in deleteClassPrice:", error)
    throw new Error("Failed to delete class price")
  }
}
