"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdFolderOpen, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const DOT_COLOR: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
  amber: "bg-amber-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  teal: "bg-teal-500",
  gray: "bg-gray-400",
};

interface Group {
  id: number;
  name: string;
  color: string;
  memberIds: number[];
}

interface DropdownProps {
  groups: Group[];
  membershipSet: Set<number>;
  onToggle: (groupId: number, add: boolean) => void;
  onClose: () => void;
  anchorRect: DOMRect;
}

function Dropdown({ groups, membershipSet, onToggle, onClose, anchorRect }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 });

  useEffect(() => {
    const W = 216;
    const vpW = window.innerWidth;
    const vpH = window.innerHeight;
    const GAP = 6;

    let left = anchorRect.right - W;
    if (left < 8) left = 8;
    if (left + W > vpW - 8) left = vpW - W - 8;

    const spaceBelow = vpH - anchorRect.bottom - GAP;
    const dropdownH = ref.current?.offsetHeight ?? 300;
    const top =
      spaceBelow >= dropdownH
        ? anchorRect.bottom + GAP
        : anchorRect.top - dropdownH - GAP;

    setStyle({ position: "fixed", top, left, width: W, zIndex: 9999, opacity: 1 });
  }, [anchorRect]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onScroll = (e: Event) => {
      if (ref.current && ref.current.contains(e.target as Node)) return;
      onClose();
    };
    document.addEventListener("mousedown", onDown, true);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("mousedown", onDown, true);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={ref}
      style={style}
      className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-xl overflow-hidden"
    >
        <div className="px-3.5 pt-3 pb-1.5">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            Organise
          </p>
        </div>

        {groups.length === 0 ? (
          <div className="px-4 pt-2 pb-5 text-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-2.5">
              <MdFolderOpen className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">No groups yet</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Create one below</p>
          </div>
        ) : (
          <div className="px-1.5 pb-1 space-y-px overflow-y-auto" style={{ maxHeight: "min(240px, 40vh)" }}>
            {groups.map((g) => {
              const isMember = membershipSet.has(g.id);
              return (
                <button
                  key={g.id}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => onToggle(g.id, !isMember)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium transition-all duration-100 ${
                    isMember
                      ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/60"
                  }`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${DOT_COLOR[g.color] || "bg-gray-400"}`} />
                  <span className="flex-1 text-left truncate">{g.name}</span>
                  {isMember ? (
                    <MdCheckBox className="h-[18px] w-[18px] text-indigo-500 flex-shrink-0" />
                  ) : (
                    <MdCheckBoxOutlineBlank className="h-[18px] w-[18px] text-gray-300 dark:text-gray-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

    </div>,
    document.body
  );
}

interface GroupPickerProps {
  groups: Group[];
  membershipSet: Set<number>;
  onToggle: (groupId: number, add: boolean) => void;
  size?: "sm" | "md";
}

export default function GroupPicker({ groups, membershipSet, onToggle, size = "md" }: GroupPickerProps) {
  const [open, setOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (open) { setOpen(false); return; }
    if (btnRef.current) setAnchorRect(btnRef.current.getBoundingClientRect());
    setOpen(true);
  };

  const inGroup = membershipSet.size > 0;
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const padding = size === "sm" ? "p-1" : "p-1.5";

  return (
    <>
      <button
        ref={btnRef}
        title="Organise into groups"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={toggle}
        className={`rounded-lg transition-colors flex-shrink-0 ${padding} ${
          open
            ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
            : inGroup
            ? "text-indigo-400 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
            : "text-gray-300 dark:text-gray-600 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        <MdFolderOpen className={iconSize} />
      </button>

      {open && anchorRect && (
        <Dropdown
          groups={groups}
          membershipSet={membershipSet}
          onToggle={onToggle}
          onClose={() => setOpen(false)}
          anchorRect={anchorRect}
        />
      )}
    </>
  );
}
