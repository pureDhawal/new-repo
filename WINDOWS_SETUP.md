# Windows Specific Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation

### 1. Install Dependencies (PowerShell or Command Prompt)
```powershell
npm install
```

### 2. Setup Environment Variables
Create a `.env.local` file in the root directory:
```
VITE_API_BASE_URL=http://localhost:9000/api
VITE_SERVER_PORT=9002
VITE_ENV=development
```

## Running the Application

### Option 1: Using npm (Recommended for Windows)
```powershell
npm run dev
```

The dev server will start and automatically open your browser at `http://localhost:9002` or `http://localhost:9003` if 9002 is in use.

### Option 2: Using Windows PowerShell
```powershell
cd "path\to\new-repo"
npm run dev
```

### Option 3: Using Command Prompt (CMD)
```cmd
cd path\to\new-repo
npm run dev
```

## Building for Production
```powershell
npm run build
```

## Preview Production Build
```powershell
npm run preview
```

## Troubleshooting for Windows

### Issue: Port Already in Use
If port 9002 is already in use, Vite will automatically try the next available port (9003, 9004, etc.).

To manually check and kill a process using a port:
```powershell
# Check what's using port 9002
netstat -ano | findstr :9002

# Kill the process (replace PID with the process ID)
taskkill /PID <PID> /F
```

### Issue: White/Blank Dashboard Screen
1. **Clear Browser Cache**: Press `Ctrl + Shift + Delete`
2. **Check Console Errors**: Press `F12` to open DevTools
3. **Ensure Backend is Running**: Make sure `http://localhost:9000/api` is accessible
4. **Hard Refresh**: Press `Ctrl + Shift + R`

### Issue: Module Not Found Errors
- Delete `node_modules` folder and `.package-lock.json`
- Run `npm install` again
- Restart dev server

### Issue: "VITE Node API is deprecated"
This is a warning, not an error. The app will still work correctly. To suppress it:
- Use the ESM version or upgrade to the latest Vite

## Environment-Specific Variables

The app automatically loads the appropriate configuration:

- **Development** (npm run dev): Uses `.env.development`
- **Production Build** (npm run build): Uses `.env.production`
- **Custom**: Create `.env.local` to override any variables

## Path Handling

The application now uses Vite's native path handling which is fully compatible with Windows paths:
- No more backslash (`\`) vs forward slash (`/`) issues
- Module resolution works correctly on all drives (C:, D:, etc.)
- Special characters in usernames and paths are handled properly

## Additional Windows Notes

- If using **git bash**, you can use Unix-style commands
- If using **WSL (Windows Subsystem for Linux)**, follow the Linux setup guide
- If using **VS Code terminal**, the application will auto-detect your shell

## Next Steps

1. Ensure backend API is running on port 9000
2. Configure your authentication (Firebase or other)
3. Start developing!
