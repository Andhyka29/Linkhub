"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Link } from "@/types";

interface LinkFormProps {
  link?: Link | null;
  onSubmit: (data: { title: string; url: string; category: string }) => void;
  onClose: () => void;
}

export default function LinkForm({ link, onSubmit, onClose }: LinkFormProps) {
  const [title, setTitle] = useState(link?.title ?? "");
  const [url, setUrl] = useState(link?.url ?? "");
  const [category, setCategory] = useState(link?.category ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit({
      title: title.trim() || "",
      url: url.trim(),
      category: category.trim(),
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-background-secondary rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold mb-6">
            {link ? "Edit Link" : "Add New Link"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title (optional)"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                URL *
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category (optional)"
                className="input-field"
                list="categories"
              />
              <datalist id="categories">
                <option value="Work" />
                <option value="Personal" />
                <option value="Tools" />
                <option value="Entertainment" />
              </datalist>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="flex-1 btn-primary">
                {link ? "Update" : "Add Link"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}