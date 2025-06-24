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
/*                         consultation / newsletter                          */
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
