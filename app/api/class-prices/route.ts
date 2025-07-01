import { type NextRequest, NextResponse } from "next/server"
import {
  getClassPrices,
  createClassPrice,
  updateClassPrice,
  deleteClassPrice,
  validateAdminSession,
} from "@/lib/database"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const prices = await getClassPrices()
    return NextResponse.json({ success: true, prices })
  } catch (error) {
    console.error("Error fetching class prices:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch class prices" }, { status: 500 })
  }
}

async function verifyAdmin() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get("admin_session")?.value

  if (!sessionToken) {
    return null
  }

  return await validateAdminSession(sessionToken)
}

export async function POST(request: NextRequest) {
  try {
    const session = await verifyAdmin()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const price = await createClassPrice({
      class_name: data.class_name,
      display_name: data.display_name || data.class_name,
      price: data.price,
      original_price: data.original_price,
      description: data.description,
      duration: data.duration,
      active: true,
    })

    return NextResponse.json({ success: true, price })
  } catch (error) {
    console.error("Error creating class price:", error)
    return NextResponse.json({ success: false, error: "Failed to create class price" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await verifyAdmin()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, ...data } = await request.json()
    const price = await updateClassPrice(id, data)
    return NextResponse.json({ success: true, price })
  } catch (error) {
    console.error("Error updating class price:", error)
    return NextResponse.json({ success: false, error: "Failed to update class price" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await verifyAdmin()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await request.json()
    await deleteClassPrice(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting class price:", error)
    return NextResponse.json({ success: false, error: "Failed to delete class price" }, { status: 500 })
  }
}
