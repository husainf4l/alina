'use client';

import { useEffect, useState } from 'react';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Disabled animation to prevent flash on page load
  return (
    <div style={{ opacity: 1, visibility: 'visible' }}>
      {children}
    </div>
  );
};

export const SlideUpTransition: React.FC<{ children: React.ReactNode; delay?: number }> = ({ 
  children, 
  delay = 0 
}) => {
  // Disabled animation to prevent flash on page load
  return (
    <div style={{ opacity: 1, visibility: 'visible' }}>
      {children}
    </div>
  );
};
