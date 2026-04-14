"use client";

import { motion } from "framer-motion";

interface EmptyStateProps {
  onAddClick: () => void;
}

export default function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.758a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.101-1.101"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">No links yet</h3>
      <p className="text-text-muted mb-6 max-w-xs">
        Start saving your favorite links to access them quickly from anywhere.
      </p>
      <button onClick={onAddClick} className="btn-primary">
        Add your first link
      </button>
    </motion.div>
  );
}