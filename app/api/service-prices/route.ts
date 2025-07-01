import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock data for now - replace with actual database query
    const servicePrices = [
      {
        id: "birth-chart-analysis",
        name: "Birth Chart Analysis",
        price: 2500,
        currency: "INR",
        description: "Complete birth chart reading with detailed analysis",
      },
      {
        id: "marriage-compatibility",
        name: "Marriage Compatibility",
        price: 3500,
        currency: "INR",
        description: "Comprehensive compatibility analysis for couples",
      },
      {
        id: "career-guidance",
        name: "Career Guidance",
        price: 2000,
        currency: "INR",
        description: "Professional career guidance based on planetary positions",
      },
      {
        id: "health-wellness",
        name: "Health & Wellness",
        price: 2200,
        currency: "INR",
        description: "Health predictions and wellness recommendations",
      },
      {
        id: "practice-kundali",
        name: "Practice Kundali for Students",
        price: 1500,
        currency: "INR",
        description: "Monthly practice sessions for astrology students",
        billing: "monthly",
      },
      {
        id: "grah-shanti-pooja",
        name: "Grah Shanti Pooja",
        price: 2100,
        currency: "INR",
        description: "Planetary peace ceremony",
      },
      {
        id: "mangal-dosha-pooja",
        name: "Mangal Dosha Pooja",
        price: 1800,
        currency: "INR",
        description: "Mars defect remedial ceremony",
      },
      {
        id: "kaal-sarp-pooja",
        name: "Kaal Sarp Pooja",
        price: 2500,
        currency: "INR",
        description: "Serpent deity appeasement ceremony",
      },
      {
        id: "chakra-balancing",
        name: "Chakra Balancing",
        price: 1500,
        currency: "INR",
        description: "Energy center alignment and healing",
      },
      {
        id: "aura-cleansing",
        name: "Aura Cleansing",
        price: 1300,
        currency: "INR",
        description: "Spiritual aura purification session",
      },
    ]

    return NextResponse.json(servicePrices)
  } catch (error) {
    console.error("Error fetching service prices:", error)
    return NextResponse.json({ error: "Failed to fetch service prices" }, { status: 500 })
  }
}
