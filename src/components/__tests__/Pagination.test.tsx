import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Pagination } from "../Pagination";

describe("Pagination", () => {
    it("renderiza os botões de página de acordo com maxPage", () => {
        const setPage = jest.fn();
        const { getByText } = render(<Pagination page={2} maxPage={3} setPage={setPage} />);
        expect(getByText("1")).toBeInTheDocument();
        expect(getByText("2")).toBeInTheDocument();
        expect(getByText("3")).toBeInTheDocument();
    });

    it("chama setPage com o valor correto ao clicar no botão de página", () => {
        const setPage = jest.fn();
        const { getByText } = render(<Pagination page={2} maxPage={3} setPage={setPage} />);
        fireEvent.click(getByText("1"));
        expect(setPage).toHaveBeenCalledWith(1);
        fireEvent.click(getByText("3"));
        expect(setPage).toHaveBeenCalledWith(3);
    });

    it("adiciona a classe btn-disabled no botão anterior na primeira página", () => {
        const setPage = jest.fn();
        const { getByText } = render(<Pagination page={1} maxPage={3} setPage={setPage} />);
        const prevBtn = getByText("⬅");
        expect(prevBtn).toHaveClass("btn-disabled");
        fireEvent.click(prevBtn);
        expect(setPage).toHaveBeenCalled();
    });

    it("adiciona a classe btn-disabled no botão próximo na última página", () => {
        const setPage = jest.fn();
        const { getByText } = render(<Pagination page={3} maxPage={3} setPage={setPage} />);
        const nextBtn = getByText("➡");
        expect(nextBtn).toHaveClass("btn-disabled");
        fireEvent.click(nextBtn);
        expect(setPage).toHaveBeenCalled();
    });

    it("chama setPage ao clicar nos botões anterior e próximo", () => {
        const setPage = jest.fn();
        const { getByText } = render(<Pagination page={2} maxPage={3} setPage={setPage} />);
        fireEvent.click(getByText("⬅"));
        expect(setPage).toHaveBeenCalledWith(1);
        fireEvent.click(getByText("➡"));
        expect(setPage).toHaveBeenCalledWith(3);
    });

    it("destaca o botão da página ativa", () => {
        const setPage = jest.fn();
        const { getByText } = render(<Pagination page={2} maxPage={3} setPage={setPage} />);
        const activeBtn = getByText("2");
        expect(activeBtn).toHaveClass("btn-active");
    });
});