import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello from the API route!" });
}

export async function POST(request: Request) {
  const data = await request.json();
  // Process data here
  return NextResponse.json({ received: data });
}
