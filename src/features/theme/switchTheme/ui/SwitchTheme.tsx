import React from 'react';
import useSwitchTheme from '../useSwitchTheme';

export const SwitchTheme = () => {
  const [colorTheme, setTheme] = useSwitchTheme();

  return (
    <div>
      <button
        onClick={() => {
          setTheme('light');
        }}>
        Light Mode
      </button>
      <button
        onClick={() => {
          setTheme('dark');
        }}>
        Dark Mode
      </button>
    </div>
  );
};
