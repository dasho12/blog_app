"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTag, setSearchTag] = useState(searchParams.get("tag") || "");
  const [isOpen, setIsOpen] = useState(false); // Sidebar-ийн төлөв

  // Жишээ tag-ууд
  const predefinedTags = ["tech", "news", "blog", "coding"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTag.trim()) {
      router.push(`/posts?tag=${encodeURIComponent(searchTag.trim())}`);
    } else {
      router.push("/posts");
    }
    setIsOpen(false); // Хайлтын дараа sidebar-ийг хаах
  };

  return (
    <>
      {/* Жижиг дэлгэц дээрх товчлуур */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-blue-600 text-white rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full bg-white shadow-lg w-64 transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tag-ууд</h2>
          <div className="flex flex-col gap-2 mb-4">
            {predefinedTags.map((tag) => (
              <Link
                key={tag}
                href={`/posts?tag=${tag}`}
                onClick={() => setIsOpen(false)} // Жижиг дэлгэц дээр хаах
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  searchParams.get("tag") === tag
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tag}
              </Link>
            ))}
          </div>
          <form onSubmit={handleSearch} className="flex flex-col gap-2">
            <input
              type="text"
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
              placeholder="Search"
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Хайх
            </button>
          </form>
        </div>
      </nav>

      {/* Overlay (жижиг дэлгэц дээр sidebar нээлттэй үед) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
