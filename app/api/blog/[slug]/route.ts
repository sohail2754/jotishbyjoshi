export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { getBlogPostBySlug } from "@/lib/database"

/**
 * GET /api/blog/[slug]
 */
export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const post = await getBlogPostBySlug(params.slug)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}
