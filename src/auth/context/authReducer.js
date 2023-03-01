import { types } from "../types/types";

//reducer es una función pura que recibe el estado y la acción

export const authReducer = (state = {}, action) => {
    
  // se evalúa el tipo de acción y se retorna el nuevo estado
  // aca el usuario se loguea y se guarda en el state
  //se hace la desestructuración del state para no perder la información
  switch (action.type) {
    case types.login:
      return {
        ...state,
        logged: true,
        user: action.payload,
      };
    case types.logout:
      return {
        logged: false,
      };
    default:
      return state;
  }
};
