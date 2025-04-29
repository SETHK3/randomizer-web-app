"use client";

import React from "react";
import { Word } from "../utils/api";

interface SidebarProps {
  students: Word[];
  onClearAll: () => void;
  onDeleteItem: (id: number) => void;
}

export default function Sidebar({
  students,
  onClearAll,
  onDeleteItem,
}: SidebarProps) {
  console.log("Sidebar received words:", students);

  return (
    <div className="w-full h-full bg-sidebar-blue flex flex-col font-kdam overflow-hidden">
      <div className="w-full flex flex-col p-2 h-full">
        <div className="w-full mb-2 border-b-2 border-white pb-1 text-left pl-2 flex justify-between items-center">
          <h2 className="text-white text-sm md:text-base">Pick Me Bank</h2>
          <button
            onClick={onClearAll}
            className="bg-red-600 text-white px-2 py-0.5 text-xs rounded hover:bg-red-700"
          >
            Clear
          </button>
        </div>

        <div
          className="sidebar-content flex-grow overflow-y-auto"
          style={{
            minHeight: "120px",
          }}
        >
          {students && students.length > 0 ? (
            <div className="word-grid flex flex-col md:block">
              {students.map((word, index) => (
                <div
                  key={word.id || index}
                  className={`word-item-container group relative pl-2 pr-2 py-1 my-1 rounded transition-colors duration-200 ${
                    word.selected ? "bg-blue-900" : "hover:bg-blue-800/50"
                  }`}
                >
                  <p className="text-student-gold break-words text-sm">
                    {word.name}
                  </p>
                  <button
                    onClick={() => onDeleteItem(word.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="pl-2 my-2 text-white text-sm">
              No selections in bank yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
