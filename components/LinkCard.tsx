"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Link } from "@/types";

interface LinkCardProps {
  link: Link;
  onEdit: () => void;
  onDelete: () => void;
}

function getFaviconUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return "";
  }
}

export default function LinkCard({ link, onEdit, onDelete }: LinkCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(139, 92, 246, 0.15)" }}
      className="card group relative flex flex-col gap-3 hover:shadow-hover"
    >
      <div className="flex items-start gap-3">
        {!imageError ? (
          <img
            src={getFaviconUrl(link.url)}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg object-contain bg-background-secondary shrink-0"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-background-secondary flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.758a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.101-1.101"
              />
            </svg>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white line-clamp-2">{link.title}</h3>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted hover:text-accent transition-colors line-clamp-1 block"
          >
            {link.url.replace(/^https?:\/\//, "")}
          </a>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        {link.category && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent">
            {link.category}
          </span>
        )}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
          <button
            onClick={onEdit}
            className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
            aria-label="Edit"
          >
            <svg
              className="w-4 h-4 text-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg hover:bg-rose-500/20 transition-colors"
            aria-label="Delete"
          >
            <svg
              className="w-4 h-4 text-text-secondary hover:text-rose-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}