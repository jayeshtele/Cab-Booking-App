import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ThemeSync() {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const isDark = mode === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = mode;
    localStorage.setItem('cabswift-theme', mode);

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', isDark ? '#0b1220' : '#f6f8fb');
    }
  }, [mode]);

  return null;
}
