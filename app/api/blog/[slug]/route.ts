export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    if (!slug) {
      return new NextResponse("Slug is required", { status: 400 })
    }

    const blog = await sql`SELECT * FROM blogs WHERE slug = ${slug}`

    if (!blog.rows.length) {
      return new NextResponse("Blog not found", { status: 404 })
    }

    return NextResponse.json(blog.rows[0])
  } catch (error: any) {
    console.error(error)
    return new NextResponse(error.message, { status: 500 })
  }
}
