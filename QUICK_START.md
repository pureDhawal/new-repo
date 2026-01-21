# 🚀 Quick Reference Card - Cross-Platform Setup

## ⚡ TL;DR - Get Started in 3 Steps

```bash
npm install
cp .env.example .env.local
npm run dev
```

That's it! Your app will open at `http://localhost:9002` ✨

---

## 📱 Platform Commands

### Windows (PowerShell/CMD)
```powershell
npm run dev       # Start development
npm run build     # Build for production
npm run preview   # Preview production build
```

### Mac (Terminal)
```bash
npm run dev       # Start development
npm run build     # Build for production
npm run preview   # Preview production build
```

### Linux (Terminal)
```bash
npm run dev       # Start development
npm run build     # Build for production
npm run preview   # Preview production build
```

**All commands work identically on all platforms!**

---

## 🔧 Configuration

### Development Config (`.env.development`)
```
VITE_API_BASE_URL=http://localhost:9000/api
VITE_SERVER_PORT=9002
```

### Production Config (`.env.production`)
```
VITE_API_BASE_URL=https://api.mnnit-connect.com/api
VITE_SERVER_PORT=3000
```

### Custom Config (`.env.local`)
```
VITE_API_BASE_URL=http://your-custom-api/api
```

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| White screen | Clear cache (Ctrl+Shift+Del), hard refresh |
| Port in use | Vite tries next port (9003, 9004...) |
| Module errors | `rm -rf node_modules && npm install` |
| API errors | Verify backend running on port 9000 |

---

## 📊 What's Fixed

- ✅ Path resolution (Windows backslash issues)
- ✅ API configuration (environment-based)
- ✅ Cross-platform compatibility
- ✅ Works on Windows, Mac, Linux

---

## 📖 Full Documentation

- **[COMPLETE_FIXES.md](COMPLETE_FIXES.md)** - Full technical details
- **[WINDOWS_SETUP.md](WINDOWS_SETUP.md)** - Windows-specific guide
- **[MAC_SETUP.md](MAC_SETUP.md)** - Mac-specific guide
- **[CROSS_PLATFORM_SETUP.md](CROSS_PLATFORM_SETUP.md)** - General setup

---

## ✨ Your App is Ready!

Start developing now:
```bash
npm run dev
```

Then open `http://localhost:9002` 🎉
