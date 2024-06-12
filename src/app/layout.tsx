"use client";

import { ThirdwebProvider } from "thirdweb/react";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <ThirdwebProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 bg-gray-800 text-white">
              <Navbar />
              <div className="p-4">{children}</div>
            </div>
          </div>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
