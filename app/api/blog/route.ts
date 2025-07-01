export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { getBlogPosts, searchBlogPosts, getBlogPostsByCategory } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")

    let posts

    if (search) {
      posts = await searchBlogPosts(search)
    } else if (category && category !== "All") {
      posts = await getBlogPostsByCategory(category)
    } else {
      posts = await getBlogPosts(limit ? Number.parseInt(limit) : undefined, featured ? featured === "true" : undefined)
    }

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
