import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import NotificationsProvider from "./NotificationsProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NotificationsProvider />
          {children}
        </Providers>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
          }}
        />
      </body>
    </html>
  );
}
