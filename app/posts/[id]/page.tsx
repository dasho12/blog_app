import CommentForm from '../../../components/CommentForm';
import { Post } from '../../../lib/types';

export default async function PostPage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/posts/${params.id}`, { cache: 'no-store' });
  const post: Post = await res.json();

  return (
    <div className="container">
      <h1>{post.title}</h1>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      <p>{post.content}</p>
      <h2>Сэтгэгдэл</h2>
      {post.comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>{comment.text}</p>
          <small>{new Date(comment.createdAt).toLocaleString()}</small>
        </div>
      ))}
      <CommentForm postId={post.id} />
    </div>
  );
}