import { NextResponse } from "next/server"

// Mock data - in a real app, this would come from your database
const mockClassPrices = [
  { id: "1", class_name: "foundation", price: "₹15,999", original_price: "₹19,999" },
  { id: "2", class_name: "advanced", price: "₹25,999", original_price: "₹29,999" },
  { id: "3", class_name: "specialized", price: "₹12,999", original_price: "₹15,999" },
  { id: "4", class_name: "remedial", price: "₹18,999", original_price: "₹22,999" },
  { id: "5", class_name: "professional", price: "₹35,999", original_price: "₹39,999" },
  { id: "6", class_name: "masterclass", price: "₹8,999", original_price: "₹10,999" },
]

export async function GET() {
  try {
    return NextResponse.json({ prices: mockClassPrices })
  } catch (error) {
    console.error("Error fetching class prices:", error)
    return NextResponse.json({ error: "Failed to fetch class prices" }, { status: 500 })
  }
}
