"use client";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  const handleLogout = async () => {
    // Clear the token from session storage
    sessionStorage.removeItem("authToken");

    // Then sign out using NextAuth
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white p-2 rounded"
    >
      Гарах
    </button>
  );
}
