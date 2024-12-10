"use client";

import styles from "../layout.module.scss";

export default function Home() {
  return (
    <main className={styles.mainContent}>
      <h2 className={styles.mainTitle}>Welcome to flowMRP!</h2>
      <p className={styles.mainText}>
        Manage your materials and production plans efficiently with our
        solution.
      </p>
      
    </main>
  );
}
