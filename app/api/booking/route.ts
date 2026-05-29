import { NextResponse } from "next/server"
import { sendEmail, formatBookingEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, pickup, dropoff, stepType, assistanceRequired, weight, date, notes } = body

    if (!name || !phone || !pickup || !dropoff || !weight) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 })
    }

    const html = formatBookingEmail({
      name, phone, pickup, dropoff,
      stepType: stepType || "ground",
      assistanceRequired: assistanceRequired || "no",
      weight, date: date || "", notes: notes || "",
    })

    const result = await sendEmail({
      to: process.env.CONTACT_EMAIL || "nazihmafargeh@gmail.com",
      subject: "Booking Inquiry - Charlie's Transportation",
      html,
      fallbackData: {
        type: "booking", name, phone, pickup, dropoff,
        stepType, assistanceRequired, weight, date, notes,
      },
    })

    if (result.success) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Failed to send inquiry" }, { status: 500 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
