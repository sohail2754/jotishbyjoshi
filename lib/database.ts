import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"

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
    let text = `SELECT * FROM blog_posts WHERE published = true`
    const values: unknown[] = []

    if (featured !== undefined) {
      text += ` AND featured = $${values.length + 1}`
      values.push(featured)
    }

    text += ` ORDER BY created_at DESC`

    if (limit) {
      text += ` LIMIT $${values.length + 1}`
      values.push(limit)
    }

    const res = await db.query(text, values)
    return res.rows as BlogPost[]
  } catch (error) {
    console.error("Database error in getBlogPosts:", error)
    return []
  }
}

export async function getAllBlogPosts() {
  try {
    const db = getSql()
    const res = await db.query(`SELECT * FROM blog_posts ORDER BY created_at DESC`)
    return res.rows as BlogPost[]
  } catch (error) {
    console.error("Database error in getAllBlogPosts:", error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const db = getSql()
    const res = await db.query(`SELECT * FROM blog_posts WHERE slug = $1 AND published = true`, [slug])
    return (res.rows[0] as BlogPost) ?? null
  } catch (error) {
    console.error("Database error in getBlogPostBySlug:", error)
    return null
  }
}

export async function getBlogPostById(id: number) {
  try {
    const db = getSql()
    const res = await db.query(`SELECT * FROM blog_posts WHERE id = $1`, [id])
    return (res.rows[0] as BlogPost) ?? null
  } catch (error) {
    console.error("Database error in getBlogPostById:", error)
    return null
  }
}

export async function createBlogPost(data: Omit<BlogPost, "id" | "created_at" | "updated_at">) {
  try {
    const db = getSql()
    const res = await db.query(
      `
        INSERT INTO blog_posts
          (title, slug, excerpt, content, author, category, tags, image_url, featured, published)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `,
      [
        data.title,
        data.slug,
        data.excerpt,
        data.content,
        data.author,
        data.category,
        JSON.stringify(data.tags),
        data.image_url,
        data.featured,
        data.published,
      ],
    )
    return res.rows[0] as BlogPost
  } catch (error) {
    console.error("Database error in createBlogPost:", error)
    throw new Error("Failed to create blog post")
  }
}

export async function updateBlogPost(id: number, data: Partial<BlogPost>) {
  try {
    const db = getSql()
    const fields = []
    const values = []
    let paramCount = 1

    if (data.title !== undefined) {
      fields.push(`title = $${paramCount}`)
      values.push(data.title)
      paramCount++
    }
    if (data.slug !== undefined) {
      fields.push(`slug = $${paramCount}`)
      values.push(data.slug)
      paramCount++
    }
    if (data.excerpt !== undefined) {
      fields.push(`excerpt = $${paramCount}`)
      values.push(data.excerpt)
      paramCount++
    }
    if (data.content !== undefined) {
      fields.push(`content = $${paramCount}`)
      values.push(data.content)
      paramCount++
    }
    if (data.author !== undefined) {
      fields.push(`author = $${paramCount}`)
      values.push(data.author)
      paramCount++
    }
    if (data.category !== undefined) {
      fields.push(`category = $${paramCount}`)
      values.push(data.category)
      paramCount++
    }
    if (data.tags !== undefined) {
      fields.push(`tags = $${paramCount}`)
      values.push(JSON.stringify(data.tags))
      paramCount++
    }
    if (data.image_url !== undefined) {
      fields.push(`image_url = $${paramCount}`)
      values.push(data.image_url)
      paramCount++
    }
    if (data.featured !== undefined) {
      fields.push(`featured = $${paramCount}`)
      values.push(data.featured)
      paramCount++
    }
    if (data.published !== undefined) {
      fields.push(`published = $${paramCount}`)
      values.push(data.published)
      paramCount++
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(id)

    const res = await db.query(
      `UPDATE blog_posts SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`,
      values,
    )
    return res.rows[0] as BlogPost
  } catch (error) {
    console.error("Database error in updateBlogPost:", error)
    throw new Error("Failed to update blog post")
  }
}

export async function deleteBlogPost(id: number) {
  try {
    const db = getSql()
    await db.query(`DELETE FROM blog_posts WHERE id = $1`, [id])
    return true
  } catch (error) {
    console.error("Database error in deleteBlogPost:", error)
    throw new Error("Failed to delete blog post")
  }
}

export async function getBlogPostsByCategory(category: string) {
  try {
    const db = getSql()
    const res = await db.query(
      `SELECT * FROM blog_posts WHERE category = $1 AND published = true ORDER BY created_at DESC`,
      [category],
    )
    return res.rows as BlogPost[]
  } catch (error) {
    console.error("Database error in getBlogPostsByCategory:", error)
    return []
  }
}

export async function searchBlogPosts(searchTerm: string) {
  try {
    const db = getSql()
    const like = `%${searchTerm}%`
    const res = await db.query(
      `
        SELECT * FROM blog_posts
        WHERE published = true
          AND (title ILIKE $1 OR excerpt ILIKE $1 OR content ILIKE $1)
        ORDER BY created_at DESC
      `,
      [like],
    )
    return res.rows as BlogPost[]
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
    const res = await db.query(
      `
        INSERT INTO consultations
          (name, email, phone, service_type, birth_date, birth_time, birth_place,
           preferred_date, preferred_time, message)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING *
      `,
      [
        data.name,
        data.email,
        data.phone,
        data.service_type,
        data.birth_date,
        data.birth_time,
        data.birth_place,
        data.preferred_date,
        data.preferred_time,
        data.message,
      ],
    )
    return res.rows[0] as Consultation
  } catch (error) {
    console.error("Database error in createConsultation:", error)
    throw new Error("Failed to create consultation")
  }
}

export async function getConsultations() {
  try {
    const db = getSql()
    const res = await db.query(`SELECT * FROM consultations ORDER BY created_at DESC`)
    return res.rows as Consultation[]
  } catch (error) {
    console.error("Database error in getConsultations:", error)
    return []
  }
}

export async function subscribeToNewsletter(email: string) {
  try {
    const db = getSql()
    const res = await db.query(
      `
        INSERT INTO newsletter_subscribers (email)
        VALUES ($1)
        ON CONFLICT (email)
        DO UPDATE SET active = true
        RETURNING *
      `,
      [email],
    )
    return res.rows[0] as NewsletterSubscriber
  } catch (error) {
    console.error("Database error in subscribeToNewsletter:", error)
    throw new Error("Failed to subscribe to newsletter")
  }
}

export async function getNewsletterSubscribers() {
  try {
    const db = getSql()
    const res = await db.query(`SELECT * FROM newsletter_subscribers WHERE active = true ORDER BY subscribed_at DESC`)
    return res.rows as NewsletterSubscriber[]
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
    const res = await db.query(`SELECT * FROM admin_users WHERE username = $1`, [username])
    const user = res.rows[0] as AdminUser

    if (!user) {
      return null
    }

    const isValid = await bcrypt.compare(password, user.password_hash)
    if (!isValid) {
      return null
    }

    return user
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

    const res = await db.query(
      `INSERT INTO admin_sessions (user_id, session_token, expires_at) VALUES ($1, $2, $3) RETURNING *`,
      [userId, sessionToken, expiresAt.toISOString()],
    )

    return res.rows[0] as AdminSession
  } catch (error) {
    console.error("Database error in createAdminSession:", error)
    throw new Error("Failed to create admin session")
  }
}

export async function validateAdminSession(sessionToken: string) {
  try {
    const db = getSql()
    const res = await db.query(
      `
        SELECT s.*, u.username, u.email, u.role 
        FROM admin_sessions s 
        JOIN admin_users u ON s.user_id = u.id 
        WHERE s.session_token = $1 AND s.expires_at > CURRENT_TIMESTAMP
      `,
      [sessionToken],
    )

    return res.rows[0] || null
  } catch (error) {
    console.error("Database error in validateAdminSession:", error)
    return null
  }
}

export async function deleteAdminSession(sessionToken: string) {
  try {
    const db = getSql()
    await db.query(`DELETE FROM admin_sessions WHERE session_token = $1`, [sessionToken])
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
    const res = await db.query(`SELECT * FROM service_prices WHERE active = true ORDER BY id`)
    return res.rows as ServicePrice[]
  } catch (error) {
    console.error("Database error in getServicePrices:", error)
    return []
  }
}

export async function getClassPrices() {
  try {
    const db = getSql()
    const res = await db.query(`SELECT * FROM class_prices WHERE active = true ORDER BY id`)
    return res.rows as ClassPrice[]
  } catch (error) {
    console.error("Database error in getClassPrices:", error)
    return []
  }
}

export async function createServicePrice(data: Omit<ServicePrice, "id" | "created_at" | "updated_at">) {
  try {
    const db = getSql()
    const res = await db.query(
      `
        INSERT INTO service_prices (service_name, display_name, price, original_price, description, active)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `,
      [data.service_name, data.display_name, data.price, data.original_price, data.description, data.active],
    )
    return res.rows[0] as ServicePrice
  } catch (error) {
    console.error("Database error in createServicePrice:", error)
    throw new Error("Failed to create service price")
  }
}

export async function updateServicePrice(id: number, data: Partial<ServicePrice>) {
  try {
    const db = getSql()
    const fields = []
    const values = []
    let paramCount = 1

    if (data.service_name !== undefined) {
      fields.push(`service_name = $${paramCount}`)
      values.push(data.service_name)
      paramCount++
    }
    if (data.display_name !== undefined) {
      fields.push(`display_name = $${paramCount}`)
      values.push(data.display_name)
      paramCount++
    }
    if (data.price !== undefined) {
      fields.push(`price = $${paramCount}`)
      values.push(data.price)
      paramCount++
    }
    if (data.original_price !== undefined) {
      fields.push(`original_price = $${paramCount}`)
      values.push(data.original_price)
      paramCount++
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount}`)
      values.push(data.description)
      paramCount++
    }
    if (data.active !== undefined) {
      fields.push(`active = $${paramCount}`)
      values.push(data.active)
      paramCount++
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(id)

    const res = await db.query(
      `UPDATE service_prices SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`,
      values,
    )
    return res.rows[0] as ServicePrice
  } catch (error) {
    console.error("Database error in updateServicePrice:", error)
    throw new Error("Failed to update service price")
  }
}

export async function deleteServicePrice(id: number) {
  try {
    const db = getSql()
    await db.query(`UPDATE service_prices SET active = false WHERE id = $1`, [id])
    return true
  } catch (error) {
    console.error("Database error in deleteServicePrice:", error)
    throw new Error("Failed to delete service price")
  }
}

export async function createClassPrice(data: Omit<ClassPrice, "id" | "created_at" | "updated_at">) {
  try {
    const db = getSql()
    const res = await db.query(
      `
        INSERT INTO class_prices (class_name, display_name, price, original_price, description, duration, active)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `,
      [
        data.class_name,
        data.display_name,
        data.price,
        data.original_price,
        data.description,
        data.duration,
        data.active,
      ],
    )
    return res.rows[0] as ClassPrice
  } catch (error) {
    console.error("Database error in createClassPrice:", error)
    throw new Error("Failed to create class price")
  }
}

export async function updateClassPrice(id: number, data: Partial<ClassPrice>) {
  try {
    const db = getSql()
    const fields = []
    const values = []
    let paramCount = 1

    if (data.class_name !== undefined) {
      fields.push(`class_name = $${paramCount}`)
      values.push(data.class_name)
      paramCount++
    }
    if (data.display_name !== undefined) {
      fields.push(`display_name = $${paramCount}`)
      values.push(data.display_name)
      paramCount++
    }
    if (data.price !== undefined) {
      fields.push(`price = $${paramCount}`)
      values.push(data.price)
      paramCount++
    }
    if (data.original_price !== undefined) {
      fields.push(`original_price = $${paramCount}`)
      values.push(data.original_price)
      paramCount++
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount}`)
      values.push(data.description)
      paramCount++
    }
    if (data.duration !== undefined) {
      fields.push(`duration = $${paramCount}`)
      values.push(data.duration)
      paramCount++
    }
    if (data.active !== undefined) {
      fields.push(`active = $${paramCount}`)
      values.push(data.active)
      paramCount++
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(id)

    const res = await db.query(
      `UPDATE class_prices SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`,
      values,
    )
    return res.rows[0] as ClassPrice
  } catch (error) {
    console.error("Database error in updateClassPrice:", error)
    throw new Error("Failed to update class price")
  }
}

export async function deleteClassPrice(id: number) {
  try {
    const db = getSql()
    await db.query(`UPDATE class_prices SET active = false WHERE id = $1`, [id])
    return true
  } catch (error) {
    console.error("Database error in deleteClassPrice:", error)
    throw new Error("Failed to delete class price")
  }
}
