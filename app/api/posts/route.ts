import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  try {
    const skip = (page - 1) * limit;

    console.log("Fetching posts with params:", { tag, page, limit, skip });

    const posts = await prisma.post.findMany({
      where: tag ? { tags: { has: tag } } : {},
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    // tags-ыг шалгаж, засах
    const sanitizedPosts = posts.map((post) => ({
      ...post,
      tags: Array.isArray(post.tags)
        ? post.tags
        : typeof post.tags === "string"
        ? [post.tags]
        : [],
    }));

    console.log("Sanitized posts:", sanitizedPosts);

    const totalPosts = await prisma.post.count({
      where: tag ? { tags: { has: tag } } : {},
    });

    console.log("Total posts:", totalPosts);

    const totalPages = Math.ceil(totalPosts / limit);

    return NextResponse.json(
      {
        posts: sanitizedPosts,
        pagination: {
          currentPage: page,
          totalPages,
          totalPosts,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Detailed API Error:", error);
    return NextResponse.json(
      {
        error: "Алдаа гарлаа",
        details: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Нэвтрэх шаардлагатай" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, content, imageUrl, tags, authorId } = body;

    // authorId байхгүй бол алдаа гаргах
    if (!authorId || typeof authorId !== "string") {
      return NextResponse.json(
        { message: "Хэрэглэгчийн ID шаардлагатай" },
        { status: 400 }
      );
    }

    // Гарчиг болон агуулга шалгах
    if (!title || !content) {
      return NextResponse.json(
        { message: "Гарчиг болон агуулга оруулна уу" },
        { status: 400 }
      );
    }

    // Шинэ нийтлэл үүсгэх
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl: imageUrl || null,
        tags: tags && Array.isArray(tags) ? tags : [],
        authorId,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Нийтлэл үүсгэх алдаа:", error);
    return NextResponse.json({ message: "Алдаа гарлаа" }, { status: 500 });
  }
}
