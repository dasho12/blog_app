import prisma from '../../../lib/prisma';
import { Post } from '@prisma/client';

export async function GET() {
  const posts: Post[] = await prisma.post.findMany({
    include: { comments: true },
    orderBy: { createdAt: 'desc' },
  });
  return Response.json(posts);
}

export async function POST(request: Request) {
  const { title, content, imageUrl }: Partial<Post> = await request.json();
  const post = await prisma.post.create({
    data: { title: title!, content: content!, imageUrl },
  });
  return Response.json(post);
}