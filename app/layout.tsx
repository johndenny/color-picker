import { Inter } from "next/font/google";
import styles from "./page.module.css";
import "./globals.css";

export const metadata = {
  title: "Color Picker",
  description: "Color picker",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
