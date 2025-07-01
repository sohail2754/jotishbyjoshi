import { NextResponse } from "next/server"

// Mock data for service prices
const servicePrices = [
  {
    id: "1",
    service_name: "birth-chart",
    price: "₹950",
    original_price: null,
  },
  {
    id: "2",
    service_name: "relationship",
    price: "₹950",
    original_price: null,
  },
  {
    id: "3",
    service_name: "career",
    price: "₹950",
    original_price: null,
  },
  {
    id: "4",
    service_name: "health",
    price: "₹950",
    original_price: null,
  },
  {
    id: "5",
    service_name: "chakra-healing",
    price: "₹950",
    original_price: null,
  },
  {
    id: "6",
    service_name: "spiritual-counseling",
    price: "₹950",
    original_price: null,
  },
  {
    id: "7",
    service_name: "past-life",
    price: "₹950",
    original_price: null,
  },
  {
    id: "8",
    service_name: "grah-shanti",
    price: "₹950",
    original_price: null,
  },
  {
    id: "9",
    service_name: "navagraha",
    price: "₹950",
    original_price: null,
  },
  {
    id: "10",
    service_name: "monthly-pooja",
    price: "₹950",
    original_price: null,
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      prices: servicePrices,
    })
  } catch (error) {
    console.error("Error fetching service prices:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch service prices",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { service_name, price, original_price } = body

    // In a real application, you would save this to a database
    const newPrice = {
      id: (servicePrices.length + 1).toString(),
      service_name,
      price,
      original_price,
    }

    servicePrices.push(newPrice)

    return NextResponse.json({
      success: true,
      price: newPrice,
    })
  } catch (error) {
    console.error("Error creating service price:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create service price",
      },
      { status: 500 },
    )
  }
}
