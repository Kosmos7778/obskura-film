import { NextResponse } from "next/server";

// Позволяет включить API-роут в статический экспорт (GitHub Pages)
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}