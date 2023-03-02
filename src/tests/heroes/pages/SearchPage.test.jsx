import { SearchPage } from "../../../heroes";

import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const mockedUseNavigate = jest.fn();

//se realiza mock de la libreria react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en <SearchPage />", () => {

  // Limpiar mocks antes de cada prueba 
  beforeEach(() => jest.clearAllMocks());

  //cuando se utilza el useLocation se debe utlizar el MemoryRouter
  test("debe de mostrarse correactamente con valores por defecto", () => {
    //se desestructura el container del render
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    //se verifica que el container sea igual al snapshot 
    //el snapshot toma una foto del container y la compara con la foto del snapshot
    expect(container).toMatchSnapshot();
  });



  test("debe de mostrar a Batman y el input con el valor del queryString", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    //se verifica que el input tenga el valor batman
    //getByRole busca un textbox en el documento HTML
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("batman");

    //se busca la imagen del heroe sea igual a la ruta de la imagen del heroe batman
    const img = screen.getByRole("img");
    expect(img.src).toContain("/assets/heroes/dc-batman.jpg");


    // el alert-danger debe estar oculto con el display none
    const alert = screen.getByLabelText("alert-danger");
    expect(alert.style.display).toBe("none");
  });



  test("debe de mostrar un error si no se encuentra el hero (batman123)", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const alert = screen.getByLabelText("alert-danger");
    expect(alert.style.display).toBe("");
  });




  test("debe de llamar el navigate a la pantalla nueva", () => {

    //se simula el valor del input
    const inputValue = "superman";

    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");

    //se simula el evento change en el input y se le asigna el valor superman
    fireEvent.change(input, {
      target: { name: "searchText", value: inputValue },
    });

    //se simula el evento submit en el form se verifica que si dispare la función 
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    //se verifica que la función useNavigate haya sido llamada con los argumentos
    //`?q=${inputValue}` que es el valor del input superman
    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
  });
});
