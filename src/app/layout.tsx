"use client";

import "./global.scss";
import Link from "next/link";
import { Provider } from "react-redux";
import styles from "./layout.module.scss";
import store from "@/utilities/redux/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>flowMRP</title>
      </head>
      <body className="min-h-screen">
        <Provider store={store}>
          <AntdRegistry>
            
              <div className={styles.mainContainer}>
                {/* Header */}
                <header className={styles.header}>
                  <nav className={styles.navbar}>
                    <h1 className={styles.navbarTitle}>
                      <Link href="/">flowMRP</Link>
                    </h1>
                    <div className="space-x-4">
                      <Link className={styles.navbarLink} href="/login">
                        Giriş Yap
                      </Link>
                      <Link className={styles.navbarLink} href="/register">
                        Kaydol
                      </Link>
                    </div>
                  </nav>
                </header>

                {/* Ana İçerik */}
                <div className={styles.mainContent}>{children}</div>

                {/* Footer */}
                <footer className={styles.footer}>
                  <p>&copy; 2024 flowMRP. All rights reserved.</p>
                </footer>
              </div>
            
          </AntdRegistry>
        </Provider>
      </body>
    </html>
  );
}
