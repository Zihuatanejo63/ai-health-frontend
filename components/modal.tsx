"use client";

import { type ReactNode } from "react";

export function Modal({
  title,
  children,
  onClose
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section aria-modal="true" className="modal-panel" role="dialog">
        <div className="modal-title-row">
          <h2>{title}</h2>
          <button aria-label="Close" onClick={onClose} type="button">
            ×
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export function ConfirmDialog({
  title,
  body,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel
}: {
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="modal-muted">{body}</p>
      <div className="modal-actions">
        <button className="btn-secondary" onClick={onCancel} type="button">
          {cancelLabel}
        </button>
        <button className="btn-danger" onClick={onConfirm} type="button">
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

export function Toast({ message }: { message: string }) {
  return <div className="toast">{message}</div>;
}
