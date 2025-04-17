export type Quote = {
  text: string;
  author?: string;
  source?: string;
  category: 'islamic' | 'productivity' | 'success' | 'motivation';
};

export const quotes: Quote[] = [
  {
    text: "Indeed, with hardship comes ease.",
    author: "Quran",
    source: "94:6",
    category: "islamic"
  },
  {
    text: "Verily, Allah does not change the condition of a people until they change what is in themselves.",
    author: "Quran",
    source: "13:11",
    category: "islamic"
  },
  {
    text: "The best of people are those who are most beneficial to people.",
    author: "Prophet Muhammad (PBUH)",
    source: "Hadith",
    category: "islamic"
  },
  {
    text: "Take advantage of five before five: your youth before your old age, your health before your sickness, your wealth before your poverty, your free time before your busyness, and your life before your death.",
    author: "Prophet Muhammad (PBUH)",
    source: "Hadith",
    category: "islamic"
  },
  {
    text: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
    author: "Prophet Muhammad (PBUH)",
    source: "Hadith",
    category: "islamic"
  },
  {
    text: "The most beloved of deeds to Allah are those that are most consistent, even if they are small.",
    author: "Prophet Muhammad (PBUH)",
    source: "Hadith",
    category: "islamic"
  },
  {
    text: "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort.",
    author: "Paul J. Meyer",
    category: "productivity"
  },
  {
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss",
    category: "productivity"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "productivity"
  },
  {
    text: "It's not always that we need to do more but rather that we need to focus on less.",
    author: "Nathan W. Morris",
    category: "productivity"
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "success"
  },
  {
    text: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
    category: "success"
  },
  {
    text: "The road to success and the road to failure are almost exactly the same.",
    author: "Colin R. Davis",
    category: "success"
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
    category: "success"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
    category: "motivation"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "motivation"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    category: "motivation"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "motivation"
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
    category: "motivation"
  }
];

export const getRandomQuote = (category?: 'islamic' | 'productivity' | 'success' | 'motivation'): Quote => {
  const filteredQuotes = category 
    ? quotes.filter(quote => quote.category === category) 
    : quotes;
  
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  return filteredQuotes[randomIndex];
};
