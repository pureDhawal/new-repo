# Mac Specific Setup Guide

## Prerequisites
- Node.js 18+ installed (via Homebrew or direct download)
- npm or yarn package manager
- Terminal or iTerm2

## Installation

### 1. Install Dependencies
```bash
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

### Standard Way
```bash
npm run dev
```

The dev server will start and automatically open your browser at `http://localhost:9002` or the next available port if 9002 is occupied.

### From Any Directory
```bash
cd /path/to/new-repo
npm run dev
```

### Using a Different Port
```bash
npm run dev -- --port 8080
```

## Building for Production
```bash
npm run build
```

## Preview Production Build
```bash
npm run preview
```

## Troubleshooting for Mac

### Issue: Port Already in Use
If port 9002 is already in use, Vite will automatically try the next available port.

To manually check and free up a port:
```bash
# Check what process is using port 9002
lsof -i :9002

# Kill the process (replace PID with the process ID)
kill -9 <PID>
```

### Issue: White/Blank Dashboard Screen
1. **Clear Browser Cache**: Press `Cmd + Shift + Delete` (in Chrome) or `Cmd + Shift + R` (refresh)
2. **Check Console Errors**: Press `Cmd + Option + I` to open DevTools
3. **Ensure Backend is Running**: Verify `http://localhost:9000/api` is accessible
4. **Hard Refresh**: Press `Cmd + Shift + R`

### Issue: Permission Denied Errors
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Issue: Node/npm Not Found
If using Homebrew:
```bash
brew install node
```

Add Node to PATH if needed:
```bash
echo 'export PATH="/usr/local/opt/node/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Issue: Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: Vite Node API Deprecation Warning
This is just a warning. The app works normally. To use the modern ESM API:
- The warning will be addressed in future Vite updates
- Your app will continue to work without any issues

## Troubleshooting Browser Issues

### Chrome
- Clear cache: Cmd + Shift + Delete
- Hard refresh: Cmd + Shift + R

### Safari
- Develop menu → Empty Caches
- Hard refresh: Cmd + R

### Firefox
- Clear cache: Cmd + Shift + Delete
- Hard refresh: Cmd + Shift + R

## Environment-Specific Variables

The app automatically loads the appropriate configuration:

- **Development** (npm run dev): Uses `.env.development`
- **Production Build** (npm run build): Uses `.env.production`
- **Custom**: Create `.env.local` to override any variables

## Using Different Node Versions

If you have multiple Node versions:

### Using NVM (Node Version Manager)
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# List available versions
nvm list-remote

# Install and use specific version
nvm install 18
nvm use 18

# Set default
nvm alias default 18
```

### Check Your Node Version
```bash
node --version
npm --version
```

## Terminal Tips

### Using Oh My Zsh
If using Oh My Zsh with Node plugin:
```bash
# Add to ~/.zshrc
plugins=(... node npm)
```

### Quick Command Aliases
```bash
# Add to ~/.zshrc
alias mdev="npm run dev"
alias mbuild="npm run build"
alias mpreview="npm run preview"
```

Then reload your shell:
```bash
source ~/.zshrc
```

## Next Steps

1. Ensure backend API is running on port 9000
2. Configure Firebase or authentication provider
3. Start developing with hot module reloading!

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
