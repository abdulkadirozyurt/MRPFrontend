"use client";

import styles from "../../layout.module.scss";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col p-8 w-full items-center justify-center">
      <h2 className="text-4xl font-bold mb-4">Welcome to flowMRP!</h2>
      <p className="text-xl mb-8 text-center">
        Manage your materials and production plans efficiently with our solution.
      </p>
    </main>
  );
}
