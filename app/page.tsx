"use client";

import Link from "next/link";
import { AdUnit } from "./components";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Header Ad */}
      <AdUnit
        adSlot="header"
        className="w-full flex justify-center py-1 bg-gray-900"
      />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-press-start">
            Random Pick Generator
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            A powerful tool for making random selections, perfect for
            classrooms, games, and decision-making.
          </p>
          <Link
            href="/randomizer"
            className="bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-purple-500 hover:text-white transition-colors duration-300 inline-block"
          >
            Try the Randomizer
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Easy to Use</h3>
            <p className="text-gray-300">
              Simply add your items and let the randomizer do the work. Perfect
              for quick decisions and fun activities.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Multiple Uses</h3>
            <p className="text-gray-300">
              Great for classroom activities, game nights, team selections, and
              any situation where you need a fair random pick.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Save Your Lists</h3>
            <p className="text-gray-300">
              Your lists are automatically saved, so you can come back to them
              anytime. Perfect for recurring activities.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-bold mb-2">Add Items</h3>
              <p className="text-gray-300">
                Enter the items you want to randomize
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-bold mb-2">Click Randomize</h3>
              <p className="text-gray-300">Start the randomization process</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-bold mb-2">Watch the Animation</h3>
              <p className="text-gray-300">
                Enjoy the exciting selection process
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="font-bold mb-2">Get Your Result</h3>
              <p className="text-gray-300">See your randomly selected item</p>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Perfect For</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Classroom Activities</h3>
              <ul className="list-disc list-inside text-gray-300">
                <li>Student selection</li>
                <li>Group assignments</li>
                <li>Quiz questions</li>
                <li>Presentation order</li>
              </ul>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Games & Entertainment</h3>
              <ul className="list-disc list-inside text-gray-300">
                <li>Game night selections</li>
                <li>Team picking</li>
                <li>Prize winners</li>
                <li>Random challenges</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            href="/randomizer"
            className="bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-purple-500 hover:text-white transition-colors duration-300 inline-block"
          >
            Start Randomizing Now
          </Link>
        </div>
      </div>
    </div>
  );
}
