import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import AnimatedBackground from "@/components/AnimatedBackground";
import VagabondWatermark from "@/components/VagabondWatermark";
import SakuraRain from "@/components/SakuraRain";
import { AdminProvider } from "@/contexts/AdminContext";
import QuakeTerminal from "@/components/QuakeTerminal";
import ZenMode from "@/components/ZenMode";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
    title: "Ali Ahmed | Digital Ronin",
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
                    <AdminProvider>
                        <AnimatedBackground />
                        <VagabondWatermark />
                        <SakuraRain />
                        <PageLoader />
                        <CustomCursor />
                        <ErrorBoundary>
                            {children}
                        </ErrorBoundary>
                        <QuakeTerminal />
                        <ZenMode />
                    </AdminProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
