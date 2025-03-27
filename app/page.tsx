import React from "react";
import { ChevronRight, User, FileText } from "lucide-react";
import Link from "next/link";

const MinimalistBlogHero = () => {
  return (
    <div className="h-screen w-sc relative bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-20 blur-3xl"></div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <div
          className="w-32 h-32 bg-white rounded-full mb-8 shadow-lg flex items-center justify-center 
          transform transition-all duration-500 hover:scale-105 hover:rotate-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-16 h-16 text-gray-500 animate-pulse"
          >
            <path d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>

        <h1
          className="text-5xl font-extralight tracking-tight mb-5 
          bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600"
        >
          Миний блог
        </h1>

        <p className="text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
          Энгийн бичлэг, гүн утга, хялбар загвар. Миний бодол, миний туршлага,
          миний ертөнц.
        </p>

        <div className="flex space-x-4 group">
          <Link
            href="/posts"
            className="bg-blue-600 text-white px-7 py-3 rounded-lg 
              hover:bg-blue-700 transition-all duration-300 
              flex items-center space-x-2 
              group-hover:shadow-xl group-hover:-translate-y-1"
          >
            <FileText className="w-5 h-5" />
            <span>Нийтлэлүүд</span>
            <ChevronRight className="ml-2 w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/about"
            className="border border-gray-300 text-gray-700 
              px-7 py-3 rounded-lg 
              hover:bg-gray-100 
              transition-all duration-300 
              flex items-center space-x-2 
              group-hover:shadow-md"
          >
            <User className="w-5 h-5" />
            <span>Миний тухай</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MinimalistBlogHero;
