# Vercel Domain Configuration Instructions

## Critical: Configure Domains in Vercel Dashboard

After deployment, you MUST configure the domain settings in Vercel:

### 1. Go to Vercel Dashboard
- Navigate to: https://vercel.com/dashboard
- Select your `figurefinance.co` project

### 2. Go to Settings → Domains

### 3. Configure Domains as Follows:

**Primary Domain (Production):**
- `figurefinance.co` ← Set as PRIMARY/PRODUCTION domain
- Click the three dots → "Edit" → Check "Redirect to primary domain"

**WWW Domain (Redirect to primary):**
- `www.figurefinance.co` ← Add if not already present
- Click the three dots → "Edit" 
- Select "Redirect to figurefinance.co"
- Choose "Permanent (308)"

### 4. Remove Any Other Domains
- Remove any `*.vercel.app` domains from production branch if present
- Or set them to redirect to `figurefinance.co`

### Expected Configuration:

```
✓ figurefinance.co (Primary - Production)
  └─ Branch: main
  
→ www.figurefinance.co (Redirect to figurefinance.co - 308)
  └─ Redirects to: figurefinance.co
```

## Verification After Configuration

Wait 2-3 minutes after saving, then test:

```bash
# Should return 200 OK
curl -I https://figurefinance.co/

# Should return 308 or 301 redirect to https://figurefinance.co/
curl -I https://www.figurefinance.co/

# Should return 308 redirect to https://figurefinance.co/
curl -I http://figurefinance.co/
```

## Google Search Console Actions

After Vercel configuration is complete:

1. **Verify Both Domains:**
   - Verify `figurefinance.co` as domain property
   - Verify `www.figurefinance.co` as domain property

2. **Set Preferred Domain:**
   - In old GSC interface: Settings → Preferred domain → "Display URLs as figurefinance.co"
   - In new GSC: The canonical tags will handle this

3. **Update Sitemap:**
   - Remove old sitemap if any
   - Add: `https://figurefinance.co/sitemap.xml`

4. **Request Indexing:**
   - URL Inspection tool → Request indexing for:
     - https://figurefinance.co/
     - https://figurefinance.co/debt
     - https://figurefinance.co/mortgage
     - https://figurefinance.co/savings

5. **Monitor Coverage Report:**
   - Check "Page indexing" report daily
   - "Duplicate without user-selected canonical" should disappear
   - Pages should move from "Discovered - not indexed" to "Indexed"

## Timeline

- Immediate: Redirect changes take effect after Vercel deployment
- 1-3 days: Google detects redirect changes
- 1-2 weeks: Indexing status stabilizes
- 2-4 weeks: Full transition complete

## Troubleshooting

If www still doesn't redirect after 5 minutes:
1. Check Vercel deployment logs for errors
2. Verify vercel.json is in project root
3. Clear Vercel cache: Settings → General → Clear Cache
4. Redeploy: Deployments → Latest → Redeploy
