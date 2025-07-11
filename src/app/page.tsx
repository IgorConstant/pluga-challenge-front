"use client";

import { useEffect, useRef, useState } from "react";
import { fetchApps } from "@/services/api-query";
import { AppType } from "@/types/App";
import { useRecentApps } from "@/contexts/AppsRecentes";
import { SearchBar } from "@/components/SearchBar";
import { AppGrid } from "@/components/AppGrid";
import { Pagination } from "@/components/Pagination";
import { AppModal } from "@/components/AppModal";

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
        <SearchBar value={search} onChange={handleSearch} />
        {apps.length === 0 ? (
          <div className="text-center">
            <span className="loading loading-spinner" />
          </div>
        ) : pagedFilteredApps.length === 0 ? (
          <div className="text-center">
            <p>Nenhum app encontrado para &quot;{search}&quot;.</p>
          </div>
        ) : (
          <>
            <AppGrid apps={pagedFilteredApps} onSelect={handleSelectedApp} />
            <div className="text-center">
              <Pagination page={page} maxPage={maxPage} setPage={setPage} />
            </div>
          </>
        )}
      </div>
      <AppModal
        selectedApp={selectedApp}
        recentApps={recentApps}
        onSelect={handleSelectedApp}
        modalRef={modalRef}
      />
    </>
  );
}
