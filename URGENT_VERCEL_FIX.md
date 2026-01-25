# URGENT: Fix Domain Redirect in Vercel Dashboard

## Current Problem

The site has the redirect backwards:
- ✅ `http://figurefinance.co` → `https://figurefinance.co` (correct)
- ❌ `https://figurefinance.co` → `https://www.figurefinance.co` (WRONG!)
- ❌ `https://www.figurefinance.co` → returns 200 (should redirect)

This is causing Google to see duplicate content and not index pages.

## Fix Required: Vercel Dashboard Configuration

### Step 1: Access Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Login to your account
3. Click on the `figurefinance.co` project (or `figurefinance`)

### Step 2: Navigate to Domain Settings

1. Click on **Settings** tab (top navigation)
2. Click on **Domains** in the left sidebar

### Step 3: Check Current Domain Configuration

You should see something like:

```
Production Domains:
- figurefinance.co
- www.figurefinance.co
```

### Step 4: Set Primary Domain (Critical!)

**For `figurefinance.co`:**
1. Find `figurefinance.co` in the domain list
2. Click the three dots `...` menu on the right
3. Look for an option like:
   - "Edit" or "Make Primary" or "Set as Primary"
4. Make sure this domain is set as the **Primary Production Domain**
5. Make sure "Redirect to" is **NOT** checked or set

**For `www.figurefinance.co`:**
1. Find `www.figurefinance.co` in the domain list
2. Click the three dots `...` menu on the right
3. Click "Edit"
4. Look for "Redirect" option
5. Select: **"Redirect to figurefinance.co"** or **"Redirect to Primary Domain"**
6. Choose redirect type: **"Permanent (308)"** or **"Permanent (301)"**
7. Save

### Step 5: Expected Final Configuration

After configuration, it should look like:

```
✓ figurefinance.co
  • Branch: main (Primary)
  • No redirects
  
→ www.figurefinance.co
  • Redirects to: figurefinance.co
  • Type: Permanent (308)
```

### Step 6: Alternative - Remove and Re-add Domains

If the above doesn't work, try this:

1. **Remove www domain:**
   - Click three dots next to `www.figurefinance.co`
   - Click "Remove"
   - Confirm removal

2. **Verify non-www is primary:**
   - Make sure `figurefinance.co` is set as Production domain
   - Verify it's assigned to `main` branch

3. **Re-add www as redirect:**
   - Click "Add" or "Add Domain" button
   - Enter: `www.figurefinance.co`
   - When asked how to configure:
     - Select "Redirect to another domain"
     - Target: `figurefinance.co`
     - Type: Permanent (308 or 301)
   - Save

### Step 7: Verify Changes

Wait 2-3 minutes, then test:

```bash
# Should return 200 OK with no redirect
curl -I https://figurefinance.co/

# Should return 301 or 308 redirect
curl -I https://www.figurefinance.co/

# Should return 308 redirect to https
curl -I http://figurefinance.co/
```

Expected output for www:
```
HTTP/2 301 (or 308)
location: https://figurefinance.co/
```

### Step 8: Clear Vercel Cache (if needed)

If redirects still don't work after 5 minutes:

1. Go to Settings → General
2. Scroll to "Clear Build Cache"
3. Click "Clear Build Cache"
4. Go to Deployments
5. Click "..." on latest deployment
6. Click "Redeploy"

## Common Issues

### Issue: No "Redirect" option visible

**Solution:** The domain might be set as primary. First remove it, then re-add it with redirect option.

### Issue: Both domains show as "Production"

**Solution:** Only one domain should be primary. Set `figurefinance.co` as primary, then www will show redirect option.

### Issue: Changes don't take effect

**Solution:** 
1. Clear build cache (Settings → General)
2. Redeploy (Deployments → latest → Redeploy)
3. Wait 5 minutes
4. Test again

## After Fixing Vercel

Once the redirect works correctly:

1. **Google Search Console:**
   - URL Inspection for all pages
   - Request re-indexing
   - Submit sitemap: `https://figurefinance.co/sitemap.xml`

2. **Monitor:**
   - Check GSC Page Indexing report in 3-5 days
   - "Duplicate without user-selected canonical" should disappear
   - Pages should move to "Indexed"

## Contact

If you can't find these options in Vercel Dashboard:
- Check Vercel documentation: https://vercel.com/docs/projects/domains
- Contact Vercel Support: https://vercel.com/support
- Share screenshots of your Domains settings page

## Verification Commands

After configuration:

```bash
# Test non-www (should be 200 OK)
curl -sI https://figurefinance.co/ | grep -E "(HTTP|location)"

# Test www (should redirect to non-www)
curl -sI https://www.figurefinance.co/ | grep -E "(HTTP|location)"

# Test http (should redirect to https)
curl -sI http://figurefinance.co/ | grep -E "(HTTP|location)"
```

Expected results:
```
# Non-www:
HTTP/2 200

# WWW:
HTTP/2 308
location: https://figurefinance.co/

# HTTP:
HTTP/1.0 308
Location: https://figurefinance.co/
```
