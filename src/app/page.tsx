"use client";

import { useEffect, useRef, useState } from "react";
import { fetchApps } from "@/services/api-query";
import { AppType } from "@/types/App";
import { useRecentApps } from "@/contexts/AppsRecentes";

export default function HomePage() {
  const [apps, setApps] = useState<AppType[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedApp, setSelectedApp] = useState<AppType | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const { recentApps, addApp } = useRecentApps();

  // Carrega apps
  useEffect(() => {
    fetchApps().then(setApps);
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSelectedApp = (app: AppType) => {
    setSelectedApp(app);
    addApp(app);
    modalRef.current?.showModal();
  };

  const normalizedSearch = search.toLowerCase();
  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(normalizedSearch)
  );

  const maxPage = Math.ceil(filteredApps.length / 12) || 1;
  const pagedFilteredApps = filteredApps.slice((page - 1) * 12, page * 12);

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6">
        <h1 className="text-3xl text-center">Pluga Challenge Front</h1>

        <label className="input w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 opacity-50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="search"
            placeholder="Buscar ferramenta"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </label>

        {apps.length === 0 ? (
          <div className="text-center">
            <span className="loading loading-spinner" />
          </div>
        ) : pagedFilteredApps.length === 0 ? (
          <div className="text-center">
            <p>Nenhum app encontrado para "{search}".</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-6">
              {pagedFilteredApps.map((app) => (
                <a
                  key={app.app_id}
                  onClick={() => handleSelectedApp(app)}
                  className="card card-sm group bg-base-100 cursor-pointer transition shadow-sm hover:shadow-lg"
                >
                  <figure
                    style={{ backgroundColor: app.color }}
                    className="p-6"
                  >
                    <img
                      src={app.icon}
                      alt={app.name}
                      width="64"
                      height="64"
                      className="transition group-hover:scale-110"
                    />
                  </figure>
                  <div className="card-body min-h-17 text-center justify-center">
                    <h4>{app.name}</h4>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center">
              <div className="join">
                <button
                  onClick={() => setPage(Math.max(page - 1, 1))}
                  className={`join-item btn ${page === 1 ? "btn-disabled" : ""}`}
                >
                  ⬅
                </button>
                {Array.from({ length: maxPage }, (_, i) => i + 1).map((i) => (
                  <button
                    key={`p${i}`}
                    onClick={() => setPage(i)}
                    className={`join-item btn ${i === page ? "btn-active" : ""}`}
                  >
                    {i}
                  </button>
                ))}
                <button
                  onClick={() => setPage(Math.min(page + 1, maxPage))}
                  className={`join-item btn ${page === maxPage ? "btn-disabled" : ""
                    }`}
                >
                  ➡
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      <dialog className="modal" ref={modalRef}>
        {selectedApp && (
          <div className="modal-box flex flex-col gap-6">
            <div className="mx-auto">
              <div className="flex gap-6">
                <figure
                  style={{ backgroundColor: selectedApp.color }}
                  className="rounded-full p-10"
                >
                  <img
                    src={selectedApp.icon}
                    alt={selectedApp.name}
                    width="64"
                    height="64"
                  />
                </figure>
                <div className="py-6">
                  <h2 className="mb-4 text-lg">{selectedApp.name}</h2>
                  <a
                    href={selectedApp.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    Acessar
                  </a>
                </div>
              </div>
            </div>

            <h2 className="text-center">Últimas ferramentas visualizadas</h2>
            <div className="grid grid-cols-3 gap-6">
              {recentApps
                .toReversed()
                .map((app) => (
                  <a
                    key={app.app_id}
                    onClick={() => handleSelectedApp(app)}
                    className="card card-sm group bg-base-100 cursor-pointer transition shadow-sm hover:shadow-lg"
                  >
                    <figure
                      style={{ backgroundColor: app.color }}
                      className="p-6"
                    >
                      <img
                        src={app.icon}
                        alt={app.name}
                        width="64"
                        height="64"
                        className="transition group-hover:scale-110"
                      />
                    </figure>
                    <div className="card-body min-h-17 text-center justify-center">
                      <h4>{app.name}</h4>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        )}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
