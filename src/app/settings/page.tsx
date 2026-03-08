"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useTheme } from "../providers/ThemeProvider";

export default function SettingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { isDark, toggle } = useTheme();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") {
        return null;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <Navbar />
            <main className="max-w-2xl mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
                    {/* Dark Mode Row */}
                    <div className="flex items-center justify-between px-6 py-4">
                        <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                Switch between light and dark appearance
                            </p>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={isDark}
                            onClick={toggle}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                                isDark ? "bg-blue-600" : "bg-gray-300"
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                                    isDark ? "translate-x-6" : "translate-x-1"
                                }`}
                            />
                        </button>
                    </div>
                </div>

                <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                    Preferences are saved to your account.
                </p>
            </main>
        </div>
    );
}
