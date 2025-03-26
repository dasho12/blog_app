import prisma from '../../../../lib/prisma';
import { Post } from '@prisma/client';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const post: Post | null = await prisma.post.findUnique({
    where: { id: params.id },
    include: { comments: true },
  });
  if (!post) return new Response('Post not found', { status: 404 });
  return Response.json(post);
}