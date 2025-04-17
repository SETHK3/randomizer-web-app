// app/utils/adsConfig.ts

/**
 * Google AdSense Configuration
 * ----------------------------
 * To set up Google AdSense:
 * 1. Create a Google AdSense account at https://www.google.com/adsense/
 * 2. Complete the verification process and get your Publisher ID
 * 3. Create ad units in your AdSense dashboard and note down the slot IDs
 * 4. Replace the placeholder values below with your actual IDs
 * 5. Update your site's robots.txt and privacy policy to comply with AdSense policies
 */
export const adConfig = {
  // Your actual Google AdSense Publisher ID
  publisherId: "ca-pub-4303032405106237",
  // Define various ad slots with sizes
  adSlots: {
    header: {
      id: "header-ad",
      slot: "9358110102", // Header/Footer Bar Ad slot
      sizes: [
        [728, 90], // Leaderboard
        [970, 90], // Large leaderboard
      ],
    },
    sidebar: {
      id: "sidebar-ad",
      slot: "9358110102", // Using same slot for sidebar
      sizes: [
        [300, 250], // Medium rectangle
        [300, 600], // Large skyscraper
      ],
    },
    footer: {
      id: "footer-ad",
      slot: "9358110102", // Header/Footer Bar Ad slot
      sizes: [[728, 90]], // Leaderboard
    },
  },
};
