import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RegisterBody = await req.json();
    const { name, email, password } = body;

    // 🔎 Шалгах: Хэрэглэгч бүртгэлтэй эсэх
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already registered!" },
        { status: 400 }
      );
    }

    // 🔐 Нууц үг давхарлах (hash хийх)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🆕 Шинэ хэрэглэгч үүсгэх
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // ✅ Hash хийгдсэн нууц үг хадгалах
        accounts: {
          create: {
            type: "credentials",
            provider: "credentials",
            providerAccountId: email,
          },
        },
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
