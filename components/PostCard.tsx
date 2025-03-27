import Link from "next/link";
import { Post } from "@prisma/client";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl p-5">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-52 object-cover rounded-xl mb-4"
        />
      )}

      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        {post.title}
      </h2>

      <p className="text-gray-600 leading-relaxed">
        {post.content.substring(0, 100)}...
      </p>

      {/* Tags хэсэг */}
      {post.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/posts/${post.id}`}
        className="mt-4 inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Дэлгэрэнгүй
      </Link>
    </div>
  );
}
