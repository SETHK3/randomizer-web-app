"use client";

import React from "react";

export default function MinimalContent() {
  return (
    <div className="minimal-content px-4 py-4 text-white text-sm font-kdam">
      <h3 className="text-lg mb-2">Welcome to the Pick Me Generator</h3>
      <p className="mb-2">
        This tool helps you randomly select items from your custom list.
      </p>
      <p className="mb-2">
        To get started, add items to your Pick Me Bank using the input field
        above. Then click the Randomize button to randomly select an item.
      </p>
      <p className="mb-2">Uses include:</p>
      <ul className="list-disc pl-5 mb-2">
        <li>Randomly picking a student in a classroom</li>
        <li>Selecting a winner from a list of participants</li>
        <li>Deciding which task to tackle first from your to-do list</li>
        <li>Choosing a restaurant or movie when you can't decide</li>
      </ul>
    </div>
  );
}
