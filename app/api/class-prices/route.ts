import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock data for now - replace with actual database query
    const classPrices = [
      {
        id: "foundation-vedic-astrology",
        name: "Foundation of Vedic Astrology",
        price: 15000,
        currency: "INR",
        duration: "8 weeks",
        level: "Beginner",
        description: "Complete beginner course in Vedic astrology",
      },
      {
        id: "advanced-predictive-astrology",
        name: "Advanced Predictive Astrology",
        price: 25000,
        currency: "INR",
        duration: "12 weeks",
        level: "Advanced",
        description: "Advanced techniques for professional astrologers",
      },
      {
        id: "specialized-astrology-courses",
        name: "Specialized Astrology Courses",
        price: 18000,
        currency: "INR",
        duration: "6 weeks",
        level: "Specialized",
        description: "Focused courses on specific astrology aspects",
      },
      {
        id: "marriage-astrology-course",
        name: "Marriage & Relationship Astrology",
        price: 12000,
        currency: "INR",
        duration: "4 weeks",
        level: "Intermediate",
        description: "Specialized course on relationship compatibility",
      },
      {
        id: "medical-astrology-course",
        name: "Medical Astrology Course",
        price: 20000,
        currency: "INR",
        duration: "8 weeks",
        level: "Advanced",
        description: "Health predictions through astrological analysis",
      },
    ]

    return NextResponse.json(classPrices)
  } catch (error) {
    console.error("Error fetching class prices:", error)
    return NextResponse.json({ error: "Failed to fetch class prices" }, { status: 500 })
  }
}
