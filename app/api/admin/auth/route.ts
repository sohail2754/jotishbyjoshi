import { type NextRequest, NextResponse } from "next/server"
import { authenticateAdmin, createAdminSession, deleteAdminSession, validateAdminSession } from "@/lib/database"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { username, password, action } = await request.json()

    if (action === "login") {
      const user = await authenticateAdmin(username, password)

      if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      const session = await createAdminSession(user.id)

      // Set HTTP-only cookie
      const response = NextResponse.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      })

      response.cookies.set("admin_session", session.session_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60, // 24 hours
      })

      return response
    }

    if (action === "logout") {
      const cookieStore = cookies()
      const sessionToken = cookieStore.get("admin_session")?.value

      if (sessionToken) {
        await deleteAdminSession(sessionToken)
      }

      const response = NextResponse.json({ success: true })
      response.cookies.delete("admin_session")
      return response
    }

    if (action === "verify") {
      const cookieStore = cookies()
      const sessionToken = cookieStore.get("admin_session")?.value

      if (!sessionToken) {
        return NextResponse.json({ error: "No session" }, { status: 401 })
      }

      const session = await validateAdminSession(sessionToken)

      if (!session) {
        const response = NextResponse.json({ error: "Invalid session" }, { status: 401 })
        response.cookies.delete("admin_session")
        return response
      }

      return NextResponse.json({
        success: true,
        user: {
          username: session.username,
          email: session.email,
          role: session.role,
        },
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Admin auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
