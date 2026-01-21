# Cross-Platform Compatibility Guide

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local` and update values as needed:
```bash
cp .env.example .env.local
```

### 3. Run Development Server (Works on Mac, Windows, Linux)
```bash
npm run dev
```

The app will automatically open at `http://localhost:9002`

## Fixed Issues

### ✅ Vite Configuration
- Replaced `path.resolve()` with `import.meta.url` for true cross-platform compatibility
- This eliminates path separator differences between Windows (`\`) and Unix (`/`)
- Added explicit `host: 'localhost'` configuration

### ✅ Environment Configuration
- Created `.env.development` and `.env.production` for environment-specific settings
- API base URL now uses environment variables via `VITE_API_BASE_URL`
- Automatically loads correct config for development and production builds

### ✅ API Service
- Updated `src/services/api.js` to read from environment variables
- Falls back to `http://localhost:9000/api` if env variable is not set
- Works identically on Windows, Mac, and Linux

## Why White Screen Was Showing

The white screen issue occurred because:
1. **Path Resolution Issues**: Windows uses backslashes (`\`) while Mac/Linux use forward slashes (`/`), causing module resolution failures
2. **Missing Configuration**: No fallback for API endpoints across platforms
3. **Hard-coded Values**: Localhost references weren't normalized

## Platform Testing

### On Windows (PowerShell/CMD)
```cmd
npm run dev
```

### On Mac (Terminal/Zsh)
```bash
npm run dev
```

### On Linux (Bash/Zsh)
```bash
npm run dev
```

All commands now work identically across all platforms.

## Build for Production
```bash
npm run build
```

## Preview Production Build
```bash
npm run preview
```

## Troubleshooting

If the dashboard still shows white:
1. Clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)
2. Check browser console for errors (F12)
3. Ensure `http://localhost:9000/api` backend is running
4. Check `.env.local` configuration
