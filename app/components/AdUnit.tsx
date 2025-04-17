// app/components/AdUnit.tsx
"use client";

import React, { useEffect } from "react";
import { adConfig } from "../utils/adsConfig";

// Declare global AdSense type
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdUnitProps {
  adSlot: "header" | "sidebar" | "footer";
  className?: string;
}

export default function AdUnit({ adSlot, className = "" }: AdUnitProps) {
  useEffect(() => {
    // Initialize ads with a small delay to ensure the script has loaded
    try {
      const timeoutId = setTimeout(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }, 200);

      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  const slotConfig = adConfig.adSlots[adSlot];

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adConfig.publisherId}
        data-ad-slot={slotConfig.slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
