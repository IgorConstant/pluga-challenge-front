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
