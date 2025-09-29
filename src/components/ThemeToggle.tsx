import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 px-3 py-1 rounded-[15px] border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors"
    >
      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="text-sm">{isDarkMode ? "Light" : "Dark"}</span>
    </button>
  );
};
