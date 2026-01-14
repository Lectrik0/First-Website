import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
    title: "Ibrahim Elhaddad | Digital Ronin",
    description: "Security Researcher & Developer. Walking the path between tradition and innovation, mastering the art of digital security.",
    keywords: ["security", "cybersecurity", "developer", "researcher", "portfolio"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange={false}
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
