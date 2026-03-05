import React from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circle' | 'square' | 'rounded';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  variant = 'circle',
  status,
  className = '',
  onClick,
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-24 h-24 text-3xl',
  };

  const variantClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-lg',
  };

  const statusSizeClasses = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
    '2xl': 'w-6 h-6',
  };

  const statusColorClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  // Generate initials from name
  const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Generate a consistent color based on name
  const getColorFromName = (fullName: string): string => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-cyan-500',
    ];
    
    let hash = 0;
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const displayInitials = name ? getInitials(name) : alt ? alt.charAt(0).toUpperCase() : '?';
  const backgroundColorClass = name ? getColorFromName(name) : 'bg-gray-500';

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        onClick={onClick}
        className={`
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          flex
          items-center
          justify-center
          overflow-hidden
          ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
          ${src ? 'bg-gray-200 dark:bg-gray-700' : `${backgroundColorClass} text-white`}
        `}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <span className="font-bold select-none">{displayInitials}</span>
        )}
      </div>

      {/* Status indicator */}
      {status && (
        <span
          className={`
            absolute
            bottom-0
            right-0
            block
            ${statusSizeClasses[size]}
            ${statusColorClasses[status]}
            rounded-full
            ring-2
            ring-white
            dark:ring-gray-900
          `}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

// Avatar Group Component
export interface AvatarGroupProps {
  avatars: Array<{
    src?: string;
    alt?: string;
    name?: string;
  }>;
  max?: number;
  size?: AvatarProps['size'];
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 5,
  size = 'md',
  className = '',
}) => {
  const displayAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={`flex items-center ${className}`}>
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          className="-ml-2 first:ml-0 ring-2 ring-white dark:ring-gray-900 rounded-full"
        >
          <Avatar {...avatar} size={size} variant="circle" />
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div className="-ml-2 ring-2 ring-white dark:ring-gray-900 rounded-full">
          <Avatar
            name={`+${remainingCount}`}
            size={size}
            variant="circle"
            className="bg-gray-500"
          />
        </div>
      )}
    </div>
  );
};
