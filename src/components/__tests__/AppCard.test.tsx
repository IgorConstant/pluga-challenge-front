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