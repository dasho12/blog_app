"use client";

import { useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Check for session and store token on component mount or after auth state changes
  useEffect(() => {
    const storeTokenInSessionStorage = async () => {
      const session = await getSession();
      if (session) {
        // Store the session data in sessionStorage
        sessionStorage.setItem("authToken", JSON.stringify(session));
        console.log("Token stored in session storage:", session);
      }
    };

    storeTokenInSessionStorage();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Нэвтрэх үед алдаа гарлаа. Имэйл болон нууц үгээ шалгана уу.");
      } else {
        // Get the session after successful login and store in sessionStorage
        const session = await getSession();
        if (session) {
          sessionStorage.setItem("authToken", JSON.stringify(session));
          console.log("Token stored in session storage:", session);
        }
        router.push("/posts");
      }
    } catch (err) {
      setError("Системийн алдаа гарлаа");
    }
  };

  // For social logins, we need to handle token storage after redirect
  // This is why we have the useEffect above to check for session after redirect completes
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/posts" });
  };

  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl: "/posts" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Нэвтрэх</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Имэйл
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Нууц үг
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Нэвтрэх
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">Эсвэл нэвтрэх:</p>
          <div className="flex justify-center space-x-4 mt-2">
            <button
              onClick={handleGoogleSignIn}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Google
            </button>
            <button
              onClick={handleGithubSignIn}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
            >
              GitHub
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Бүртгэл байхгүй юу?
            <a href="/register" className="text-blue-500 hover:underline ml-1">
              Бүртгүүлэх
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
