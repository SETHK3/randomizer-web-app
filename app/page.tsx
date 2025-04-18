"use client";

import { useState, useEffect, useRef } from "react";
import { LoadingDots, Sidebar, AdUnit } from "./components";
import { Word, getStudents, getRandomStudent, addWord } from "./utils/api";

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [message, setMessage] = useState<string>("On Your Mark, Get Set");
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newWord, setNewWord] = useState<string>("");
  const [addingWord, setAddingWord] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [shuffleText, setShuffleText] = useState<string>("");
  const [shuffleColorIndex, setShuffleColorIndex] = useState<number>(0);
  const [isFinalSelection, setIsFinalSelection] = useState<boolean>(false);
  const [hasRandomized, setHasRandomized] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Shuffle animation settings
  const shuffleSpeed = 100; // ms between shuffles
  const shuffleDuration = 2000; // total shuffle duration in ms
  const displayDuration = 5000; // how long to display the final selection

  // Fetch words list on component mount
  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const data = await getStudents();
      setWords(
        data.results.map((word: Word) => ({
          ...word,
          selected: false,
        }))
      );
    } catch (error) {
      console.error("Error fetching words:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearWords = () => {
    setWords([]);
    // Clear both localStorage items to ensure data is fully reset
    localStorage.removeItem("wordBank");
    localStorage.removeItem("savedWords");
    setMessage("On Your Mark, Get Set");
    setSelectedWord(null);
    setHasRandomized(false);
  };

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim()) return;

    try {
      setAddingWord(true);

      await addWord(newWord.trim());
      setNewWord("");
      await fetchWords(); // Refresh the word list

      // Focus back on the input after adding
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    } catch (error) {
      console.error("Error adding word:", error);
    } finally {
      setAddingWord(false);
    }
  };

  const handleSelectRandomWord = async () => {
    // Don't run if already shuffling
    if (isShuffling) return;

    try {
      // Reset selection state first
      setWords(words.map((word) => ({ ...word, selected: false })));
      setIsShuffling(true);
      setIsFinalSelection(false);
      setMessage("");

      const data = await getRandomStudent();

      if (data.results && data.results.length > 0) {
        const randomWord = data.results[0];

        // Start shuffle animation
        const shuffleInterval = setInterval(() => {
          // Generate a random index for the color
          setShuffleColorIndex(Math.floor(Math.random() * 5));

          // Select a random word from the list for display during shuffle
          if (words.length > 0) {
            const randomIndex = Math.floor(Math.random() * words.length);
            setShuffleText(words[randomIndex].name);
          }
        }, shuffleSpeed);

        // End the shuffle animation after the duration
        setTimeout(() => {
          clearInterval(shuffleInterval);
          setShuffleText(randomWord.name);
          setIsFinalSelection(true);

          // After a brief pause, show the final result
          setTimeout(() => {
            setIsShuffling(false);
            setIsFinalSelection(false);
            setShuffleText("");

            // Set that we've randomized at least once
            setHasRandomized(true);
            setSelectedWord(randomWord.name);
            setMessage(randomWord.name);

            // Update words list with selected
            setWords(
              words.map((word) => ({
                ...word,
                selected: word.id === randomWord.id,
              }))
            );
          }, 2000);
        }, shuffleDuration);
      }
    } catch (error) {
      console.error("Error selecting random word:", error);
      setIsShuffling(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden p-0 m-0 bg-gray-800">
      {/* Header Ad */}
      <AdUnit
        adSlot="header"
        className="w-full flex justify-center py-1 bg-gray-900"
      />

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Sidebar on all screen sizes - positioned differently based on screen size */}
        <div className="w-full md:w-1/5 mobile-order-sidebar">
          <Sidebar students={words} onClearAll={handleClearWords} />
        </div>

        {/* Main Content - Input field and title */}
        <div className="w-full md:w-4/5 flex flex-col justify-start items-center bg-gray-800 text-white font-press-start overflow-y-auto mobile-order-main">
          <div className="mt-4 mb-4 text-center">
            <h1 className="text-2xl">Pick Me Generator</h1>
            <h2 className="text-sm text-center">(Randomizer)</h2>
          </div>

          <div className="w-full max-w-md mb-6 px-4">
            <form
              onSubmit={handleAddWord}
              className="flex flex-col items-start w-full"
            >
              <label
                htmlFor="new-word"
                className="form-label mb-1 text-xs whitespace-nowrap self-start"
              >
                Add anything to the Pick Me Bank:
              </label>
              <div className="flex w-full">
                <input
                  id="new-word"
                  ref={inputRef}
                  type="text"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  className="border-2 border-gray-400 px-3 py-2 w-full font-kdam text-base text-black"
                  placeholder="Enter anything you want to add"
                  disabled={addingWord}
                  autoFocus
                />
                <button
                  type="submit"
                  className={`ml-2 bg-sidebar-blue text-white px-4 py-2 font-kdam hover:bg-blue-700 ${
                    addingWord ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={addingWord}
                >
                  {addingWord ? "Adding..." : "Add"}
                </button>
              </div>
            </form>
          </div>

          <div className="generic-message min-h-[2.5rem] flex items-center my-3">
            <div className="flex items-center">
              {isShuffling ? (
                <h2
                  className={`shuffle-text-${shuffleColorIndex} ${
                    !isFinalSelection ? "shuffle-animate" : "final-selection"
                  } text-xl`}
                >
                  {shuffleText}
                </h2>
              ) : (
                <h2 className={selectedWord ? "text-xl font-bold" : ""}>
                  {message}
                </h2>
              )}
              {!isShuffling && !selectedWord && <LoadingDots />}
            </div>
          </div>

          {/* Mobile/Tablet Randomize Button */}
          <div className="w-full flex justify-center items-center py-3 mb-4 mobile-order-button">
            <button
              onClick={handleSelectRandomWord}
              className={`mobile-pick-button randomize-btn w-80 h-12 flex items-center justify-center bg-white border-2 border-black text-lg font-press-start text-black hover:text-blue-50 hover:bg-purple-500 cursor-pointer ${
                isShuffling || words.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={isShuffling || words.length === 0}
            >
              {hasRandomized ? "Randomize Again" : "Randomize"}
            </button>
          </div>

          {/* Desktop Only Randomize Button - positioned higher */}
          <div className="desktop-button-container hidden md:flex justify-center items-center py-3 mt-4">
            <button
              onClick={handleSelectRandomWord}
              className={`desktop-pick-button randomize-btn w-80 h-12 flex items-center justify-center bg-white border-2 border-black text-lg font-press-start text-black hover:text-blue-50 hover:bg-purple-500 cursor-pointer ${
                isShuffling || words.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={isShuffling || words.length === 0}
            >
              {hasRandomized ? "Randomize Again" : "Randomize"}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Ad - displays on the right side on desktop, hidden on mobile */}
      <div className="hidden md:block absolute right-1 top-1/4">
        <AdUnit adSlot="sidebar" />
      </div>

      {/* Footer Ad */}
      <AdUnit
        adSlot="footer"
        className="w-full flex justify-center py-1 bg-gray-900"
      />
    </div>
  );
}
