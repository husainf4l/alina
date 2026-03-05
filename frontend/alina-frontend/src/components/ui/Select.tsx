import React, { forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
  selectSize?: 'sm' | 'md' | 'lg';
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      fullWidth = false,
      variant = 'default',
      selectSize = 'md',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };

    const variantClasses = {
      default: 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700',
      filled: 'bg-gray-50 dark:bg-gray-900 border-2 border-transparent',
      outlined: 'bg-transparent border-2 border-gray-300 dark:border-gray-600',
    };

    const baseClasses = `
      rounded-xl
      font-medium
      text-gray-900 dark:text-white
      transition-all
      focus:outline-none
      focus:ring-4
      focus:ring-blue-500/20
      focus:border-blue-500
      disabled:opacity-50
      disabled:cursor-not-allowed
      appearance-none
      bg-no-repeat
      bg-right
      pr-10
    `;

    const errorClasses = error
      ? 'border-red-500 dark:border-red-500 focus:ring-red-500/20 focus:border-red-500'
      : '';

    const widthClass = fullWidth ? 'w-full' : '';

    // Custom dropdown arrow styling
    const backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`;

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            className={`
              ${baseClasses}
              ${sizeClasses[selectSize]}
              ${variantClasses[variant]}
              ${errorClasses}
              ${widthClass}
              ${className}
            `}
            style={{
              backgroundImage,
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {(error || helperText) && (
          <p
            className={`mt-2 text-sm ${
              error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
