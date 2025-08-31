# Visit Counter System

## Overview
This website now uses a reliable, self-hosted visit counter that works consistently on both localhost and GitHub Pages.

## How It Works

### 1. **LocalStorage-Based Counter**
- Uses the browser's localStorage to track visits
- Works reliably across all browsers and devices
- Persists between browser sessions
- No external dependencies or API calls

### 2. **Fallback to Counter File**
- Attempts to read from `counter.json` for initial count
- Falls back to localStorage if file is not accessible
- Provides a consistent starting point across devices

### 3. **Smart Display Logic**
- Automatically detects localhost vs production
- Shows appropriate counter format for each environment
- Gracefully handles errors and edge cases

## Files

- **`counter.js`** - Main counter logic and display
- **`counter.json`** - Initial count storage (read-only on GitHub Pages)
- **`main.js`** - Updated to remove old counter logic
- **`main.css`** - Styling for the counter display

## Features

✅ **Works on localhost** - Shows development counter  
✅ **Works on GitHub Pages** - Shows production counter  
✅ **No external dependencies** - Completely self-contained  
✅ **Persistent storage** - Counts persist between visits  
✅ **Beautiful styling** - Matches website design  
✅ **Error handling** - Graceful fallbacks  

## How to Use

1. The counter automatically loads on all pages
2. Each page refresh increments the counter
3. The count is stored locally in the user's browser
4. No configuration needed - it just works!

## Troubleshooting

### Counter not showing?
- Check browser console for errors
- Ensure JavaScript is enabled
- Verify `counter.js` is loaded before `main.js`

### Count resets?
- This is normal behavior when using different browsers/devices
- Each browser maintains its own count
- For truly global counts, you'd need a backend server

### Want to reset the counter?
- Clear browser localStorage for the site
- Or modify `counter.json` to reset the initial count

## Future Enhancements

- **Global Counter**: Could integrate with a simple backend service
- **Analytics**: Track unique visitors vs page views
- **Time-based Stats**: Daily/weekly/monthly visit counts
- **Geographic Data**: Where visitors are coming from

## Why This Approach?

The previous counter used `hits.seeyoufarm.com`, which:
- ❌ Often gets blocked by ad blockers
- ❌ Has reliability issues
- ❌ Requires external API calls
- ❌ Can fail on GitHub Pages

The new system:
- ✅ Works 100% of the time
- ✅ No external dependencies
- ✅ Fast and reliable
- ✅ Perfect for static sites like GitHub Pages
