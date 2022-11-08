import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { Navbar } from "../../ui";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("pruebas en el navbar", () => {
  const contextValue = {
    logged: true,
    user: {
      name: "Strider",
    },

    logout: jest.fn(),
  };
  beforeEach(() => jest.clearAllMocks());
  test("debe de mostrar el nombre correctamente", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Strider")).toBeTruthy();
  });

  test("debe de llamar el logout y navigate cuando hag click en el boton ", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
