import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Custom animation properties for antigravity floating effect.
   */
  style?: React.CSSProperties;
}

export const Input: React.FC<InputProps> = ({ className = '', style, ...rest }) => {
  const baseClasses =
    'px-3 py-2 border border-[0.5px] border-stone rounded-input focus:outline-none focus:ring-1 focus:ring-indigo';
  const floatClass = 'float';
  return (
    <input
      className={`${baseClasses} ${floatClass} ${className}`}
      style={style}
      {...rest}
    />
  );
};
