# Components Documentation

## Overview

React components for the Da Neighborhood Shop application.

## Component List

- **LoginSplash** - Authentication/splash screen
- **Navbar** - Navigation header
- **LyricGenie** - Main lyrics generator
- **Player** - Music player

## LoginSplash

Authentication and splash screen component.

### Props

```typescript
interface LoginSplashProps {
  onLogin?: (user: User) => void;
  onSignup?: (user: User) => void;
}
```

### Usage

```tsx
import LoginSplash from "@/components/LoginSplash";

export default function App() {
  const handleLogin = (user) => {
    console.log("User logged in:", user);
  };

  return <LoginSplash onLogin={handleLogin} />;
}
```

### Features

- User login form
- Signup form
- Form validation
- Error handling

## Navbar

Navigation component displayed at top of page.

### Props

```typescript
interface NavbarProps {
  user?: User;
  onLogout?: () => void;
  links?: NavLink[];
}

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}
```

### Usage

```tsx
import Navbar from "@/components/Navbar";

export default function App() {
  return (
    <>
      <Navbar user={currentUser} onLogout={handleLogout} />
      <main>{/* Page content */}</main>
    </>
  );
}
```

### Features

- User profile section
- Navigation links
- Responsive menu
- Logout functionality

## LyricGenie

Main component for generating lyrics with AI.

### Props

```typescript
interface LyricGenieProps {
  userId?: number;
  onLyricsGenerated?: (lyrics: Lyric) => void;
  onError?: (error: Error) => void;
}
```

### Usage

```tsx
import LyricGenie from "@/components/LyricGenie";

export default function App() {
  const handleLyricsGenerated = (lyrics) => {
    console.log("Lyrics generated:", lyrics);
  };

  return <LyricGenie onLyricsGenerated={handleLyricsGenerated} />;
}
```

### Features

- Prompt input field
- AI-powered lyrics generation
- Loading state
- Error handling
- Save to database
- Display generated lyrics

### How It Works

1. User enters prompt
2. Submits form
3. Component calls backend API
4. Backend generates with Gemini AI
5. Lyrics saved to database
6. Display results

## Player

Music player component for audio playback.

### Props

```typescript
interface PlayerProps {
  song?: Song;
  autoPlay?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
  duration: number;
}
```

### Usage

```tsx
import Player from "@/components/Player";

export default function App() {
  const [song, setSong] = useState<Song | null>(null);

  return (
    <Player 
      song={song}
      onPlay={() => console.log("Playing")}
      onPause={() => console.log("Paused")}
    />
  );
}
```

### Features

- Play/pause controls
- Progress bar
- Volume control
- Time display
- Next/previous buttons

## Best Practices

### Component Structure

```typescript
import { FC } from "react";

interface ComponentProps {
  title: string;
  count?: number;
  onClick?: () => void;
}

const MyComponent: FC<ComponentProps> = ({ 
  title, 
  count = 0, 
  onClick 
}) => {
  return (
    <div onClick={onClick}>
      <h1>{title}</h1>
      <p>Count: {count}</p>
    </div>
  );
};

export default MyComponent;
```

### Props Validation

```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}
```

### State Management

```typescript
import { useState } from "react";

function MyComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/data");
      const data = await response.json();
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleFetch}>Fetch</button>
    </div>
  );
}
```

### Memoization

```typescript
import { memo } from "react";

const ExpensiveComponent = memo(function Component({ data }) {
  return <div>{data}</div>;
});
```

### Custom Hooks

```typescript
import { useState, useCallback } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { data, loading, error, fetch };
}

// Usage
function MyComponent() {
  const { data, loading, fetch } = useFetch("/api/data");
  
  return (
    <>
      {loading && <p>Loading...</p>}
      <button onClick={fetch}>Fetch</button>
      {data && <p>{JSON.stringify(data)}</p>}
    </>
  );
}
```

## Testing Components

### Basic Test

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MyComponent from "@/components/MyComponent";

describe("MyComponent", () => {
  it("should render without crashing", () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

### Test with User Interaction

```typescript
import userEvent from "@testing-library/user-event";

describe("MyComponent", () => {
  it("should handle click", async () => {
    const handleClick = vi.fn();
    render(<MyComponent onClick={handleClick} />);
    
    const button = screen.getByRole("button");
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Test with Async

```typescript
describe("MyComponent", () => {
  it("should load data", async () => {
    render(<MyComponent />);
    
    const item = await screen.findByText("Loaded data");
    expect(item).toBeInTheDocument();
  });
});
```

## Common Patterns

### Conditional Rendering

```typescript
{isVisible && <Component />}
{condition ? <ComponentA /> : <ComponentB />}
```

### Lists

```typescript
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

### Form Handling

```typescript
function MyForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Loading States

```typescript
function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/data");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return <div>{JSON.stringify(data)}</div>;
}
```

## Styling Components

### Tailwind Classes

```typescript
function Button({ variant = "primary" }) {
  const baseClasses = "px-4 py-2 rounded font-semibold";
  
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      Click me
    </button>
  );
}
```

### CSS Modules

```tsx
import styles from "./MyComponent.module.css";

export default function MyComponent() {
  return <div className={styles.container}>Content</div>;
}
```

## Component Organization

```
components/
├── Common/           # Reusable components
│   ├── Button.tsx
│   ├── Modal.tsx
│   └── Input.tsx
├── Layout/          # Layout components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
├── Features/        # Feature-specific
│   ├── LyricGenie.tsx
│   └── Player.tsx
└── index.ts         # Barrel exports
```

## Resources

- [React Docs](https://react.dev/)
- [TypeScript React](https://www.typescriptlang.org/docs/handbook/react.html)
- [Tailwind Components](https://tailwindui.com/)
- [React Patterns](https://reactpatterns.com/)
