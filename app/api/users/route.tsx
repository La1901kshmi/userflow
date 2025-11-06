import { NextResponse } from "next/server";

let users: { name: string; phone: string }[] = [];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { name, phone } = await request.json();
  users.push({ name, phone });
  return NextResponse.json({ message: "User added successfully", users });
}
