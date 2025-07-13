/**
 * Testes do componente SearchBar
 *
 * Este arquivo contém testes unitários para o componente SearchBar, responsável por exibir um campo de busca e lidar com a entrada do usuário.
 *
 * Casos testados:
 * 1. Renderização do input: Verifica se o input é exibido com o valor e placeholder corretos.
 * 2. Mudança de valor: Garante que a função onChange é chamada ao digitar no campo de busca.
 *
 * Ferramentas utilizadas:
 * - @testing-library/react: Para renderização e simulação de interações.
 * - jest: Para mocks e execução dos testes.
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "../SearchBar";

describe("SearchBar", () => {
  it("renderiza o input com o valor correto e placeholder", () => {
    render(
      <SearchBar value="teste" onChange={() => {}} />
    );
    const input = screen.getByPlaceholderText("Buscar ferramenta");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("teste");
  });

  it("chama onChange ao digitar", () => {
    const handleChange = jest.fn();
    render(
      <SearchBar value="" onChange={handleChange} />
    );
    const input = screen.getByPlaceholderText("Buscar ferramenta");
    fireEvent.change(input, { target: { value: "novo valor" } });
    expect(handleChange).toHaveBeenCalledWith("novo valor");
  });
});
