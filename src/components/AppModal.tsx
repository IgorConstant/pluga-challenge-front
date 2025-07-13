import React from "react";
import { AppType } from "@/types/App";
import Image from "next/image";
import { AppGrid } from "./AppGrid";

interface AppModalProps {
  selectedApp: AppType | null;
  recentApps: AppType[];
  onSelect: (app: AppType) => void;
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

export const AppModal: React.FC<AppModalProps> = ({ selectedApp, recentApps, onSelect, modalRef }) => (
  <dialog className="modal" ref={modalRef} role="dialog" data-testid="app-modal">
    {selectedApp && (
      <div className="modal-box flex flex-col gap-6">
        <div className="mx-auto">
          <div className="flex gap-6">
            <figure style={{ backgroundColor: selectedApp.color }} className="rounded-full p-10">
              <Image src={selectedApp.icon} alt={selectedApp.name} width="64" height="64" />
            </figure>
            <div className="py-6">
              <h2 className="mb-4 text-lg">{selectedApp.name}</h2>
              <a href={selectedApp.link} target="_blank" rel="noreferrer" className="btn btn-primary">
                Acessar
              </a>
            </div>
          </div>
        </div>
        <h2 className="text-center">Últimas ferramentas visualizadas</h2>
        <AppGrid apps={recentApps.toReversed()} onSelect={onSelect} columns={3} />
      </div>
    )}
    <form method="dialog" className="modal-backdrop">
      <button aria-label="close">close</button>
    </form>
  </dialog>
);
