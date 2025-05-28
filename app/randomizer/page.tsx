"use client";

import { useState, useEffect, useRef } from "react";
import {
  LoadingDots,
  Sidebar,
  AdUnit,
  MinimalContent,
  SaveModal,
} from "../components";
import {
  Word,
  getStudents,
  getRandomStudent,
  addWord,
  deleteWord,
} from "../utils/api";
import Link from "next/link";

interface SavedList {
  [key: string]: Word[];
}

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  listName: string;
}

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  listName,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-white">Delete List</h2>
        <p className="text-white mb-6">
          Are you sure you want to delete "{listName}"? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Randomizer() {
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
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [savedLists, setSavedLists] = useState<SavedList>({});
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [listToDelete, setListToDelete] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Shuffle animation settings
  const shuffleSpeed = 100; // ms between shuffles
  const shuffleDuration = 2000; // total shuffle duration in ms
  const displayDuration = 5000; // how long to display the final selection

  // Fetch words list and saved lists on component mount
  useEffect(() => {
    fetchWords();
    loadSavedLists();
  }, []);

  const loadSavedLists = () => {
    const savedListsData = localStorage.getItem("savedLists");
    if (savedListsData) {
      setSavedLists(JSON.parse(savedListsData));
    }
  };

  const handleLoadSavedList = (listName: string) => {
    const list = savedLists[listName];
    if (list) {
      const wordsWithSelection = list.map((word) => ({
        ...word,
        selected: false,
      }));
      setWords(wordsWithSelection);
      localStorage.setItem("wordBank", JSON.stringify(wordsWithSelection));
      setMessage("On Your Mark, Get Set");
      setSelectedWord(null);
      setHasRandomized(false);
    }
  };

  const handleDeleteSavedList = (listName: string) => {
    setListToDelete(listName);
    setDeleteModalOpen(true);
  };

  const confirmDeleteList = () => {
    const newSavedLists = { ...savedLists };
    delete newSavedLists[listToDelete];
    setSavedLists(newSavedLists);
    localStorage.setItem("savedLists", JSON.stringify(newSavedLists));
    setDeleteModalOpen(false);
    setListToDelete("");
  };

  const fetchWords = async () => {
    try {
      const data = await getStudents();
      const wordsWithSelection = data.results.map((word: Word) => ({
        ...word,
        selected: false,
      }));
      setWords(wordsWithSelection);
      localStorage.setItem("wordBank", JSON.stringify(wordsWithSelection));
    } catch (error) {
      console.error("Error fetching words:", error);
      const storedWords = localStorage.getItem("wordBank");
      if (storedWords) {
        try {
          const parsedWords = JSON.parse(storedWords);
          setWords(
            parsedWords.map((word: Word) => ({ ...word, selected: false }))
          );
        } catch (e) {
          console.error("Error parsing stored words:", e);
          setWords([]);
          localStorage.removeItem("wordBank");
        }
      } else {
        setWords([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearWords = () => {
    setWords([]);
    localStorage.removeItem("wordBank");
    localStorage.removeItem("savedWords");
    setMessage("On Your Mark, Get Set");
    setSelectedWord(null);
    setHasRandomized(false);
    setTimeout(() => fetchWords(), 0);
  };

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim()) return;

    try {
      setAddingWord(true);
      const addedWord = await addWord(newWord.trim());
      setNewWord("");

      setWords((prevWords) => {
        const updatedWords = [...prevWords, { ...addedWord, selected: false }];
        localStorage.setItem("wordBank", JSON.stringify(updatedWords));
        return updatedWords;
      });

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    } catch (error) {
      console.error("Error adding word:", error);
      await fetchWords();
    } finally {
      setAddingWord(false);
    }
  };

  const handleSelectRandomWord = async () => {
    if (isShuffling) return;

    try {
      setWords(words.map((word) => ({ ...word, selected: false })));
      setIsShuffling(true);
      setIsFinalSelection(false);
      setMessage("");

      const data = await getRandomStudent();

      if (data.results && data.results.length > 0) {
        const randomWord = data.results[0];

        const shuffleInterval = setInterval(() => {
          setShuffleColorIndex(Math.floor(Math.random() * 5));
          if (words.length > 0) {
            const randomIndex = Math.floor(Math.random() * words.length);
            setShuffleText(words[randomIndex].name);
          }
        }, shuffleSpeed);

        setTimeout(() => {
          clearInterval(shuffleInterval);
          setShuffleText(randomWord.name);
          setIsFinalSelection(true);

          setTimeout(() => {
            setIsShuffling(false);
            setIsFinalSelection(false);
            setShuffleText("");
            setHasRandomized(true);
            setSelectedWord(randomWord.name);
            setMessage(randomWord.name);
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

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteWord(id);
      setWords((prevWords) => {
        const updatedWords = prevWords.filter((word) => word.id !== id);
        localStorage.setItem("wordBank", JSON.stringify(updatedWords));
        return updatedWords;
      });
    } catch (error) {
      console.error("Error deleting word:", error);
      await fetchWords();
    }
  };

  const handleSaveList = (name: string) => {
    const currentWords = words.map((word) => ({ ...word, selected: false }));
    const newSavedLists = { ...savedLists, [name]: currentWords };
    setSavedLists(newSavedLists);
    localStorage.setItem("savedLists", JSON.stringify(newSavedLists));
    localStorage.setItem("wordBank", JSON.stringify(currentWords));
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden p-0 m-0 bg-gray-800">
      <AdUnit
        adSlot="header"
        className="w-full flex justify-center py-1 bg-gray-900"
      />

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <div className="w-full md:w-1/5 mobile-order-sidebar">
          <Sidebar
            students={words}
            onClearAll={handleClearWords}
            onDeleteItem={handleDeleteItem}
          />
        </div>

        <div className="w-full md:w-4/5 flex flex-col justify-start items-center bg-gray-800 text-white font-press-start overflow-y-auto mobile-order-main">
          <div className="mt-4 mb-4 text-center">
            <h1 className="text-2xl">Randomizer Tool</h1>
            <p className="text-sm text-gray-400 mt-2">
              Add items and let the randomizer pick one for you!
            </p>
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

          <div className="w-full flex justify-center items-center gap-4 py-3 mb-4 mobile-order-button">
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
            <button
              onClick={() => setIsSaveModalOpen(true)}
              className="mobile-pick-button w-48 h-12 flex items-center justify-center bg-purple-500 border-2 border-black text-lg font-press-start text-white hover:bg-purple-600 cursor-pointer"
              disabled={words.length === 0}
            >
              Save List
            </button>
          </div>

          <div className="desktop-button-container hidden md:flex justify-center items-center gap-4 py-3 mt-4">
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
            <button
              onClick={() => setIsSaveModalOpen(true)}
              className="desktop-pick-button w-48 h-12 flex items-center justify-center bg-purple-500 border-2 border-black text-lg font-press-start text-white hover:bg-purple-600 cursor-pointer"
              disabled={words.length === 0}
            >
              Save List
            </button>
          </div>

          {words.length === 0 && Object.keys(savedLists).length === 0 && (
            <MinimalContent />
          )}

          {/* Saved Lists Container */}
          {Object.keys(savedLists).length > 0 && (
            <div className="w-full max-w-4xl mt-8 px-4">
              <h2 className="text-xl font-bold mb-4 text-white">Saved Lists</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(savedLists).map((listName) => (
                  <div
                    key={listName}
                    className="bg-gray-700 rounded-lg p-4 flex flex-col"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-white">
                        {listName}
                      </h3>
                      <button
                        onClick={() => handleDeleteSavedList(listName)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">
                      {savedLists[listName].length} items
                    </p>
                    <button
                      onClick={() => handleLoadSavedList(listName)}
                      className="mt-auto bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
                    >
                      Load List
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <SaveModal
            isOpen={isSaveModalOpen}
            onClose={() => setIsSaveModalOpen(false)}
            onSave={handleSaveList}
          />

          <DeleteConfirmationModal
            isOpen={deleteModalOpen}
            onClose={() => {
              setDeleteModalOpen(false);
              setListToDelete("");
            }}
            onConfirm={confirmDeleteList}
            listName={listToDelete}
          />
        </div>
      </div>
    </div>
  );
}
