import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="w-full py-4 bg-blue-600">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white">
          <Link href="/">flowMRP</Link>
        </h1>
        <div className="space-x-4">
          <Link
            className="bg-white text-blue-600 mx-1 px-4 py-2 rounded hover:bg-gray-200 transition"
            href="/login"
          >
            Giriş Yap
          </Link>
          <Link
            className="bg-white text-blue-600 mx-1 px-4 py-2 rounded hover:bg-gray-200 transition"
            href="/register"
          >
            Kaydol
          </Link>
        </div>
      </nav>
    </div>
  );
}
