import { NextResponse } from "next/server"
import { sendEmail, formatContactEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const html = formatContactEmail({ name, email, phone, subject, message })
    const result = await sendEmail({
      to: process.env.CONTACT_EMAIL || "nazihmafargeh@gmail.com",
      subject: "Contact Form Submission - Charlie's Transportation",
      html,
    })

    if (result.success) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
