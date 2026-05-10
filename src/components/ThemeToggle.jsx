import { Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themeSlice.js';

export default function ThemeToggle() {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const isDark = mode === 'dark';
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      className="grid h-10 w-10 place-items-center rounded-[8px] border border-[#d8e0ea] bg-white text-[#526071] transition hover:border-[#155eef] hover:bg-[#eef4ff] hover:text-[#155eef]"
      onClick={() => dispatch(toggleTheme())}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Light theme' : 'Dark theme'}
    >
      <Icon aria-hidden="true" className="h-5 w-5" />
    </button>
  );
}
