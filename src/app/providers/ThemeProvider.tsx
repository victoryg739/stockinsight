"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

interface ThemeContextType {
    isDark: boolean;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ isDark: false, toggle: () => {} });

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(false);

    // Apply the dark class to <html>
    const applyTheme = (dark: boolean) => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    useEffect(() => {
        // Read from localStorage immediately to avoid flash
        const stored = localStorage.getItem("dark_mode");
        if (stored !== null) {
            const dark = stored === "true";
            setIsDark(dark);
            applyTheme(dark);
        }

        // Then sync from DB (authoritative source)
        fetch("/api/user-preferences")
            .then((res) => {
                if (!res.ok) return null;
                return res.json();
            })
            .then((data) => {
                if (data && typeof data.dark_mode === "boolean") {
                    setIsDark(data.dark_mode);
                    applyTheme(data.dark_mode);
                    localStorage.setItem("dark_mode", String(data.dark_mode));
                }
            })
            .catch(() => {
                // Not authenticated or network error — keep localStorage value
            });
    }, []);

    const toggle = useCallback(() => {
        setIsDark((prev) => {
            const next = !prev;
            applyTheme(next);
            localStorage.setItem("dark_mode", String(next));
            // Persist to DB
            fetch("/api/user-preferences", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dark_mode: next }),
            }).catch(() => {});
            return next;
        });
    }, []);

    return (
        <ThemeContext.Provider value={{ isDark, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}
