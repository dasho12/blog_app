import prisma from "../../../lib/prisma";
import { Post } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");

  try {
    let posts;
    if (tag) {
      posts = await prisma.post.findMany({
        where: { tags: { has: tag || "" } }, // Тухайн tag-тэй постуудыг хайна
      });
    } else {
      posts = await prisma.post.findMany();
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { title, content, imageUrl, tags }: Partial<Post> =
    await request.json();

  // Тагуудын утгуудыг шалгах
  const post = await prisma.post.create({
    data: {
      title: title!,
      content: content!,
      imageUrl,
      tags: tags && Array.isArray(tags) ? tags : [],
    },
  });

  return Response.json(post);
}
