# Feature Integration Guide

This guide shows how to integrate the newly created features into your existing pages.

## 🔍 Search Feature

### Using the SearchBar Component

```tsx
import { SearchBar } from '@/components/ui/SearchBar';

function MyPage() {
  const [items, setItems] = useState([...]);
  
  return (
    <SearchBar
      data={items}
      searchKeys={['name', 'title', 'description']}
      placeholder="Search items..."
      onResultsChange={(results) => setItems(results)}
      debounceMs={300}
      minChars={2}
    />
  );
}
```

### Using the useSearch Hook Directly

```tsx
import { useSearch } from '@/hooks/useSearch';

function MyComponent() {
  const allGigs = [...]; // Your data
  
  const { query, setQuery, results, isSearching } = useSearch({
    data: allGigs,
    searchKeys: ['title', 'description', 'tags'],
    debounceMs: 300,
    minChars: 1
  });
  
  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {isSearching && <Spinner />}
      {results.map(item => <div key={item.id}>{item.title}</div>)}
    </div>
  );
}
```

### Integration Example: Marketplace Page

```tsx
// src/app/marketplace/page.tsx
import { SearchBar } from '@/components/ui/SearchBar';

export default function Marketplace() {
  const [gigs, setGigs] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);
  
  useEffect(() => {
    // Fetch gigs
    fetchGigs().then(data => {
      setGigs(data);
      setFilteredGigs(data);
    });
  }, []);
  
  return (
    <div>
      <SearchBar
        data={gigs}
        searchKeys={['title', 'description', 'sellerName']}
        onResultsChange={setFilteredGigs}
        placeholder="Search services..."
      />
      
      <div className="grid grid-cols-3 gap-6">
        {filteredGigs.map(gig => (
          <GigCard key={gig.id} gig={gig} />
        ))}
      </div>
    </div>
  );
}
```

## ∞ Infinite Scroll

### Using the InfiniteScroll Component

```tsx
import { InfiniteScroll } from '@/hooks/useInfiniteScroll';

function MyList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const loadMore = async () => {
    setLoading(true);
    const newItems = await fetchItems(page);
    setItems([...items, ...newItems]);
    setPage(page + 1);
    setHasMore(newItems.length > 0);
    setLoading(false);
  };
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      
      <InfiniteScroll
        onLoadMore={loadMore}
        hasMore={hasMore}
        isLoading={loading}
        loader={<Spinner />}
        endMessage={<p>No more items</p>}
        threshold={0.8}
      />
    </div>
  );
}
```

### Using the useInfiniteScroll Hook

```tsx
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

function MyList() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  
  const loadMoreRef = useInfiniteScroll({
    onLoadMore: async () => {
      const newItems = await fetchMore();
      setItems([...items, ...newItems]);
      setHasMore(newItems.length > 0);
    },
    hasMore,
    threshold: 0.8
  });
  
  return (
    <div>
      {items.map(item => <div key={item.id}>{item.name}</div>)}
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
}
```

### Integration Example: Marketplace with Infinite Scroll

```tsx
// src/app/marketplace/page.tsx
import { useState, useEffect } from 'react';
import { InfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function Marketplace() {
  const [gigs, setGigs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const loadMoreGigs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/gigs?page=${page}&limit=12`);
      const newGigs = await response.json();
      
      setGigs(prev => [...prev, ...newGigs]);
      setPage(prev => prev + 1);
      setHasMore(newGigs.length === 12);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadMoreGigs();
  }, []);
  
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {gigs.map(gig => (
          <GigCard key={gig.id} gig={gig} />
        ))}
      </div>
      
      <InfiniteScroll
        onLoadMore={loadMoreGigs}
        hasMore={hasMore}
        isLoading={loading}
        loader={
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        }
        endMessage={
          <p className="text-center text-gray-500 py-8">
            You've seen all services!
          </p>
        }
      />
    </div>
  );
}
```

## 📸 Image Upload

### Basic Usage

```tsx
import { ImageUpload } from '@/components/ui/ImageUpload';

function MyForm() {
  const [images, setImages] = useState<File[]>([]);
  
  const handleUpload = (files: File[]) => {
    setImages(files);
    // Upload to server
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    
    fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
  };
  
  return (
    <ImageUpload
      onUpload={handleUpload}
      multiple
      maxFiles={5}
      maxSize={5} // 5MB
      accept="image/*"
    />
  );
}
```

### Integration Example: Profile Settings

```tsx
// src/app/settings/page.tsx - Profile Tab
import { ImageUpload } from '@/components/ui/ImageUpload';

function ProfileTab() {
  const handleAvatarUpload = async (files: File[]) => {
    const file = files[0];
    const formData = new FormData();
    formData.append('avatar', file);
    
    await fetch('/api/user/avatar', {
      method: 'POST',
      body: formData
    });
    
    toast.success('Profile picture updated!');
  };
  
  return (
    <div>
      <h3>Profile Picture</h3>
      <ImageUpload
        onUpload={handleAvatarUpload}
        multiple={false}
        maxFiles={1}
        maxSize={2}
        accept="image/jpeg,image/png"
      />
    </div>
  );
}
```

### Integration Example: Gig Creation

```tsx
// Create a new page: src/app/gigs/create/page.tsx
'use client';

import { useState } from 'react';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function CreateGig() {
  const [gigImages, setGigImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    gigImages.forEach(img => formData.append('images', img));
    
    await fetch('/api/gigs', {
      method: 'POST',
      body: formData
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Create New Gig</h1>
      
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Gig Images
        </label>
        <ImageUpload
          onUpload={setGigImages}
          multiple
          maxFiles={5}
          maxSize={5}
        />
      </div>
      
      <Button type="submit" className="mt-8">
        Create Gig
      </Button>
    </form>
  );
}
```

## 🌙 Dark Mode

### Using the Theme Toggle

The ThemeToggle is already integrated in the Navbar. Users can click it to switch between light and dark modes.

### Accessing Theme in Components

```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, setTheme, resolvedTheme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p> {/* 'light', 'dark', or 'system' */}
      <p>Resolved theme: {resolvedTheme}</p> {/* actual theme being used */}
      
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}
```

### Dark Mode Styling

Use Tailwind's `dark:` prefix for dark mode styles:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 className="text-2xl font-bold">Hello</h1>
  <p className="text-gray-600 dark:text-gray-400">Description</p>
  
  <button className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700">
    Click me
  </button>
</div>
```

### Example: Dark Mode Card

```tsx
function Card({ children }) {
  return (
    <div className="
      bg-white dark:bg-gray-800 
      border border-gray-200 dark:border-gray-700
      rounded-3xl 
      p-6 
      shadow-lg dark:shadow-2xl
      transition-colors duration-200
    ">
      {children}
    </div>
  );
}
```

## 🔔 Toast Notifications

### Already Integrated

The toast system is already set up in the root layout. Use it anywhere:

```tsx
import { useToast } from '@/contexts/ToastContext';

function MyComponent() {
  const toast = useToast();
  
  const handleSuccess = () => {
    toast.success('Operation completed!');
  };
  
  const handleError = () => {
    toast.error('Something went wrong');
  };
  
  const handleInfo = () => {
    toast.info('Here's some information');
  };
  
  const handleWarning = () => {
    toast.warning('Please be careful!');
  };
  
  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
      <button onClick={handleInfo}>Info</button>
      <button onClick={handleWarning}>Warning</button>
    </div>
  );
}
```

## 📦 Combined Example: Advanced Marketplace

Here's how to use all features together:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { InfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function AdvancedMarketplace() {
  const [allGigs, setAllGigs] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [displayedGigs, setDisplayedGigs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const toast = useToast();
  const { resolvedTheme } = useTheme();
  
  const ITEMS_PER_PAGE = 12;
  
  // Initial load
  useEffect(() => {
    fetchGigs();
  }, []);
  
  const fetchGigs = async () => {
    try {
      const response = await fetch('/api/gigs');
      const data = await response.json();
      setAllGigs(data);
      setFilteredGigs(data);
      setDisplayedGigs(data.slice(0, ITEMS_PER_PAGE));
      setHasMore(data.length > ITEMS_PER_PAGE);
    } catch (error) {
      toast.error('Failed to load services');
    }
  };
  
  const loadMore = () => {
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const newGigs = filteredGigs.slice(start, end);
    
    setDisplayedGigs([...displayedGigs, ...newGigs]);
    setPage(page + 1);
    setHasMore(end < filteredGigs.length);
  };
  
  const handleSearchResults = (results) => {
    setFilteredGigs(results);
    setDisplayedGigs(results.slice(0, ITEMS_PER_PAGE));
    setPage(1);
    setHasMore(results.length > ITEMS_PER_PAGE);
  };
  
  return (
    <div className={`min-h-screen ${
      resolvedTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Marketplace
          </h1>
          
          {/* Search */}
          <SearchBar
            data={allGigs}
            searchKeys={['title', 'description', 'sellerName', 'tags']}
            onResultsChange={handleSearchResults}
            placeholder="Search services..."
            minChars={2}
          />
        </div>
        
        {/* Gig Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedGigs.map(gig => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
        
        {/* Infinite Scroll */}
        <InfiniteScroll
          onLoadMore={loadMore}
          hasMore={hasMore}
          isLoading={loading}
          loader={
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white" />
            </div>
          }
          endMessage={
            <p className="text-center text-gray-500 dark:text-gray-400 py-12 text-lg">
              You've reached the end!
            </p>
          }
          threshold={0.8}
        />
      </div>
    </div>
  );
}
```

## 🚀 Quick Start Checklist

- [x] Dark mode integrated - ThemeToggle in Navbar
- [x] Toast notifications ready - Use `useToast()` anywhere
- [ ] Add SearchBar to Marketplace page
- [ ] Add InfiniteScroll to replace pagination
- [ ] Create gig creation page with ImageUpload
- [ ] Add ImageUpload to profile settings
- [ ] Test all features in dark mode
- [ ] Mobile responsiveness check

## 📚 Component API Reference

See the actual component files for full TypeScript definitions and props:

- `src/components/ui/SearchBar.tsx`
- `src/hooks/useSearch.ts`
- `src/hooks/useInfiniteScroll.tsx`
- `src/components/ui/ImageUpload.tsx`
- `src/contexts/ThemeContext.tsx`
- `src/components/ui/ThemeToggle.tsx`

All components are fully typed with TypeScript for excellent IntelliSense support!
