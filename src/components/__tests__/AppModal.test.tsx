/**
 * Testes do componente AppModal
 *
 * Este arquivo contém testes unitários para o componente AppModal, responsável por exibir detalhes de um aplicativo selecionado e uma lista de aplicativos recentes em um modal.
 *
 * Casos testados:
 * 1. Não renderização: Verifica se nada é exibido quando selectedApp é nulo.
 * 2. Detalhes do app: Garante que os detalhes do aplicativo selecionado são exibidos corretamente.
 * 3. Grid de recentes: Testa se os aplicativos recentes são renderizados na grade.
 * 4. Seleção de app recente: Garante que a função onSelect é chamada ao clicar em um app recente.
 * 5. Botão de fechar: Verifica se o botão de fechar está presente no modal.
 *
 * Ferramentas utilizadas:
 * - @testing-library/react: Para renderização e simulação de interações.
 * - @testing-library/jest-dom: Para asserções customizadas no DOM.
 * - jest: Para mocks e execução dos testes.
 */
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { AppModal } from "../AppModal";
import React from "react";
import { AppType } from "@/types/App";
const mockApp: AppType = {
    app_id: 1,
    name: "Test App",
    icon: "https://via.placeholder.com/64",
    color: "#FF5733",
    link: "https://example.com",
};
const recentApps: AppType[] = [
    { app_id: 2, name: "Recent App 1", icon: "https://via.placeholder.com/64", color: "#33FF57", link: "https://recent1.com" },
    { app_id: 3, name: "Recent App 2", icon: "https://via.placeholder.com/64", color: "#3357FF", link: "https://recent2.com" },
    { app_id: 4, name: "Recent App 3", icon: "https://via.placeholder.com/64", color: "#FF33FF", link: "https://recent3.com" },
];

describe("Modal de Aplicativo", () => {
    it("não renderiza nada quando selectedApp é nulo", () => {
        const modalRef = React.createRef<HTMLDialogElement>();
        render(
            <AppModal
                selectedApp={null}
                recentApps={recentApps}
                onSelect={jest.fn()}
                modalRef={modalRef as React.RefObject<HTMLDialogElement>}
            />
        );
        expect(screen.queryByText("Acessar")).not.toBeInTheDocument();
        expect(screen.getByTestId("app-modal")).toBeInTheDocument();
    });

    it("renderiza detalhes do aplicativo selecionado", () => {
        const modalRef = React.createRef<HTMLDialogElement>();
        render(
            <AppModal
                selectedApp={mockApp}
                recentApps={recentApps}
                onSelect={jest.fn()}
                modalRef={modalRef as React.RefObject<HTMLDialogElement>}
            />
        );
        expect(screen.getByText(mockApp.name)).toBeInTheDocument();
        expect(screen.getByAltText(mockApp.name)).toBeInTheDocument();
        const link = screen.getByText("Acessar");
        expect(link).toHaveAttribute("href", mockApp.link);
        expect(link.tagName).toBe("A");
    });

    it("renderiza grid de aplicativos recentes", () => {
        const modalRef = React.createRef<HTMLDialogElement>();
        render(
            <AppModal
                selectedApp={mockApp}
                recentApps={recentApps}
                onSelect={jest.fn()}
                modalRef={modalRef as React.RefObject<HTMLDialogElement>}
            />
        );
        expect(screen.getByText("Últimas ferramentas visualizadas")).toBeInTheDocument();
        recentApps.forEach(app => {
            expect(screen.getByText(app.name)).toBeInTheDocument();
        });
    });

    it("chama onSelect ao clicar em um aplicativo recente", () => {
        const modalRef = React.createRef<HTMLDialogElement>();
        const onSelect = jest.fn();
        render(
            <AppModal
                selectedApp={mockApp}
                recentApps={recentApps}
                onSelect={onSelect}
                modalRef={modalRef as React.RefObject<HTMLDialogElement>}
            />
        );
        fireEvent.click(screen.getByText(recentApps[0].name));
        expect(onSelect).toHaveBeenCalledWith(recentApps[0]);
    });

    it("renderiza botão de fechar", () => {
        const modalRef = React.createRef<HTMLDialogElement>();
        render(
            <AppModal
                selectedApp={mockApp}
                recentApps={recentApps}
                onSelect={jest.fn()}
                modalRef={modalRef as React.RefObject<HTMLDialogElement>}
            />
        );
        expect(screen.getByLabelText("close")).toBeInTheDocument();
    });
});
