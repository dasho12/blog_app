import Link from 'next/link';
import { Post } from '../lib/types';

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      <p>{post.content.substring(0, 100)}...</p>
      <Link href={`/posts/${post.id}`}>Дэлгэрэнгүй</Link>
    </div>
  );
}