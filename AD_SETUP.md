# Ad Revenue Setup Guide

This guide explains how to set up ad revenue generation in the Pick Me Generator application.

## Implemented Ad Solutions

The application is currently set up with Google AdSense integration. You can easily switch to other ad providers by modifying the AdUnit component.

## Google AdSense Setup

### Step 1: Create an AdSense Account

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign up for an account and complete the verification process
3. Wait for your account to be approved (this can take days to weeks)

### Step 2: Configure Your Site

1. Add your website to your AdSense account
2. Get your Publisher ID (format: ca-pub-XXXXXXXXXXXXXXXX)
3. Create ad units in your AdSense dashboard:
   - Header ad (recommended size: 728x90)
   - Sidebar ad (recommended size: 300x250 or 300x600)
   - Footer ad (recommended size: 728x90)
4. Note down the ad slot IDs for each ad unit

### Step 3: Update Configuration

1. Open `app/utils/adsConfig.ts`
2. Replace the placeholder Publisher ID with your actual ID
3. Replace the placeholder slot IDs with your actual slot IDs

```typescript
// Example configuration
export const adConfig = {
  publisherId: "ca-pub-1234567890123456", // Your actual Publisher ID
  adSlots: {
    header: {
      id: "header-ad",
      slot: "5678901234", // Your actual slot ID
      sizes: [
        [728, 90], // Leaderboard
        [970, 90], // Large leaderboard
      ],
    },
    // Other ad slots...
  },
};
```

## Ad Placement

The app includes three strategic ad placements:

1. **Header Ad**: Appears at the top of the page
2. **Sidebar Ad**: Appears on the right side of the main content
3. **Footer Ad**: Appears at the bottom of the page

You can customize the appearance and position of these ads by modifying the corresponding components in `app/page.tsx`.

## Compliance Requirements

To comply with ad network policies:

1. Create a Privacy Policy page that discloses your use of ads
2. Set up a robots.txt file to allow ad crawlers
3. Ensure your site content complies with AdSense program policies
4. Do not click on your own ads (this violates terms of service)

## Alternative Ad Networks

If you prefer not to use Google AdSense, you can integrate other ad networks:

- **Amazon Associates**: For product-based ads
- **Media.net**: An alternative to AdSense
- **Ezoic**: Platform for optimizing ad revenue

To switch networks, modify the `AdUnit.tsx` component to use the appropriate scripts and ad tags.

## Performance Considerations

Ads can impact your site's performance. Consider:

- Lazy loading ads below the fold
- Setting fixed dimensions for ad containers to reduce layout shifts
- Monitoring site performance after implementing ads

## Troubleshooting

If ads aren't displaying:

1. Check browser console for errors
2. Verify your account is approved and active
3. Ensure ad blockers are disabled for testing
4. Confirm the correct IDs are being used
