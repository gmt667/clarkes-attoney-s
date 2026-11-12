"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";

export function DetailDialog({ title, trigger, children, className = "profile-trigger", lightbox = false }: {
  title: string;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  lightbox?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  return <>
    <button type="button" className={className} aria-label={lightbox ? `Enlarge ${title}` : `View profile: ${title}`}
      aria-haspopup="dialog" onClick={() => { dialog.current?.showModal(); setOpen(true); }}>
      {trigger}
    </button>
    <dialog ref={dialog} className={`detail-dialog${lightbox ? " image-lightbox" : ""}`}
      aria-labelledby={titleId} onClose={() => setOpen(false)}
      onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="detail-dialog-content">
        <div className="detail-dialog-header">
          <h2 id={titleId}>{title}</h2>
          <button type="button" className="dialog-close" aria-label="Close dialog" autoFocus onClick={() => dialog.current?.close()}><X /></button>
        </div>
        {children}
      </div>
    </dialog>
  </>;
}
