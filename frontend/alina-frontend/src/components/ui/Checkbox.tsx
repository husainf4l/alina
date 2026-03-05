import React, { forwardRef, InputHTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  checkboxSize?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helperText,
      checkboxSize = 'md',
      indeterminate = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const checkboxRef = React.useRef<HTMLInputElement>(null);
    
    React.useEffect(() => {
      const checkbox = ref || checkboxRef;
      if (typeof checkbox === 'object' && checkbox.current) {
        checkbox.current.indeterminate = indeterminate;
      }
    }, [indeterminate, ref]);

    const checkboxElement = (
      <input
        type="checkbox"
        ref={ref || checkboxRef}
        disabled={disabled}
        className={`
          ${sizeClasses[checkboxSize]}
          rounded
          border-2
          border-gray-300
          dark:border-gray-600
          text-blue-600
          focus:ring-4
          focus:ring-blue-500/20
          focus:border-blue-500
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition-all
          cursor-pointer
          ${error ? 'border-red-500 dark:border-red-500 focus:ring-red-500/20' : ''}
          ${className}
        `}
        {...props}
      />
    );

    if (!label) {
      return checkboxElement;
    }

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          {checkboxElement}
        </div>
        <div className="ml-3">
          <label
            htmlFor={props.id}
            className={`text-sm font-medium ${
              disabled
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 cursor-pointer'
            }`}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {(error || helperText) && (
            <p
              className={`mt-1 text-xs ${
                error
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {error || helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// CheckboxGroup Component
export interface CheckboxGroupProps {
  legend?: string;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  legend,
  options,
  value,
  onChange,
  error,
  orientation = 'vertical',
}) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <fieldset>
      {legend && (
        <legend className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
          {legend}
        </legend>
      )}
      <div
        className={`flex gap-4 ${
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
        }`}
      >
        {options.map((option) => (
          <Checkbox
            key={option.value}
            id={`checkbox-${option.value}`}
            label={option.label}
            checked={value.includes(option.value)}
            onChange={(e) => handleChange(option.value, e.target.checked)}
            disabled={option.disabled}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </fieldset>
  );
};
