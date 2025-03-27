"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Newspaper, ChevronRight, Check } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
  createdAt: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts`, { cache: "no-store" });
        const data = await res.json();

        const sortedData = data.sort(
          (a: Post, b: Post) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPosts(sortedData);
        setFilteredPosts(sortedData);

        const tagsSet = new Set<string>();
        data.forEach((post: Post) =>
          post.tags?.forEach((tag) => tagsSet.add(tag))
        );
        setAllTags(Array.from(tagsSet));
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const toggleTag = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);

    if (updatedTags.length > 0) {
      setFilteredPosts(
        posts.filter((post) => post.tags?.some((t) => updatedTags.includes(t)))
      );
    } else {
      setFilteredPosts(posts);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center">
            <Newspaper className="mr-4 text-blue-600" size={36} />
            Бүх Нийтлэлүүд
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Миний бодол, туршлага, түүх бүхий тэмдэглэл
          </p>
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                  selectedTags.includes(tag)
                    ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {selectedTags.includes(tag) && <Check size={16} />}#{tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => {
                  setSelectedTags([]);
                  setFilteredPosts(posts);
                }}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-300 text-gray-800 hover:bg-gray-400 transition-all duration-300"
              >
                Бүх нийтлэлийг харах
              </button>
            )}
          </div>
        )}

        {filteredPosts.length === 0 ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
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

                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
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
        )}
      </div>
    </div>
  );
}
