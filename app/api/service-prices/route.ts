import { NextResponse } from "next/server"

// Mock data - in a real app, this would come from your database
const mockServicePrices = [
  { id: "1", service_name: "birth-chart", price: "₹2,999", original_price: "₹3,999" },
  { id: "2", service_name: "relationship", price: "₹2,499", original_price: "₹3,299" },
  { id: "3", service_name: "career", price: "₹2,799", original_price: "₹3,599" },
  { id: "4", service_name: "health", price: "₹2,299", original_price: "₹2,999" },
  { id: "5", service_name: "chakra-healing", price: "₹1,999", original_price: "₹2,499" },
  { id: "6", service_name: "spiritual-counseling", price: "₹2,299", original_price: "₹2,799" },
  { id: "7", service_name: "past-life", price: "₹3,499", original_price: "₹3,999" },
  { id: "8", service_name: "grah-shanti", price: "₹3,999", original_price: "₹4,999" },
  { id: "9", service_name: "navagraha", price: "₹5,999", original_price: "₹6,999" },
  { id: "10", service_name: "monthly-pooja", price: "₹2,999/month", original_price: "₹3,499/month" },
]

export async function GET() {
  try {
    return NextResponse.json({ prices: mockServicePrices })
  } catch (error) {
    console.error("Error fetching service prices:", error)
    return NextResponse.json({ error: "Failed to fetch service prices" }, { status: 500 })
  }
}
