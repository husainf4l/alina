import React, { forwardRef, InputHTMLAttributes } from 'react';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  error?: string;
  radioSize?: 'sm' | 'md' | 'lg';
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      description,
      error,
      radioSize = 'md',
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

    const radioElement = (
      <input
        type="radio"
        ref={ref}
        disabled={disabled}
        className={`
          ${sizeClasses[radioSize]}
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
      return radioElement;
    }

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          {radioElement}
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
          {description && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
          {error && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Radio.displayName = 'Radio';

// RadioGroup Component
export interface RadioGroupProps {
  legend?: string;
  options: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  value: string;
  onChange: (value: string) => void;
  name: string;
  error?: string;
  required?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  legend,
  options,
  value,
  onChange,
  name,
  error,
  required = false,
  orientation = 'vertical',
}) => {
  return (
    <fieldset>
      {legend && (
        <legend className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
          {legend}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>
      )}
      <div
        className={`flex gap-4 ${
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
        }`}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            id={`radio-${name}-${option.value}`}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            disabled={option.disabled}
            required={required}
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
