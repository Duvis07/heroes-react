import { useReducer } from "react";
import { types } from "../types/types";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

/* const initialState = {
  logged: false,
}; */

const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    logged: !!user,
    user: user,
  };
};

//recibe todos los componentes hijos
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  //se crea una funcion para poder hacer el login recibiendo el nombre del usuario
  const login = (name = "") => {
    const user = { id: "1223", name };

    const action = { type: types.login, payload: user };

    localStorage.setItem("user", JSON.stringify(user));

    //se dispara la accion y se le pasa el action que es el objeto que se creo arriba
    //llamado user
    dispatch(action);
  };

  ///se crea una funcion para poder hacer el logout
  //se elimina el user del localStorage
  //se crea un action que es un objeto que tiene el type y el payload
  const logout = () => {
    localStorage.removeItem("user");
    const action = { type: types.logout };
    dispatch(action);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        //METODOS
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
