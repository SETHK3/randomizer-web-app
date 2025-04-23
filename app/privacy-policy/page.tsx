"use client";

import React from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-800 text-white min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-400 hover:underline">
            &larr; Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Introduction</h2>
            <p>
              This Privacy Policy describes how the Pick Me Generator ("we",
              "our", or "us") collects, uses, and shares information when you
              use our website. Your privacy is important to us, and we are
              committed to protecting it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Information We Collect
            </h2>
            <p>
              We collect information that you provide directly to us, such as
              when you create a selection list, use the randomizer feature, or
              communicate with us.
            </p>
            <p className="mt-2">
              We also automatically collect certain information about your
              device and how you interact with our website, including:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>
                Log information (such as IP address, browser type, pages
                visited)
              </li>
              <li>
                Device information (such as your operating system and screen
                resolution)
              </li>
              <li>Location information (based on your IP address)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Provide, maintain, and improve our website</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Advertising</h2>
            <p>
              We use Google AdSense to display advertisements on our website.
              Google AdSense may use cookies and web beacons to collect
              information about your visits to this and other websites in order
              to provide relevant advertisements about goods and services that
              may be of interest to you.
            </p>
            <p className="mt-2">
              Google AdSense also may use information about your visits to this
              and other websites to target advertisements for goods and
              services. This information is collected through the use of cookies
              and web beacons and does not identify you personally. You can opt
              out of Google's use of cookies by visiting the{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Settings page
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Your Choices</h2>
            <p>
              You can choose not to provide certain information, but this may
              limit your ability to use some features of our website.
            </p>
            <p className="mt-2">
              Most web browsers are set to accept cookies by default. You can
              usually choose to set your browser to remove or reject browser
              cookies. Please note that if you choose to remove or reject
              cookies, this could affect the availability and functionality of
              our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at privacy@pickmegenerator.com.
            </p>
          </section>

          <p className="text-sm text-gray-400 mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
