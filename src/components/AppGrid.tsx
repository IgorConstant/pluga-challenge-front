import React from "react";
import { AppType } from "@/types/App";
import { AppCard } from "./AppCard";

interface AppGridProps {
  apps: AppType[];
  onSelect: (app: AppType) => void;
  columns?: number;
}

export const AppGrid: React.FC<AppGridProps> = ({ apps, onSelect, columns = 4 }) => {
  const colClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  }[columns] || "grid-cols-4";
  return (
    <div className={`grid ${colClass} gap-6`}>
      {apps.map((app) => (
        <AppCard key={app.app_id} app={app} onClick={onSelect} />
      ))}
    </div>
  );
};
