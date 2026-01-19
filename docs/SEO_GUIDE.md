# SEO Guide - Financial Calculator Website

## Primary Keywords & Target Pages

### Phase 1 Calculators (KD <25)

| Calculator | Primary Keyword | Volume | KD | Secondary Keywords |
|-----------|----------------|---------|----|--------------------|
| Snowball Debt | snowball debt calculator | 2,900 | 12 | debt snowball tool, snowball method calculator |
| Biweekly Mortgage | biweekly mortgage payment calculator | 480 | 14 | biweekly payment calculator, bi-weekly mortgage |
| Early Mortgage Payoff | early mortgage payoff calculator | 8,100 | 18 | mortgage payoff calculator early, pay off mortgage early |
| Balance Transfer | balance transfer calculator | 2,400 | 18 | credit card balance transfer calculator |
| Savings Goal | savings goal calculator | 2,400 | 22 | savings calculator goal, goal savings |

### Phase 2 Calculators (KD 25-35)

| Calculator | Primary Keyword | Volume | KD | Secondary Keywords |
|-----------|----------------|---------|----|--------------------|
| Debt Snowball | debt snowball calculator | 5,400 | 21 | snowball calculator, debt snowball method |
| Mortgage Payoff | mortgage payoff calculator | 49,500 | 32 | payoff mortgage calculator, home loan payoff |
| HELOC | HELOC calculator | 49,500 | 37 | home equity line of credit calculator |
| Dividend | dividend calculator | 33,100 | 35 | stock dividend calculator, dividend yield |
| Self Employment Tax | self employment tax calculator | 9,900 | 37 | self employed tax calculator |

---

## Meta Tags by Calculator

### Snowball Debt Calculator

```typescript
title: "Snowball Debt Calculator | Pay Off Debt Faster - FigureFinance"
description: "Calculate your debt payoff timeline using the snowball method. Free calculator shows monthly payments, payoff dates, and total interest saved. No signup required."
```

**H1:** `Snowball Debt Calculator - Pay Off Debt Faster`

**URL:** `/debt/snowball-debt-calculator`

**Target:** snowball debt calculator (2,900 vol, KD 12)

---

### Biweekly Mortgage Payment Calculator

```typescript
title: "Biweekly Mortgage Payment Calculator | Save on Interest - FigureFinance"
description: "Calculate how much you'll save with biweekly mortgage payments. Free calculator shows interest savings, payoff timeline, and payment schedule."
```

**H1:** `Biweekly Mortgage Payment Calculator`

**URL:** `/mortgage/biweekly-mortgage-payment-calculator`

**Target:** biweekly mortgage payment calculator (480 vol, KD 14)

---

### Early Mortgage Payoff Calculator

```typescript
title: "Early Mortgage Payoff Calculator | Pay Off Your Mortgage Faster - FigureFinance"
description: "Calculate how much you can save by making extra mortgage payments. Free tool shows payoff date, interest savings, and payment schedules."
```

**H1:** `Early Mortgage Payoff Calculator - See Your Savings`

**URL:** `/mortgage/early-mortgage-payoff-calculator`

**Target:** early mortgage payoff calculator (8,100 vol, KD 18)

---

### Balance Transfer Calculator

```typescript
title: "Balance Transfer Calculator | Calculate Transfer Savings - FigureFinance"
description: "Compare balance transfer offers and calculate potential savings. Free calculator factors in fees, interest rates, and promotional periods."
```

**H1:** `Balance Transfer Calculator - Find the Best Deal`

**URL:** `/debt/balance-transfer-calculator`

**Target:** balance transfer calculator (2,400 vol, KD 18)

---

### Savings Goal Calculator

```typescript
title: "Savings Goal Calculator | Reach Your Financial Goals - FigureFinance"
description: "Calculate how much to save monthly to reach your goal. Free calculator shows timeline, monthly contributions, and total interest earned."
```

**H1:** `Savings Goal Calculator - Plan Your Savings`

**URL:** `/savings/savings-goal-calculator`

**Target:** savings goal calculator (2,400 vol, KD 22)

---

## Content Structure Template

Every calculator page follows this structure:

### 1. Hero Section (Above Fold)
```html
<section class="hero">
  <div class="breadcrumbs">
    <a href="/">Home</a> > <a href="/[category]">[Category]</a> > [Calculator Name]
  </div>
  
  <h1>[Primary Keyword + Benefit]</h1>
  
  <p class="intro">
    [2-3 sentences introducing the calculator and including primary keyword]
  </p>
</section>
```

**Example (Snowball Debt):**
```
H1: Snowball Debt Calculator - Pay Off Debt Faster

Use our snowball debt calculator to create a debt payoff plan that saves you money on interest. The debt snowball method helps you eliminate debts by paying off the smallest balance first, building momentum as you go. See your debt-free date and total interest savings instantly.
```

### 2. Calculator Interface

Form on left (or top on mobile), results on right (or below).

### 3. How to Use Section

```html
<h2>How to Use the [Calculator Name]</h2>

<h3>Step 1: Enter Your Debts</h3>
<p>[Explain what to enter]</p>

<h3>Step 2: Add Payment Information</h3>
<p>[Explain payment details]</p>

<h3>Step 3: Review Your Results</h3>
<p>[Explain how to interpret results]</p>
```

### 4. Understanding Section

```html
<h2>Understanding [Key Concept]</h2>

<p>[3-4 paragraphs explaining the concept]</p>

<h3>[Sub-concept 1]</h3>
<p>[Explanation with examples]</p>

<h3>[Sub-concept 2]</h3>
<p>[Explanation with industry benchmarks]</p>
```

**Example (Snowball Debt):**
```
H2: Understanding the Debt Snowball Method

The debt snowball method is a debt repayment strategy where you pay off your debts from smallest to largest balance, regardless of interest rate. You make minimum payments on all debts except the smallest one, which gets any extra payment you can afford.

When the smallest debt is paid off, you take that payment amount and apply it to the next smallest debt. This creates a "snowball effect" as your payments grow larger with each paid-off debt.

H3: Snowball vs Avalanche Method
The debt snowball focuses on small wins for motivation, while the debt avalanche method targets highest-interest debts first to save more money. Studies show the snowball method has higher completion rates because of the psychological wins.

H3: Average Debt Payoff Timeline
According to a 2023 Federal Reserve study, Americans with the median debt load ($15,000) who follow the snowball method typically pay off all debts in 18-36 months, depending on their extra payment capacity.
```

### 5. Why Use Section

```html
<h2>Why Use Our [Calculator Name]?</h2>

<ul>
  <li><strong>Benefit 1:</strong> Description</li>
  <li><strong>Benefit 2:</strong> Description</li>
  <li><strong>Benefit 3:</strong> Description</li>
  <li><strong>No signup required:</strong> Start calculating immediately</li>
</ul>
```

### 6. FAQ Section

```html
<h2>Frequently Asked Questions</h2>

<h3>[Question 1 with secondary keyword]?</h3>
<p>[Answer in 2-4 sentences]</p>

<h3>[Question 2 from Google PAA]?</h3>
<p>[Answer in 2-4 sentences]</p>

[5-8 total questions]
```

**Example FAQs (Snowball Debt):**
- Does the debt snowball method really work?
- How long does it take to pay off debt using the snowball method?
- Should I use snowball or avalanche method?
- What debts should I include in my snowball plan?
- Can I use the snowball method with student loans?

### 7. Related Calculators

```html
<h2>Related Calculators</h2>

<div class="grid-calculators">
  <a href="/[related-calc-1]" class="card-calculator">
    <h3>[Calculator Name]</h3>
    <p>[Brief description]</p>
  </a>
  
  [3-6 related calculator cards]
</div>
```

---

## Schema Markup

### WebApplication Schema (All Calculators)

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "[Calculator Name]",
  "description": "[Same as meta description]",
  "url": "[Full calculator URL]",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "[Feature 1]",
    "[Feature 2]",
    "[Feature 3]"
  ]
}
```

### FAQPage Schema (If 3+ FAQs)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text]"
      }
    }
  ]
}
```

### BreadcrumbList Schema (All Pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://figurefinance.co"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "[Category]",
      "item": "[Category URL]"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Calculator Name]"
    }
  ]
}
```

---

## Internal Linking Strategy

### From Homepage

Homepage should have sections:
- Debt Calculators (links to /debt/ hub)
- Mortgage Calculators (links to /mortgage/ hub)
- Investment Calculators (links to /investment/ hub)
- Tax Calculators (links to /tax/ hub)
- Savings Calculators (links to /savings/ hub)

Each section shows 3-4 featured calculators with links.

### From Category Hubs

Each hub page (e.g., /debt/) links to:
- All calculators in that category
- Brief description of each calculator
- Clear "Calculate now →" CTA for each

### From Calculator Pages

Each calculator includes:
- Breadcrumb links (Home > Category > Calculator)
- 1-2 contextual links in "Understanding" section
- 3-6 related calculator cards at bottom
- Link back to category hub

### Anchor Text Strategy

**Distribution:**
- 40% Exact match: "snowball debt calculator"
- 30% Partial match: "calculate your debt snowball"
- 20% Branded: "FigureFinance debt calculator"
- 10% Generic: "this calculator", "try our tool"

**Example Internal Links (Snowball Debt Calculator):**
```html
In "Understanding" section:
"If you prefer to save more on interest, check our 
<a href="/debt/debt-avalanche-calculator">debt avalanche calculator</a> 
which targets high-interest debts first."

In FAQ:
"For credit card-specific strategies, use our 
<a href="/debt/balance-transfer-calculator">balance transfer calculator</a>."

In related calculators section:
<a href="/debt/debt-snowball-calculator">Debt Snowball Calculator</a>
<a href="/mortgage/early-mortgage-payoff-calculator">Early Mortgage Payoff Calculator</a>
```

---

## Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Homepage -->
  <url>
    <loc>https://figurefinance.co</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Category Hubs -->
  <url>
    <loc>https://figurefinance.co/debt/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Calculator Pages -->
  <url>
    <loc>https://figurefinance.co/debt/snowball-debt-calculator</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <lastmod>[ISO Date]</lastmod>
  </url>
  
  <!-- Static Pages -->
  <url>
    <loc>https://figurefinance.co/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  
</urlset>
```

**Priority Guidelines:**
- Homepage: 1.0
- Calculator pages: 0.9
- Category hubs: 0.8
- Static pages: 0.3

---

## Robots.txt

```
User-agent: *
Allow: /

# Sitemap
Sitemap: https://figurefinance.co/sitemap.xml

# No admin or API routes (if any exist)
Disallow: /api/
```

---

## Google Search Console Setup

### Initial Setup Tasks

1. **Add Property:**
   - Add domain property (preferred) or URL prefix
   - Verify via DNS, HTML tag, or Google Analytics

2. **Submit Sitemap:**
   - Go to Sitemaps section
   - Submit `https://figurefinance.co/sitemap.xml`

3. **Request Indexing:**
   - For each new calculator, request indexing manually
   - Use URL Inspection tool

### Weekly Monitoring

**Performance Report:**
- Track impressions, clicks, CTR, position
- Filter by query to see keyword rankings
- Filter by page to see which calculators are ranking

**Coverage Report:**
- Check for indexing errors
- Ensure all calculators are indexed
- Fix any "Crawled - not indexed" issues

**Quick Wins to Monitor:**
- Queries with position 11-20 (page 2)
- Improve these first with content updates
- Add internal links to these pages

---

## Featured Snippet Optimization

### Paragraph Snippets

For questions like "What is [concept]?":
```html
<h3>What is the debt snowball method?</h3>
<p>
The debt snowball method is a debt payoff strategy where you pay off debts from smallest to largest balance, making minimum payments on all but the smallest debt. Once the smallest debt is paid off, you apply that payment to the next smallest debt, creating a "snowball effect" of growing payments.
</p>
```

**Rules:**
- Answer in first 40-60 words
- Use simple, direct language
- Define the term clearly

### List Snippets

For "how to" questions:
```html
<h3>How to use the debt snowball method:</h3>
<ol>
  <li>List all debts from smallest to largest balance</li>
  <li>Make minimum payments on all debts</li>
  <li>Put extra money toward the smallest debt</li>
  <li>When smallest debt is paid off, roll that payment to the next smallest</li>
  <li>Repeat until all debts are paid</li>
</ol>
```

### Table Snippets

For comparison questions:
```html
<h3>Debt Snowball vs Debt Avalanche Comparison</h3>
<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Payoff Order</th>
      <th>Best For</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Debt Snowball</td>
      <td>Smallest to largest balance</td>
      <td>Motivation and quick wins</td>
    </tr>
    <tr>
      <td>Debt Avalanche</td>
      <td>Highest to lowest interest</td>
      <td>Saving maximum interest</td>
    </tr>
  </tbody>
</table>
```

---

## Content Update Schedule

### Monthly Updates

For each calculator in top 10 results:
- Update statistics with latest data
- Add new FAQ based on Google PAA
- Improve content based on GSC queries
- Add more internal links

### Quarterly Updates

- Full content audit of all calculators
- Update "Last updated: [date]" on all pages
- Add new related calculators to bottom sections
- Refresh examples with current numbers

### Annual Updates

- Update all tax-related formulas (Jan)
- Refresh all statistics and benchmarks
- Review and consolidate underperforming pages
- Add new calculators based on keyword research

---

## Technical SEO Checklist

### Every Calculator Page

- [ ] Unique title tag with primary keyword
- [ ] Unique meta description with primary keyword and "free"
- [ ] H1 tag with primary keyword
- [ ] H2-H3 hierarchy for sections
- [ ] Primary keyword in first paragraph
- [ ] Primary keyword in at least one H2
- [ ] 1,500-2,500 words total content
- [ ] 3-5 internal links to related calculators
- [ ] Canonical URL set correctly
- [ ] Schema markup (WebApplication, FAQPage, Breadcrumbs)
- [ ] Last updated date visible
- [ ] Mobile responsive
- [ ] Page speed score >90

### Sitemap

- [ ] All calculator pages included
- [ ] All category hub pages included
- [ ] Priority and changefreq set correctly
- [ ] Last modified dates accurate
- [ ] Submitted to Google Search Console
- [ ] No 404 or redirect URLs in sitemap

### Robots.txt

- [ ] Allows all public pages
- [ ] Sitemap location specified
- [ ] No important pages blocked

---

## Keyword Placement Guide

### Must Include Primary Keyword

**Locations (7 minimum):**
1. Title tag
2. Meta description
3. H1 tag
4. First paragraph (within first 100 words)
5. At least one H2 heading
6. Image alt text (if applicable)
7. URL slug

**Avoid:**
- Forcing keyword where it doesn't fit naturally
- Using exact keyword more than 8-10 times per page (1-2% density)
- Sacrificing readability for SEO

### Secondary Keywords

Include naturally in:
- H2 and H3 headings
- FAQ questions
- Link anchor text
- Image alt text
- Body content

**Example (Snowball Debt Calculator):**
- Primary: "snowball debt calculator"
- Secondary: "debt snowball method", "snowball method calculator", "debt payoff calculator", "pay off debt fast"

---

## Common SEO Mistakes to Avoid

### Content Mistakes
- ❌ Thin content (<1,000 words)
- ❌ Duplicate content across calculators
- ❌ Keyword stuffing
- ❌ Not answering the user's question
- ❌ Outdated statistics and data

### Technical Mistakes
- ❌ Slow page load (>3s)
- ❌ Not mobile-friendly
- ❌ Broken internal links
- ❌ Missing meta descriptions
- ❌ Duplicate title tags
- ❌ No sitemap

### Link Building Mistakes
- ❌ No internal links
- ❌ Generic anchor text ("click here")
- ❌ Linking only to homepage
- ❌ Too many external links

---

## Success Metrics (Internal Only)

Track these in Google Analytics and Search Console:
- Organic traffic per calculator
- Average position per keyword
- Click-through rate (CTR) from search results
- Pages per session
- Bounce rate
- Calculator completion rate

**Goals by Phase:**
- Month 1: All pages indexed, positions tracked
- Month 3: 500-1,500 monthly visits, average position <20
- Month 6: 5,000-10,000 monthly visits, 5+ keywords in top 10

---

## Content Differentiation Strategy

Since competitors exist, differentiate with:
1. **Clearer explanations** - 8th grade reading level
2. **Visual results** - Charts, graphs, schedules
3. **More examples** - Real numbers, not just formulas
4. **Comparison modes** - Side-by-side strategy comparisons
5. **No signup required** - Emphasized in meta descriptions
6. **Mobile-first design** - Better mobile experience
7. **Updated data** - Current statistics with sources

---

## Quick Reference: Phase 1 Priorities

### Week 1
- Build snowball debt calculator
- Build biweekly mortgage calculator
- Optimize both for SEO
- Submit to Google Search Console

### Week 2
- Build early payoff calculator
- Build balance transfer calculator
- Add internal links between all 4 calculators
- Create /debt/ and /mortgage/ hub pages

### Week 3
- Build savings goal calculator
- Create /savings/ hub page
- Update homepage with all calculator links
- Submit updated sitemap

### Week 4
- Content audit all 5 calculators
- Add FAQ sections
- Optimize for featured snippets
- Request indexing for all pages
- Monitor GSC for initial rankings
