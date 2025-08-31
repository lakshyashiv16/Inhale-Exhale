# Google Sheets Universal Counter Setup Guide

## Overview
This guide will help you set up a universal visit counter using Google Sheets as a backend. The counter will show the same number across all devices and persist even after browser refreshes.

## Step 1: Create Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "InhaleExhale Counter"
4. Set up the sheet:
   - Cell A1: `visits` (header)
   - Cell A2: `0` (starting value)

## Step 2: Create Google Apps Script
1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Replace the default code with:

```javascript
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const currentCount = sheet.getRange("A2").getValue();
  
  // Increment the counter
  sheet.getRange("A2").setValue(currentCount + 1);
  
  // Return the new count as JSON
  return ContentService
    .createTextOutput(JSON.stringify({ count: currentCount + 1 }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  return doGet(e);
}
```

3. Click **Save** and name it "Counter API"

## Step 3: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Choose **Web app** as the type
3. Set **Execute as**: "Me"
4. Set **Who has access**: "Anyone"
5. Click **Deploy**
6. **Copy the Web app URL** (looks like: `https://script.google.com/macros/s/AKfycbz.../exec`)

## Step 4: Update Your Website
1. Open `docs/counter.js`
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your actual URL
3. Save the file

## Step 5: Test the Counter
1. Open `docs/counter-test.html` in your browser
2. Click "Test Counter API" to verify the connection
3. Refresh the page to see the counter increment
4. Check that the same number appears on all pages

## How It Works
- **Universal**: Same counter for everyone, everywhere
- **Real-time**: Updates instantly across all devices
- **Persistent**: Counts survive browser refreshes and restarts
- **Reliable**: Google's infrastructure ensures 99.9% uptime
- **Free**: No hosting costs or server maintenance

## Troubleshooting

### Counter not showing?
- Check browser console for errors
- Verify the URL in `counter.js` is correct
- Make sure Google Apps Script is deployed as "Anyone" can access

### Counter not incrementing?
- Check that your Google Sheet has the correct setup
- Verify the Apps Script code is saved and deployed
- Test the API URL directly in your browser

### CORS errors?
- Google Apps Script handles CORS automatically
- If you see CORS errors, check that the deployment is set to "Anyone"

## Security Notes
- The counter is public (anyone can increment it)
- This is fine for a visit counter, but don't store sensitive data
- Google Sheets has rate limits (100 requests per 100 seconds per user)

## Advanced Features
You can extend this system to:
- Track different types of visits
- Add timestamps
- Create multiple counters
- Add analytics

## Files Modified
- `docs/counter.js` - Main counter logic
- `docs/main.css` - Counter styling
- All HTML files - Added counter elements
- `docs/counter-test.html` - Test page
- `docs/COUNTER_SETUP.md` - This guide

## Next Steps
1. Set up the Google Sheet and Apps Script
2. Update the URL in `counter.js`
3. Test with `counter-test.html`
4. Deploy your website and enjoy your universal counter!
