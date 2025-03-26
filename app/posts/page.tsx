import PostCard from '../../components/PostCard';
import { Post } from '../../lib/types';

export default async function Posts() {
  const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' });
  const posts: Post[] = await res.json();

  return (
    <div className="container">
      <h1>Бүх Постууд</h1>
      <div className="posts">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}