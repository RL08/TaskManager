"use client";

import { useEffect, useRef } from "react";
import { Textarea } from "@/src/components/ui/textarea";

interface TaskCardTextareaProps {
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
  onSave: () => void;
}

export function TaskCardTextarea({
  value,
  editing,
  onChange,
  onSave,
}: TaskCardTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && editing) {
      e.preventDefault();
      onSave();
    }
  };

  // Focus textarea when editing starts
  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
        textareaRef.current.value.length;
    }
  }, [editing]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editing &&
        textareaRef.current &&
        !textareaRef.current.contains(event.target as Node)
      ) {
        onSave();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editing, onSave]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      readOnly={!editing}
      className="w-full text-sm font-medium break-all p-2 resize-none border-none outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      style={{ lineHeight: "1.25rem", minHeight: "1.5rem" }}
      onKeyDown={handleSave}
    />
  );
}
