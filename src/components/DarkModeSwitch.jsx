'use client'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeSwitch() {

  const { theme, setTheme, systemTheme } = useTheme();
  const [ mounted, setMounted ] = useState(false);
  // const currentTheme = theme === 'system' ? systemTheme : theme;
  const currentTheme = 'light';
  useEffect(() => setMounted(true), []);
  return (
    <div>
      {mounted ? 
        <button className="flex justify-center items-center border p-2 rounded-full"
        onClick={() => {currentTheme && currentTheme === 'light' ? setTheme('dark') : setTheme('light')}}>
          {currentTheme && currentTheme === 'light' ? 
          <span className="material-symbols-outlined">dark_mode</span>
          : <span className="material-symbols-outlined">light_mode</span>}
        </button>
        : <div className="flex justify-center items-center border p-2 rounded-full"><span className="material-symbols-outlined">pending</span></div>
      }
    </div>
  )
}
