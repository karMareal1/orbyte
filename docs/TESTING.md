# Testing Guide for Orbyte

## Quick Start Testing

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

## Testing the Dashboard

### Visual Testing

1. **Open Dashboard**
   - Navigate to `http://localhost:3000`
   - You should see the ORBYTE header with navigation
   - Dashboard should display all panels matching the design

2. **Check Components**
   - ✅ Compliance Status panel with green/orange grid
   - ✅ Savings Opportunities list
   - ✅ Risk Assessment summary
   - ✅ Compliance & Emissions Trends chart
   - ✅ Risk Assessment Trends chart

3. **Test Navigation**
   - Click "Chat" in header → Should navigate to chat page
   - Click "Dashboard" → Should return to dashboard

## Testing API Endpoints

### Test Compliance API

```bash
# Get overall compliance status
curl http://localhost:3000/api/compliance

# Get NIST 800-53 compliance
curl http://localhost:3000/api/compliance?framework=NIST_800_53

# Expected response:
# {
#   "framework": "NIST_800_53",
#   "score": 85,
#   "gaps": [],
#   "resourceId": "all"
# }
```

### Test Sustainability API

```bash
# Get default sustainability metrics
curl http://localhost:3000/api/sustainability

# Get emissions for last 30 days
curl http://localhost:3000/api/sustainability?action=emissions

# Get savings opportunities
curl http://localhost:3000/api/sustainability?action=opportunities

# Get sustainability score
curl http://localhost:3000/api/sustainability?action=score

# Get regional breakdown
curl http://localhost:3000/api/sustainability?action=regional
```

### Test Chat API

```bash
# Send a chat message
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is our compliance status?"}'

# Expected response:
# {
#   "response": "I understand your question...",
#   "timestamp": "2024-01-01T12:00:00.000Z"
# }
```

## Testing Chat Interface

1. **Navigate to Chat**
   - Click "Chat" in header or go to `http://localhost:3000/chat`

2. **Send Messages**
   - Type a question in the input field
   - Click "Send" or press Enter
   - Should see your message and AI response

3. **Test Questions**
   - "What is our compliance status?"
   - "Show me sustainability opportunities"
   - "How can I reduce emissions?"

## Testing with Mock Data

The application uses mock data by default, so you can test without GCP setup. However, for full functionality:

### With GCP Setup (Full Testing)

1. **Set Environment Variables**
   ```bash
   # Create .env.local
   GOOGLE_CLOUD_PROJECT=your-project-id
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   VERTEX_AI_LOCATION=us-central1
   ```

2. **Setup BigQuery** (Optional for testing)
   - Follow `docs/DEPLOYMENT.md` to setup BigQuery
   - Or use mock data (default)

3. **Test Real Data Integration**
   - Deploy Cloud Functions
   - Trigger data collection
   - Verify data appears in dashboard

## Browser Testing

### Test in Different Browsers
- Chrome/Edge (Chromium)
- Firefox
- Safari

### Test Responsive Design
- Resize browser window
- Test on mobile viewport (DevTools → Toggle device toolbar)
- Verify panels stack properly on small screens

## Component Testing Checklist

- [ ] Header displays correctly
- [ ] Navigation links work
- [ ] Dashboard panels render
- [ ] Charts display data
- [ ] Chat interface functional
- [ ] API endpoints return data
- [ ] No console errors
- [ ] No TypeScript errors

## Common Issues & Solutions

### Issue: "Module not found"
**Solution**: Run `npm install` again

### Issue: "Port 3000 already in use"
**Solution**: 
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill
```

### Issue: API returns errors
**Solution**: 
- Check that dev server is running
- Verify API routes exist in `app/api/`
- Check browser console for errors

### Issue: Charts not displaying
**Solution**: 
- Verify `recharts` is installed: `npm list recharts`
- Check browser console for errors
- Ensure data is being passed to chart components

## Performance Testing

### Check Bundle Size
```bash
npm run build
# Check .next/analyze for bundle analysis
```

### Check Loading Times
- Open DevTools → Network tab
- Reload page
- Check load times for assets

## Integration Testing (Advanced)

### Test Full Flow
1. Dashboard loads → Shows mock data
2. Click Chat → Navigate to chat
3. Send message → Receive response
4. Navigate back → Dashboard still works

### Test API Integration
1. Dashboard calls `/api/compliance` → Gets data
2. Dashboard calls `/api/sustainability` → Gets data
3. Chat calls `/api/chat` → Gets AI response

## Next Steps

Once basic testing passes:
1. Set up GCP project for full functionality
2. Deploy Cloud Functions
3. Connect to real BigQuery data
4. Test with production data
5. Set up CI/CD for automated testing

## Automated Testing (Future)

Consider adding:
- Jest for unit tests
- React Testing Library for component tests
- Playwright for E2E tests
- API integration tests

