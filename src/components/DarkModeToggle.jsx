import { useState } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
      <label className="switch">
          <input type="checkbox" onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
  
  
  );
};

export default DarkModeToggle;
