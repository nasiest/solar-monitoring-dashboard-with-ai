import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "../context/useContext"; // <-- adjust path

export const metadata: Metadata = {
  title: "Solar Monitoring Dashboard",
  description: "AI-powered solar performance and management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
