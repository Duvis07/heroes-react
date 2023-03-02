import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { Navbar } from "../../ui";

// Mock de la función useNavigate de react-router-dom
const mockedUseNavigate = jest.fn();

//aca se llama a la función useNavigate de react-router-dom y se le asigna el mock
// cuando alguien llame a la función useNavigate va devolver el mockuseNavigate
//se realiza mock de la libreria react-router-dom
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

  // Limpiar los mocks de las funciones de jest antes de cada prueba
  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrar el nombre correctamente", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    // el nombre del usuario debe aparecer en el documento HTML
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
    //se tuvo que haber llamado la función logout alguna vez
    expect(contextValue.logout).toHaveBeenCalled();

    //se verifica que la función useNavigate haya sido llamada con los argumentos 
    //"/login" y { replace: true }
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
