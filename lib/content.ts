import fs from "fs"
import path from "path"
import type { SiteContent, ContactInfo } from "@/types/content"

const dataDir = path.join(process.cwd(), "data")

export function readJSON<T>(filename: string): T {
  const filePath = path.join(dataDir, filename)
  const raw = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(raw)
}

export function writeJSON<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
}

export function getContent(): SiteContent {
  return readJSON<SiteContent>("content.json")
}

export function saveContent(content: SiteContent): void {
  writeJSON("content.json", content)
}
export function getContactInfo(): ContactInfo {
  return readJSON<ContactInfo>("contact.json")
}

export function saveContactInfo(info: ContactInfo): void {
  writeJSON("contact.json", info)
}
