"use client";

import React from "react";
import { Word } from "../utils/api";

interface SidebarProps {
  students: Word[];
  onClearAll: () => void;
}

export default function Sidebar({ students, onClearAll }: SidebarProps) {
  console.log("Sidebar received words:", students);

  return (
    <div className="w-1/5 h-full bg-sidebar-blue flex flex-col justify-between font-kdam">
      <div className="w-full flex h-full flex-col p-5">
        <div className="w-full mb-5 border-b-2 border-white pb-2.5 text-left pl-4 flex justify-between items-center">
          <h2 className="text-white">Pick Me Bank</h2>
          <button
            onClick={onClearAll}
            className="bg-red-600 text-white px-2 py-0.5 text-xs rounded hover:bg-red-700"
          >
            Clear
          </button>
        </div>

        <div className="flex-grow flex flex-col overflow-y-auto">
          {students && students.length > 0 ? (
            students.map((word, index) => (
              <p
                key={word.id || index}
                className={`pl-4 pr-2 py-2 my-2 text-student-gold break-words ${
                  word.selected ? "selected bg-blue-900 rounded" : ""
                }`}
              >
                {word.name}
              </p>
            ))
          ) : (
            <p className="pl-4 my-5 text-white">No selections in bank yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
