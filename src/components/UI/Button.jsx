import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '',
  disabled = false,
  icon = null
}) => {
  const baseClasses = 'px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 justify-center';
  
  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-400',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-400',
    danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400',
    success: 'bg-green-600 hover:bg-green-700 text-white disabled:bg-green-400',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;