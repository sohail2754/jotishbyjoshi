import { NextResponse } from "next/server"

// Mock data for class prices
const classPrices = [
  {
    id: "1",
    class_name: "foundation",
    price: "₹2,000/month",
    original_price: null,
  },
  {
    id: "2",
    class_name: "advanced",
    price: "₹2,000/month",
    original_price: null,
  },
  {
    id: "3",
    class_name: "specialized",
    price: "₹2,000/month",
    original_price: null,
  },
  {
    id: "4",
    class_name: "remedial",
    price: "₹2,000/month",
    original_price: null,
  },
  {
    id: "5",
    class_name: "professional",
    price: "₹2,000/month",
    original_price: null,
  },
  {
    id: "6",
    class_name: "masterclass",
    price: "₹2,000/month",
    original_price: null,
  },
  {
    id: "7",
    class_name: "practice-kundali",
    price: "₹500/month",
    original_price: null,
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      prices: classPrices,
    })
  } catch (error) {
    console.error("Error fetching class prices:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch class prices",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { class_name, price, original_price } = body

    // In a real application, you would save this to a database
    const newPrice = {
      id: (classPrices.length + 1).toString(),
      class_name,
      price,
      original_price,
    }

    classPrices.push(newPrice)

    return NextResponse.json({
      success: true,
      price: newPrice,
    })
  } catch (error) {
    console.error("Error creating class price:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create class price",
      },
      { status: 500 },
    )
  }
}
