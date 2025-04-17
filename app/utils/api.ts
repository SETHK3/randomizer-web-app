// Frontend-only implementation using localStorage

export interface Word {
  id: number;
  name: string;
  selected?: boolean;
}

interface ApiResponse<T> {
  results: T[];
}

// Initial words data - will only be used if localStorage isn't available
const initialWords: Word[] = [];

// Helper function to get words from localStorage or initialize if not present
function getWordsFromStorage(): Word[] {
  if (typeof window === "undefined") {
    return initialWords; // Return initial data during SSR
  }

  // Try to get existing words from localStorage
  const storedWords = localStorage.getItem("wordBank");
  if (storedWords) {
    try {
      return JSON.parse(storedWords);
    } catch (error) {
      console.error("Error parsing stored words:", error);
    }
  }

  // Initialize with empty array if no valid data found
  localStorage.setItem("wordBank", JSON.stringify(initialWords));
  return initialWords;
}

// Helper function to save words to localStorage
function saveWordsToStorage(words: Word[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("wordBank", JSON.stringify(words));
  }
}

// Helper function to capitalize each word in a string
function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Get all words
export async function getStudents(): Promise<ApiResponse<Word>> {
  try {
    const words = getWordsFromStorage();
    return { results: words };
  } catch (error) {
    console.error("Error fetching words:", error);
    return { results: initialWords };
  }
}

// Get a random word
export async function getRandomStudent(): Promise<ApiResponse<Word>> {
  try {
    const words = getWordsFromStorage();
    if (words.length === 0) {
      return { results: [] };
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    return { results: [randomWord] };
  } catch (error) {
    console.error("Error fetching random word:", error);
    return { results: [] };
  }
}

// Add a new word
export async function addWord(name: string): Promise<Word> {
  try {
    const words = getWordsFromStorage();

    // Capitalize the input before saving
    const capitalizedName = capitalizeWords(name);

    // Create a new word with a unique ID
    const newId =
      words.length > 0 ? Math.max(...words.map((w) => w.id)) + 1 : 1;

    const newWord = { id: newId, name: capitalizedName };

    // Add to list and save
    words.push(newWord);
    saveWordsToStorage(words);

    return newWord;
  } catch (error) {
    console.error("Error adding word:", error);
    throw error;
  }
}
