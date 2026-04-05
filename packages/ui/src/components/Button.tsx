import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  /**
   * Custom animation properties for antigravity floating effect.
   * Provide CSS variable values like '--duration', '--amplitude', '--delay'.
   */
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  style,
  children,
  ...rest
}) => {
  const baseClasses =
    'px-4 py-2 font-medium text-sm rounded-input transition-colors duration-200';
  const variantClasses =
    variant === 'primary'
      ? 'bg-indigo text-white hover:bg-indigoTint'
      : 'bg-transparent text-indigo border border-[0.5px] border-stone hover:bg-indigo hover:text-white';
  const floatClass = 'float'; // uses CSS variable defaults
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${floatClass} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
};
