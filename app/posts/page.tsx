"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Newspaper, ChevronRight, Lock, ChevronLeft } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
  createdAt: string;
  author?: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  limit: number;
}

export default function PostsPage() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    limit: 10,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      if (status === "authenticated") {
        try {
          const res = await fetch(
            `/api/posts?page=${pagination.currentPage}&limit=${pagination.limit}`,
            { cache: "no-store" }
          );

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(
              `Алдаа гарлаа: ${res.status} - ${
                errorData.details || errorData.error
              }`
            );
          }

          const data = await res.json();
          console.log("API Response:", data);

          if (!Array.isArray(data.posts)) {
            throw new Error("Нийтлэлүүд буруу форматтай байна.");
          }

          setPosts(data.posts);
          setPagination({
            currentPage: data.pagination.currentPage,
            totalPages: data.pagination.totalPages,
            totalPosts: data.pagination.totalPosts,
            limit: data.pagination.limit,
          });
        } catch (error: any) {
          setError(error.message);
          console.error("Failed to fetch posts:", error);
        }
      }
    };

    fetchPosts();
  }, [status, pagination.currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Уншиж байна...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-2xl text-center">
          <Lock className="mx-auto mb-6 text-red-500" size={64} />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Нэвтрэх шаардлагатай
          </h2>
          <p className="text-gray-600 mb-6">
            Нийтлэлүүдийг харахын тулд нэвтэрнэ үү
          </p>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Нэвтрэх
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center">
            <Newspaper className="mr-4 text-blue-600" size={36} />
            Бүх Нийтлэлүүд
          </h1>
          {session && (
            <p className="text-sm text-gray-500 mt-2">
              Сайн байна уу, {session.user?.name || session.user?.email}
            </p>
          )}
        </div>
        <LogoutButton />

        {error && (
          <p className="text-red-500 text-center bg-red-100 p-4 rounded-lg">
            Алдаа: {error}
          </p>
        )}

        {posts.length === 0 ? (
          <div className="text-center bg-white shadow-md rounded-lg p-16">
            <Newspaper className="mx-auto mb-6 text-gray-300" size={64} />
            <p className="text-gray-500 text-xl">
              Одоогоор нийтлэл байхгүй байна
            </p>
            <Link
              href="/posts/new"
              className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Эхний нийтлэл үүсгэх
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-transform duration-300 hover:scale-105 p-5"
                >
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
                  {post.author && (
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="font-semibold">Зохиогч:</span>{" "}
                      {post.author.name}
                    </p>
                  )}
                  <Link
                    href={`/posts/${post.id}`}
                    className="inline-flex items-center mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Дэлгэрэнгүй
                    <ChevronRight className="ml-2" size={20} />
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-700 transition-all"
              >
                <ChevronLeft className="mr-2" size={20} />
                Өмнөх
              </button>
              <span className="text-gray-700">
                Хуудас {pagination.currentPage} / {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-700 transition-all"
              >
                Дараах
                <ChevronRight className="ml-2" size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
