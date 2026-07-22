"use client";

import React, { useState, useEffect } from "react";
import { getContactMessages, toggleMessageReadStatus } from "@/lib/services/contact";
import { ContactMessage } from "@/lib/types/database";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const data = await getContactMessages();
    setMessages(data);
    setLoading(false);
  };

  const handleToggleRead = async (msg: ContactMessage, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    try {
      await toggleMessageReadStatus(msg.id, msg.is_read);
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: !m.is_read } : m))
      );
      if (selectedMessage && selectedMessage.id === msg.id) {
        setSelectedMessage((prev) => (prev ? { ...prev, is_read: !prev.is_read } : null));
      }
    } catch (err) {
      console.error("Failed to toggle read status", err);
      // Fallback state update
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: !m.is_read } : m))
      );
    }
  };

  const handleOpenMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    // Automatically mark as read when opened if it was unread
    if (!msg.is_read) {
      handleToggleRead(msg);
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-secondaryAccent block mb-1">
            Communication Inbox
          </span>
          <h1 className="font-display text-3xl font-bold text-ink">
            Contact Form Messages
          </h1>
          <p className="text-sm text-ink/75 mt-1 font-body">
            View, review, and manage public inquiries submitted via the SCWOP contact form.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="px-4 py-2.5 rounded-full text-xs font-medium border border-mutedBorder bg-white text-ink hover:bg-paper transition-colors flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <svg className="w-4 h-4 text-ink/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Inbox
        </button>
      </div>

      {/* MESSAGES TABLE */}
      {loading ? (
        <div className="text-center py-12 text-sm text-ink/60">
          Loading contact messages from database...
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-mutedBorder p-8 max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-paper flex items-center justify-center mx-auto mb-4 text-ink/40">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="font-display text-lg font-bold text-ink mb-1">
            No Messages Received Yet
          </h2>
          <p className="text-xs text-ink/70">
            Messages submitted through the /contact page form will appear here in chronological order.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-mutedBorder shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-paper/70 border-b border-mutedBorder/80 text-[11px] uppercase tracking-wider font-semibold text-ink/60">
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Sender Name</th>
                  <th className="py-4 px-6">Email Address</th>
                  <th className="py-4 px-6">Message Excerpt</th>
                  <th className="py-4 px-6">Date Received</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mutedBorder/50 text-sm font-body">
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    onClick={() => handleOpenMessage(msg)}
                    className={`cursor-pointer transition-colors ${
                      !msg.is_read
                        ? "bg-secondaryAccent/5 font-semibold text-ink hover:bg-secondaryAccent/10"
                        : "text-ink/80 hover:bg-paper/50"
                    }`}
                  >
                    <td className="py-4 px-6">
                      {!msg.is_read ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-secondaryAccent text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Unread
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-mutedBorder/50 text-ink/70">
                          Read
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 font-display font-medium text-ink">
                      {msg.name}
                    </td>

                    <td className="py-4 px-6 text-ink/75 font-mono text-xs">
                      {msg.email}
                    </td>

                    <td className="py-4 px-6 max-w-xs truncate text-xs text-ink/70">
                      {msg.message}
                    </td>

                    <td className="py-4 px-6 text-xs text-ink/60 whitespace-nowrap">
                      {msg.created_at
                        ? new Date(msg.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Recent"}
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => handleToggleRead(msg, e)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border border-mutedBorder bg-white hover:bg-paper text-ink transition-colors"
                      >
                        Mark as {msg.is_read ? "Unread" : "Read"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MESSAGE DETAIL MODAL */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-8 shadow-2xl border border-mutedBorder space-y-6">
            <div className="flex items-start justify-between border-b border-mutedBorder/60 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-secondaryAccent block mb-1">
                  Message Detail
                </span>
                <h2 className="font-display text-2xl font-bold text-ink">
                  {selectedMessage.name}
                </h2>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-xs text-primary hover:underline font-mono block mt-0.5"
                >
                  {selectedMessage.email}
                </a>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="p-2 rounded-full hover:bg-paper text-ink/60 hover:text-ink"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-ink/50 uppercase tracking-wider block">
                Message Body:
              </span>
              <div className="p-5 rounded-2xl bg-paper border border-mutedBorder text-sm text-ink leading-relaxed font-body whitespace-pre-line max-h-72 overflow-y-auto">
                {selectedMessage.message}
              </div>
            </div>

            <div className="pt-4 border-t border-mutedBorder/60 flex items-center justify-between">
              <span className="text-xs text-ink/50">
                Submitted on:{" "}
                {selectedMessage.created_at
                  ? new Date(selectedMessage.created_at).toLocaleString()
                  : "N/A"}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleRead(selectedMessage)}
                  className="px-4 py-2 rounded-full text-xs font-medium border border-mutedBorder text-ink hover:bg-paper"
                >
                  Mark as {selectedMessage.is_read ? "Unread" : "Read"}
                </button>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Inquiry to SCWOP NGO`}
                  className="px-5 py-2 rounded-full text-xs font-medium bg-primary text-white hover:bg-primary-hover shadow-sm"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
