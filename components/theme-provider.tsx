'use client';

import { useEffect, useState } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('webgen-theme');
    
    if (savedTheme) {
      const isDarkMode = savedTheme === 'dark';
      setIsDark(isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      }
    } else {
      // Fallback to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      // Store the toggle function globally so it can be accessed from anywhere
      (window as any).__toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        if (newIsDark) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('webgen-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('webgen-theme', 'light');
        }
      };
    }
  }, [isDark, isMounted]);

  // Prevent hydration mismatch
  if (!isMounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
