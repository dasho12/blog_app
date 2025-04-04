import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      { message: "Хэрэглэгч нэвтрээгүй байна" },
      { status: 401 }
    );
  }

  try {
    const posts = await prisma.post.findMany({
      where: { authorId: session.user.id },
      orderBy: { createdAt: "desc" }, // Шинэ нийтлэл эхэндээ гарах
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Алдаа:", error);
    return NextResponse.json({ message: "Алдаа гарлаа" }, { status: 500 });
  }
}
