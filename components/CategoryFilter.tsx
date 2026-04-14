"use client";

import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  if (categories.length === 0) return null;

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15 }}
      className="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
    >
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
          selectedCategory === null
            ? "bg-accent text-white"
            : "bg-surface text-text-secondary hover:bg-surface-hover"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            selectedCategory === category
              ? "bg-accent text-white"
              : "bg-surface text-text-secondary hover:bg-surface-hover"
          }`}
        >
          {category}
        </button>
      ))}
    </motion.div>
  );
}