import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { AppRouter } from "../../router/AppRouter";

describe("Pruebas en el AppRouter", () => {
  test("debe de mostrar el login si no está autenticado", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByText("Login")).toBeTruthy();
    screen.debug();
  });

  test("debe de mostrar el componente marvel si está autenticado", () => {
    const contextValue = {
      logged: true,
      user: {
        id: "ABC123",
        name: "Strider",
      },
    };

    render(
      <MemoryRouter initialEntries={["/logn"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByText("Marvel").length).toBeGreaterThanOrEqual(1);

    screen.debug();
  });
});
