// "use client";
// import { useState } from "react";
// import { Home, User, Settings, Menu, X } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function SideNav() {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();

//   const navItems = [
//     { href: "/", label: "Нүүр", icon: <Home size={20} /> },
//     { href: "/posts", label: "Нийтлэлүүд", icon: <User size={20} /> },
//     { href: "/posts/new", label: "Шинэ Нийтлэл", icon: <Settings size={20} /> },
//   ];

//   return (
//     <div className="flex flex-col">
//       {/* Top Navbar */}
//       <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[60%] bg-white bg-opacity-80 backdrop-blur-md shadow-md border-b border-gray-200 text-gray-800 p-4 flex justify-between items-center rounded-xl transition-all duration-300 ease-in-out">
//         {/* Logo */}
//         <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md">
//           BL
//         </div>

//         {/* Toggle Button */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-80 transition-all"
//         >
//           {isOpen ? (
//             <X size={24} className="text-gray-700" />
//           ) : (
//             <Menu size={24} className="text-gray-700" />
//           )}
//         </button>
//       </div>

//       {/* Sidebar */}
//       {isOpen && (
//         <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[60%] bg-white bg-opacity-90 backdrop-blur-lg shadow-xl border border-gray-200 text-gray-800 p-4 rounded-xl transition-all duration-300 ease-in-out">
//           {/* Navigation Items */}
//           <nav className="space-y-3">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 ease-in-out ${
//                   pathname === item.href
//                     ? "bg-blue-500 text-white font-semibold shadow-lg"
//                     : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                 }`}
//               >
//                 <div
//                   className={`p-2 rounded-lg ${
//                     pathname === item.href
//                       ? "text-white bg-blue-600"
//                       : "text-gray-500 bg-gray-100"
//                   }`}
//                 >
//                   {item.icon}
//                 </div>
//                 <span>{item.label}</span>
//               </Link>
//             ))}
//           </nav>
//         </div>
//       )}

//       {/* Page Content */}
//       <div className="flex-1 min-h-screen p-6 pt-20 bg-gray-100 transition-all duration-300 ease-in-out"></div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { Home, User, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: <Home size={24} /> },
    { href: "/posts", icon: <User size={24} /> },
    { href: "/posts/new", icon: <Plus size={24} /> },
  ];

  return (
    <div className="fixed top-0 fl left-1/2 transform -translate-x-1/2 w-[90%] md:w-[60%] bg-white bg-opacity-80 backdrop-blur-md shadow-md border-b border-gray-200 text-gray-800 px-6 p-4 flex justify-between items-center space-x-6 rounded-[50px] z-50">
      <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md">
        BL
      </div>
      <div></div>
      <div></div>
      <div></div>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`p-3 rounded-full transition-all duration-200 ease-in-out ${
            pathname === item.href
              ? "bg-blue-500 text-white shadow-lg"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
}
