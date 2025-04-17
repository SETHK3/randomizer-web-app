"use client";

import { useState, useEffect, useRef } from "react";
import { LoadingDots, Sidebar } from "./components";
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
  const inputRef = useRef<HTMLInputElement>(null);

  // Shuffle animation settings
  const shuffleSpeed = 100; // ms between shuffles
  const shuffleDuration = 2000; // total shuffle duration in ms

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

  // Shuffle animation function
  const performShuffleAnimation = (finalWord: string) => {
    setIsShuffling(true);
    setMessage("");

    let shuffleCount = 0;
    const maxShuffles = shuffleDuration / shuffleSpeed;

    // Start the shuffle animation
    const shuffleInterval = setInterval(() => {
      shuffleCount++;

      // Generate a random index for the color
      setShuffleColorIndex(Math.floor(Math.random() * 5));

      // Select a random word from the list for display during shuffle
      if (words.length > 0) {
        const randomIndex = Math.floor(Math.random() * words.length);
        setShuffleText(words[randomIndex].name);
      }

      // End the shuffle animation after the duration
      if (shuffleCount >= maxShuffles) {
        clearInterval(shuffleInterval);
        setIsShuffling(false);
        setShuffleText("");
        setMessage(finalWord); // Just show the selected entry without additional text
      }
    }, shuffleSpeed);
  };

  const handleSelectRandomWord = async () => {
    // Don't run if already shuffling
    if (isShuffling) return;

    try {
      // Reset selection state first
      setWords(words.map((word) => ({ ...word, selected: false })));

      const data = await getRandomStudent();

      if (data.results && data.results.length > 0) {
        const randomWord = data.results[0];

        // Start shuffle animation before updating selection
        performShuffleAnimation(randomWord.name);

        // Once animation ends, the message will be set in the animation function
        setSelectedWord(randomWord.name);

        // Update words list with selected after animation finishes
        setTimeout(() => {
          setWords(
            words.map((word) => ({
              ...word,
              selected: word.id === randomWord.id,
            }))
          );
        }, shuffleDuration + 100);
      }
    } catch (error) {
      console.error("Error selecting random word:", error);
      setIsShuffling(false);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar students={words} onClearAll={handleClearWords} />

      <div className="w-4/5 h-full flex flex-col justify-start items-center bg-gray-800 text-white font-press-start">
        <div className="mt-10 mb-20 text-center">
          <h1 className="text-2xl">Pick Me Generator</h1>
          <h2 className="text-sm text-center">(Randomizer)</h2>
        </div>

        <div className="w-full max-w-md mb-20">
          <form
            onSubmit={handleAddWord}
            className="flex flex-col items-start w-full"
          >
            <label
              htmlFor="new-word"
              className="mb-2 text-xs whitespace-nowrap self-start"
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

        <div className="generic-message min-h-[3rem] flex items-center">
          <div className="flex items-center">
            {isShuffling ? (
              <h2
                className={`shuffle-text-${shuffleColorIndex} shuffle-animate`}
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

        <div className="mt-4">
          <button
            onClick={handleSelectRandomWord}
            className={`w-64 h-12 flex items-center justify-center bg-white border-2 border-black text-lg font-press-start text-black hover:text-blue-50 hover:bg-purple-500 cursor-pointer ${
              isShuffling || words.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={isShuffling || words.length === 0}
          >
            Randomize !!!
          </button>
        </div>
      </div>
    </div>
  );
}
