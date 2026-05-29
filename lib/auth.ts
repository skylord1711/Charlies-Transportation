import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "charlies-transportation-secret-key-change-in-production"
)

export async function createToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload.role === "admin"
  } catch {
    return false
  }
}

export async function getSession() {
  const cookieStore = cookies()
  const token = cookieStore.get("admin_token")?.value
  if (!token) return false
  return verifyToken(token)
}

export async function validatePassword(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123"
  return password === adminPassword
}
