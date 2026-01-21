# ✅ Platform Compatibility Checklist

## Pre-Deployment Testing Checklist

### Initial Setup (Both Platforms)
- [ ] Node.js 18+ installed
- [ ] `npm install` completed successfully
- [ ] `.env.local` created with correct API URL
- [ ] No error messages in terminal

### Development Server (Mac)
- [ ] `npm run dev` starts without errors
- [ ] Server shows "VITE ready" message
- [ ] Browser opens automatically
- [ ] Dashboard loads and displays content (no white screen)
- [ ] Navigation links work
- [ ] Console has no errors (F12)
- [ ] Hot reload works (modify a file, page updates)

### Development Server (Windows)
- [ ] `npm run dev` starts without errors (PowerShell or CMD)
- [ ] Server shows "VITE ready" message
- [ ] Browser opens automatically
- [ ] Dashboard loads and displays content (no white screen)
- [ ] Navigation links work
- [ ] Console has no errors (F12)
- [ ] Hot reload works (modify a file, page updates)

### API Connectivity (Both Platforms)
- [ ] Backend API running on port 9000
- [ ] Can access `http://localhost:9000/api` from browser
- [ ] API requests in browser console show 200/correct status
- [ ] Login/authentication functions work

### File & Module Resolution (Both Platforms)
- [ ] Import paths with `@/` alias work correctly
- [ ] No "Module not found" errors
- [ ] CSS/images load properly
- [ ] Icons and components render correctly

### Build Process
- [ ] `npm run build` completes without errors
- [ ] `dist/` folder created with all files
- [ ] `npm run preview` starts successfully
- [ ] Production build renders correctly

### Cross-Platform Verification
- [ ] Same result on Windows and Mac
- [ ] Same result on different machines
- [ ] Same result when cloned fresh from git
- [ ] Same result after `node_modules` clean install

### Browser Compatibility
- [ ] Works in Chrome
- [ ] Works in Safari
- [ ] Works in Firefox
- [ ] Works in Edge (Windows)

### Performance (Both Platforms)
- [ ] Dev server loads page in <3 seconds
- [ ] No significant lag during navigation
- [ ] No memory leaks (check DevTools)
- [ ] Responsive on mobile view

### Error Handling
- [ ] Graceful handling when API unavailable
- [ ] Error messages display correctly
- [ ] No unhandled promise rejections
- [ ] Console warnings are expected (e.g., Vite CJS warning)

---

## Environment Configuration Checklist

### `.env.local` File
- [ ] File exists in project root
- [ ] `VITE_API_BASE_URL` is set correctly
- [ ] `VITE_SERVER_PORT` is set to 9002
- [ ] File is in `.gitignore` (not committed)

### `.env.development` File
- [ ] File exists for development defaults
- [ ] Contains local API endpoint
- [ ] Used when running `npm run dev`

### `.env.production` File
- [ ] File exists for production settings
- [ ] Contains production API endpoint
- [ ] Used when running `npm run build`

---

## Platform-Specific Issues to Test

### Windows Specific
- [ ] Works with paths containing spaces (e.g., "Program Files")
- [ ] Works with non-ASCII usernames
- [ ] PowerShell execution policy allows npm
- [ ] Works with different drive letters (C:, D:, etc.)
- [ ] Antivirus doesn't block npm/node processes

### Mac Specific
- [ ] Works with non-ASCII characters in path
- [ ] `sudo` not required for npm
- [ ] Works with different shells (bash, zsh)
- [ ] M1/M2 ARM architecture works (if applicable)

### Linux Specific (if testing)
- [ ] Works with standard path structures
- [ ] Package managers work correctly
- [ ] File permissions are correct

---

## Final Deployment Checklist

Before deploying to production:
- [ ] All tests pass on both Windows and Mac
- [ ] No console errors in development or production
- [ ] API endpoints are correctly configured
- [ ] Environment variables are properly set
- [ ] Database/backend services are running
- [ ] SSL certificates configured (if using HTTPS)
- [ ] CORS settings allow frontend to call API
- [ ] `.env.production` has correct API URL
- [ ] `npm run build` produces optimized bundle
- [ ] Performance is acceptable

---

## Quick Command Reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Start dev | `npm run dev` |
| Build | `npm run build` |
| Preview | `npm run preview` |
| Lint | `npm run lint` |
| Clean | `rm -rf node_modules dist && npm install` |

---

## Troubleshooting Quick Links

| Issue | Platform | Solution |
|-------|----------|----------|
| Port in use | Both | Check `lsof -i :9002` or `netstat -ano \| findstr :9002` |
| Module errors | Both | Delete `node_modules`, run `npm install` |
| White screen | Both | Clear cache (Ctrl+Shift+Delete), hard refresh |
| API errors | Both | Verify backend is running on port 9000 |
| Permission denied | Mac | Run `sudo chown -R $(whoami) ~/.npm` |
| Node not found | Both | Reinstall Node.js or check PATH |

---

## Sign-Off

Once all checks are completed:
- Date tested on Windows: ___________
- Date tested on Mac: ___________
- Tester name: ___________
- Ready for deployment: [ ] Yes [ ] No

If "No", list remaining issues:
```
1. 
2. 
3. 
```

---

**Status**: ✅ All cross-platform portability fixes have been applied.  
**Next Step**: Run through the checklist on both Windows and Mac before deploying.
