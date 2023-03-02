import { authReducer, types } from "../../../auth";

describe("Pruebas en authReducer", () => {

    //evalua el estado por defecto del reducer sea logged: false
  test("debe de retornar el estado por defecto", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });

  test("debe de (login) llamar el login autenticar y establecer el user", () => {
    const action = {
      type: types.login,
      payload: {
        name: "Juan",
        id: "123",
      },
    };

    // eslint-disable-next-line no-undef
    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      user: action.payload,
    });
  });

  test("debe de (logout) borrar el name del usuario y logged en false ", () => {
    const state = {
      logged: true,
      user: { id: "123", name: "Juan" },
    };

    const action = {
      type: types.logout,
    };

    const newState = authReducer(state, action);
    expect(newState).toEqual({ logged: false });
  });
});
