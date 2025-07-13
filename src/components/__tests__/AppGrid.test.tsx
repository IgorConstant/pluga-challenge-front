/**
 * Testes do componente AppGrid
 *
 * Este arquivo contém testes unitários para o componente AppGrid, responsável por exibir uma grade de aplicativos e lidar com interações do usuário.
 *
 * Casos testados:
 * 1. Renderização dos cards: Verifica se a quantidade correta de cards é exibida.
 * 2. Seleção de card: Garante que a função onSelect é chamada ao clicar em um card.
 * 3. Colunas da grade: Testa se a classe de colunas é aplicada corretamente conforme a prop columns.
 * 4. Valor padrão de colunas: Verifica se o padrão é 4 colunas quando a prop columns não é fornecida ou é inválida.
 * 5. Renderização vazia: Garante que nada é renderizado se o array de apps estiver vazio.
 *
 * Ferramentas utilizadas:
 * - @testing-library/react: Para renderização e simulação de interações.
 * - jest: Para mocks, simulação de componentes e execução dos testes.
 */
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