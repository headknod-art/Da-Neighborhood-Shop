# Frontend Documentation

## Overview

The frontend is a React 19 application built with Vite, styled with Tailwind CSS, and tested with Vitest and React Testing Library.

## Project Structure

```
src/
├── components/              # React components
│   ├── LoginSplash.tsx     # Login/splash screen
│   ├── LyricGenie.tsx      # Main lyrics generator
│   ├── Navbar.tsx          # Navigation bar
│   └── Player.tsx          # Music player
├── services/
│   └── geminiService.ts    # Gemini API integration
├── tests/                  # Component tests
│   ├── App.test.tsx
│   ├── Navbar.test.tsx
│   └── setup.ts
├── App.tsx                 # Main app component
├── types.ts               # TypeScript types
├── index.tsx              # Entry point
├── index.css              # Tailwind directives
└── index.html             # HTML template
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Server runs at `http://localhost:3000`

- Hot reload enabled
- TypeScript checking
- Tailwind CSS compilation

### Build

```bash
npm run build
```

Production build output in `dist/`

### Preview

```bash
npm run preview
```

Preview production build locally

## Environment Variables

Create `.env` file:

```
GEMINI_API_KEY=your_api_key_here
```

Get your key at: https://aistudio.google.com

## Testing

### Run Tests

```bash
npm run test           # Watch mode - auto-reruns on file changes
npm run test:run      # Single run
npm run test:ui       # Open interactive test UI
```

### Test Structure

```typescript
describe("Component", () => {
  it("should do something", () => {
    render(<Component />);
    expect(screen.getByText("text")).toBeInTheDocument();
  });
});
```

### Testing Best Practices

1. **Test behavior, not implementation**
   ```typescript
   // Good
   expect(screen.getByRole("button")).toBeInTheDocument();
   
   // Bad
   expect(component.state.isLoading).toBe(false);
   ```

2. **Use semantic queries**
   ```typescript
   screen.getByRole("button", { name: /submit/i })
   screen.getByLabelText("Username")
   screen.getByPlaceholderText("Email")
   ```

3. **Test user interactions**
   ```typescript
   userEvent.click(button);
   userEvent.type(input, "text");
   ```

## Styling

### Tailwind CSS

Classes available globally. Examples:

```tsx
<div className="flex items-center justify-between bg-blue-500 p-4 rounded-lg">
  <span className="text-white font-bold">Hello</span>
</div>
```

### Custom CSS

Add to `index.css`:

```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
  }
}
```

### Tailwind Config

Customize in `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: "#007bff",
      },
    },
  },
}
```

## Components

### LoginSplash

Login/onboarding screen component.

```tsx
import LoginSplash from "@/components/LoginSplash";

export default function App() {
  return <LoginSplash />;
}
```

### Navbar

Navigation component.

```tsx
import Navbar from "@/components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      {/* Page content */}
    </>
  );
}
```

### LyricGenie

Main lyrics generator component.

```tsx
import LyricGenie from "@/components/LyricGenie";

export default function App() {
  return <LyricGenie />;
}
```

### Player

Music player component.

```tsx
import Player from "@/components/Player";

export default function App() {
  const [song, setSong] = React.useState(null);
  
  return <Player song={song} />;
}
```

## Services

### Gemini Service

Generate lyrics using Gemini API:

```typescript
import { generateLyrics } from "@/services/geminiService";

const lyrics = await generateLyrics("Generate sad love song lyrics");
```

Or call backend instead:

```typescript
const response = await fetch("http://localhost:5000/api/lyrics/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: "Your prompt" })
});
```

## Types

Define custom types in `types.ts`:

```typescript
export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Lyric {
  id: number;
  prompt: string;
  content: string;
  userId?: number;
}
```

## Performance

### Code Splitting

Use dynamic imports for large components:

```typescript
const HeavyComponent = React.lazy(() => import("./HeavyComponent"));

export function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </React.Suspense>
  );
}
```

### Optimization

- Use `React.memo` for expensive components
- Use `useCallback` for event handlers
- Use `useMemo` for computed values
- Lazy load images with `<img loading="lazy" />`

```typescript
import { memo, useCallback, useMemo } from "react";

const MemoComponent = memo(function Component() {
  const expensiveValue = useMemo(() => {
    return complexCalculation();
  }, [dependency]);

  const handleClick = useCallback(() => {
    // Handler
  }, [dependency]);

  return <div>{expensiveValue}</div>;
});
```

## Build Process

### Vite Configuration

Configured in `vite.config.ts`:

```typescript
export default defineConfig({
  server: { port: 3000, host: "0.0.0.0" },
  plugins: [react()],
  define: {
    "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY)
  }
});
```

### Output

```
dist/
├── index.html
├── assets/
│   ├── index-xxxxx.js
│   └── index-xxxxx.css
└── vite.svg
```

## Debugging

### Browser DevTools

1. Open DevTools: F12 or Ctrl+Shift+I
2. **Console** - Check for errors
3. **Network** - Check API requests
4. **React** - Inspect components (if extension installed)
5. **Sources** - Set breakpoints

### VS Code Debugging

Install "Debugger for Chrome" extension, then:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

### Console Logging

```typescript
console.log("Value:", value);
console.error("Error:", error);
console.warn("Warning:", warning);
console.table(arrayOfObjects);
```

## Dependency Management

### Add Dependencies

```bash
npm install package-name
npm install --save-dev dev-package
```

### Update Dependencies

```bash
npm update
npm outdated  # Check for outdated packages
```

### Remove Dependencies

```bash
npm uninstall package-name
```

## Common Patterns

### State Management

```typescript
import { useState } from "react";

function MyComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### Effects

```typescript
import { useEffect } from "react";

function MyComponent() {
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    };
  }, [dependency]);
}
```

### Conditional Rendering

```typescript
function MyComponent() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <>
      {isVisible && <p>Visible</p>}
      {isVisible ? <p>Yes</p> : <p>No</p>}
    </>
  );
}
```

### Lists

```typescript
function MyList() {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

## Troubleshooting

### Common Issues

**Module not found**
```bash
npm install
npm cache clean --force
```

**Hot reload not working**
- Save files to trigger reload
- Check console for errors
- Restart dev server: Ctrl+C, `npm run dev`

**CSS not applied**
- Check class name spelling
- Rebuild: Stop and restart dev server
- Check Tailwind config includes file paths

**API requests fail**
- Check backend is running: `curl http://localhost:5000/api/health`
- Check CORS is enabled
- Check API_KEY in `.env`

See [Troubleshooting Guide](../docs/TROUBLESHOOTING.md) for more.

## Resources

- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Docs](https://vitest.dev/)
