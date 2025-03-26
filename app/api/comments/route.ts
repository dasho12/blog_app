import prisma from '../../../lib/prisma';
import { Comment } from '../../../lib/types';

export async function POST(request: Request) {
  const { text, postId }: Partial<Comment> = await request.json();
  const comment = await prisma.comment.create({
    data: { text: text!, postId: postId! },
  });
  return Response.json(comment);
}