"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import LinkCard from "@/components/LinkCard";
import LinkForm from "@/components/LinkForm";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";

interface Link {
  id: number;
  title: string;
  url: string;
  category: string | null;
  createdAt: string;
}

export default function Home() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const toastTimeout = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error") => {
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    setToast({ message, type });
    toastTimeout.current = setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchLinks = useCallback(async () => {
    try {
      const res = await fetch("/api/links");
      if (res.ok) {
        const data = await res.json();
        setLinks(data);
      }
    } catch (error) {
      console.error("Failed to fetch links:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const categories = Array.from(
    new Set(links.map((link) => link.category).filter(Boolean))
  ) as string[];

  const filteredLinks = links.filter((link) => {
    const matchesSearch =
      !searchQuery ||
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || link.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddLink = async (data: { title: string; url: string; category: string }) => {
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const newLink = await res.json();
        setLinks([newLink, ...links]);
        setShowForm(false);
        showToast("Link added successfully!", "success");
      } else {
        const error = await res.json();
        showToast(error.error || "Failed to add link", "error");
      }
    } catch {
      showToast("Failed to add link", "error");
    }
  };

  const handleUpdateLink = async (data: { title: string; url: string; category: string }) => {
    if (!editingLink) return;
    try {
      const res = await fetch(`/api/links/${editingLink.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const updatedLink = await res.json();
        setLinks(links.map((l) => (l.id === editingLink.id ? updatedLink : l)));
        setEditingLink(null);
        showToast("Link updated successfully!", "success");
      } else {
        const error = await res.json();
        showToast(error.error || "Failed to update link", "error");
      }
    } catch {
      showToast("Failed to update link", "error");
    }
  };

  const handleDeleteLink = async (id: number) => {
    if (!confirm("Are you sure you want to delete this link?")) return;
    try {
      const res = await fetch(`/api/links/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLinks(links.filter((l) => l.id !== id));
        showToast("Link deleted successfully!", "success");
      } else {
        showToast("Failed to delete link", "error");
      }
    } catch {
      showToast("Failed to delete link", "error");
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary shrink-0 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Add Link</span>
            </button>
          </div>
          
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredLinks.length === 0 ? (
            <EmptyState onAddClick={() => setShowForm(true)} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredLinks.map((link) => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    onEdit={() => setEditingLink(link)}
                    onDelete={() => handleDeleteLink(link.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <AnimatePresence>
          {(showForm || editingLink) && (
            <LinkForm
              link={editingLink}
              onSubmit={editingLink ? handleUpdateLink : handleAddLink}
              onClose={() => {
                setShowForm(false);
                setEditingLink(null);
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl ${
                toast.type === "success"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
              }`}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}