import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { getContent, saveContent, getFleet, saveFleet, getContactInfo, saveContactInfo } from "@/lib/content"

export async function GET(request: Request) {
  const isAuth = await getSession()
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  switch (type) {
    case "content":
      return NextResponse.json(getContent())
    case "fleet":
      return NextResponse.json(getFleet())
    case "contact":
      return NextResponse.json(getContactInfo())
    default:
      return NextResponse.json({ error: "Invalid type" }, { status: 400 })
  }
}

export async function POST(request: Request) {
  const isAuth = await getSession()
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const body = await request.json()

  switch (type) {
    case "content":
      saveContent(body)
      return NextResponse.json({ success: true })
    case "fleet":
      saveFleet(body)
      return NextResponse.json({ success: true })
    case "contact":
      saveContactInfo(body)
      return NextResponse.json({ success: true })
    default:
      return NextResponse.json({ error: "Invalid type" }, { status: 400 })
  }
}
