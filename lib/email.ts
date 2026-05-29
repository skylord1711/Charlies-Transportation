import nodemailer from "nodemailer"
import fs from "fs"
import path from "path"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const inboxPath = path.join(process.cwd(), "data", "inbox.json")

function readInbox(): any[] {
  try {
    if (!fs.existsSync(inboxPath)) return []
    const raw = fs.readFileSync(inboxPath, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function appendToInbox(entry: any): void {
  const inbox = readInbox()
  inbox.push({ ...entry, receivedAt: new Date().toISOString() })
  fs.writeFileSync(inboxPath, JSON.stringify(inbox, null, 2), "utf-8")
}

export async function sendEmail({
  to,
  subject,
  html,
  fallbackData,
}: {
  to: string
  subject: string
  html: string
  fallbackData?: Record<string, any>
}) {
  const smtpConfigured = process.env.GMAIL_EMAIL && process.env.GMAIL_APP_PASSWORD

  if (!smtpConfigured) {
    if (fallbackData) {
      appendToInbox({ subject, ...fallbackData })
    }
    return { success: true, method: "local" }
  }

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to,
      subject,
      html,
    })
    return { success: true, method: "email" }
  } catch (error) {
    console.error("Email send error:", error)
    if (fallbackData) {
      appendToInbox({ subject, ...fallbackData })
    }
    return { success: true, method: "local" }
  }
}

export function formatContactEmail(data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1e40af; color: white; padding: 20px; text-align: center;">
        <h1>New Contact Form Submission</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #e5e7eb;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      </div>
      <div style="background: #f3f4f6; padding: 10px; text-align: center; font-size: 12px; color: #6b7280;">
        <p>Charlie's Transportation - 732-381-6000</p>
      </div>
    </div>
  `
}

export function formatBookingEmail(data: {
  name: string
  phone: string
  pickup: string
  dropoff: string
  stepType: string
  assistanceRequired: string
  weight: string
  date: string
  notes: string
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1e40af; color: white; padding: 20px; text-align: center;">
        <h1>New Booking Inquiry</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #e5e7eb;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Pickup Location:</strong> ${data.pickup}</p>
        <p><strong>Dropoff Location:</strong> ${data.dropoff}</p>
        <p><strong>Step Type:</strong> ${data.stepType}</p>
        <p><strong>2-Person Assistance Required:</strong> ${data.assistanceRequired}</p>
        <p><strong>Estimated Weight:</strong> ${data.weight} lbs</p>
        <p><strong>Preferred Date:</strong> ${data.date || "Not specified"}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p><strong>Notes:</strong></p>
        <p>${data.notes ? data.notes.replace(/\n/g, "<br>") : "None provided"}</p>
      </div>
      <div style="background: #f3f4f6; padding: 10px; text-align: center; font-size: 12px; color: #6b7280;">
        <p>Charlie's Transportation - 732-381-6000</p>
      </div>
    </div>
  `
}
