// Typing Indicator Component
'use client';

export function TypingIndicator({ userName }: { userName?: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      {userName && (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {userName} is typing...
        </span>
      )}
    </div>
  );
}

// Online Status Badge Component
export function OnlineStatusBadge({ isOnline }: { isOnline: boolean }) {
  return (
    <span
      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
        isOnline ? 'bg-green-500' : 'bg-gray-400'
      }`}
      title={isOnline ? 'Online' : 'Offline'}
    />
  );
}
