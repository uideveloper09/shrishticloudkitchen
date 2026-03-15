import { NextResponse } from "next/server";
import { addUser, getUserByEmail } from "@/lib/users-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, password, referralCode } = body;

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    if (getUserByEmail(email)) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    addUser({
      email: email.trim().toLowerCase(),
      name: name.trim(),
      phone: (phone ?? "").trim(),
      password,
      referralCode: referralCode?.trim() || undefined,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Registration failed." },
      { status: 500 }
    );
  }
}
