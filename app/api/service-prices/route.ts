import { type NextRequest, NextResponse } from "next/server"
import {
  getServicePrices,
  createServicePrice,
  updateServicePrice,
  deleteServicePrice,
  validateAdminSession,
} from "@/lib/database"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const prices = await getServicePrices()
    return NextResponse.json({ success: true, prices })
  } catch (error) {
    console.error("Error fetching service prices:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch service prices" }, { status: 500 })
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
    const price = await createServicePrice({
      service_name: data.service_name,
      display_name: data.display_name || data.service_name,
      price: data.price,
      original_price: data.original_price,
      description: data.description,
      active: true,
    })

    return NextResponse.json({ success: true, price })
  } catch (error) {
    console.error("Error creating service price:", error)
    return NextResponse.json({ success: false, error: "Failed to create service price" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await verifyAdmin()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, ...data } = await request.json()
    const price = await updateServicePrice(id, data)
    return NextResponse.json({ success: true, price })
  } catch (error) {
    console.error("Error updating service price:", error)
    return NextResponse.json({ success: false, error: "Failed to update service price" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await verifyAdmin()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await request.json()
    await deleteServicePrice(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting service price:", error)
    return NextResponse.json({ success: false, error: "Failed to delete service price" }, { status: 500 })
  }
}
