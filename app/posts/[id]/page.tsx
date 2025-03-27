import CommentForm from "../../../components/CommentForm";
import { Post } from "../../../lib/types";
import { Calendar, User, MessageCircle } from "lucide-react";
import Link from "next/link";

export default async function PostPage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/posts/${params.id}`, {
    cache: "no-store",
  });
  const post: Post = await res.json();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {post.imageUrl && (
            <div className="h-96 w-full overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <User size={20} className="text-blue-600" />
                  <span>Би өөрөө</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={20} className="text-blue-600" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
            </header>

            <div className="prose max-w-none text-gray-800 mb-12">
              {post.content}
            </div>

            {/* Comments Section */}
            <section className="border-t pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <MessageCircle className="mr-3 text-blue-600" size={24} />
                Сэтгэгдэл ({post.comments.length})
              </h2>

              {post.comments.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  Одоогоор сэтгэгдэл байхгүй байна
                </div>
              ) : (
                <div className="space-y-4">
                  {post.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-100 p-4 rounded-lg"
                    >
                      <p className="text-gray-800 mb-2">{comment.text}</p>
                      <small className="text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </small>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <CommentForm postId={post.id} />
              </div>
            </section>
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link
            href="/posts"
            className="text-blue-600 hover:text-blue-800 transition"
          >
            ← Буцах
          </Link>
        </div>
      </div>
    </div>
  );
}
