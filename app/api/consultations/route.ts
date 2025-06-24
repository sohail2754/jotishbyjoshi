import { type NextRequest, NextResponse } from "next/server"
import { createConsultation } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "service_type", "preferred_date", "preferred_time"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    const consultation = await createConsultation(data)

    return NextResponse.json(
      {
        message: "Consultation booked successfully",
        consultation,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating consultation:", error)
    return NextResponse.json({ error: "Failed to book consultation" }, { status: 500 })
  }
}
