import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppGrid } from "../AppGrid";
import { AppType } from "@/types/App";

// Mock AppCard to simplify tests
jest.mock("../AppCard", () => ({
    AppCard: ({ app, onClick }: { app: AppType; onClick: (app: AppType) => void }) => (
        <div data-testid="app-card" onClick={() => onClick(app)}>
            {app.name}
        </div>
    ),
}));

const mockApps: AppType[] = [
    { app_id: 1, name: "App One", icon: "icon1.png", color: "#FF0000", link: "https://appone.com" },
    { app_id: 2, name: "App Two", icon: "icon2.png", color: "#00FF00", link: "https://apptwo.com" },
    { app_id: 3, name: "App Three", icon: "icon3.png", color: "#0000FF", link: "https://appthree.com" },
];

describe("AppGrid", () => {
    it("renderiza a quantidade correta de cards", () => {
        render(<AppGrid apps={mockApps} onSelect={jest.fn()} />);
        expect(screen.getAllByTestId("app-card")).toHaveLength(mockApps.length);
    });

    it("chama onSelect quando um card é clicado", () => {
        const onSelect = jest.fn();
        render(<AppGrid apps={mockApps} onSelect={onSelect} />);
        fireEvent.click(screen.getAllByTestId("app-card")[1]);
        expect(onSelect).toHaveBeenCalledWith(mockApps[1]);
    });

    it("aplica a classe de coluna de grade correta com base na prop columns", () => {
        const { container } = render(<AppGrid apps={mockApps} onSelect={jest.fn()} columns={2} />);
        expect(container.firstChild).toHaveClass("grid-cols-2");
    });

    it("default para 4 colunas quando a prop columns não é fornecida", () => {
        const { container } = render(<AppGrid apps={mockApps} onSelect={jest.fn()} />);
        expect(container.firstChild).toHaveClass("grid-cols-4");
    });

    it("renderiza nada se o array de apps estiver vazio", () => {
        render(<AppGrid apps={[]} onSelect={jest.fn()} />);
        expect(screen.queryByTestId("app-card")).toBeNull();
    });

    it("fallback para 4 colunas para prop columns não suportada", () => {
        const { container } = render(<AppGrid apps={mockApps} onSelect={jest.fn()} columns={10} />);
        expect(container.firstChild).toHaveClass("grid-cols-4");
    });
});