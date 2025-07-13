/**
 * Testes do componente AppCard
 *
 * Este arquivo contém testes unitários para o componente AppCard, responsável por exibir informações de um aplicativo e lidar com interações do usuário.
 *
 * Casos testados:
 * 1. Renderização do nome e ícone: Verifica se o nome do aplicativo e o ícone são renderizados corretamente na tela.
 * 2. Ação de clique: Garante que a função onClick é chamada com o objeto do aplicativo ao clicar no card.
 *
 * Ferramentas utilizadas:
 * - @testing-library/react: Para renderização e simulação de interações.
 * - @testing-library/jest-dom: Para asserções customizadas no DOM.
 * - jest: Para mocks e execução dos testes.
 */
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { AppCard } from "../AppCard";
import React from "react";
const app = {
  app_id: 1,
  name: "Teste App",
  icon: "https://via.placeholder.com/40",
  color: "#fff",
  link: "https://example.com",
};

test("renderiza nome e ícone do app", () => {
  render(<AppCard app={app} onClick={() => {}} />);
  expect(screen.getByText("Teste App")).toBeInTheDocument();
  expect(screen.getByRole("img")).toHaveAttribute("src", app.icon);
});

test("chama onClick ao clicar", () => {
  const handleClick = jest.fn();
  render(<AppCard app={app} onClick={handleClick} />);
  const link = screen.getByText("Teste App").closest("a");
  fireEvent.click(link!);
  expect(handleClick).toHaveBeenCalledWith(app);
});