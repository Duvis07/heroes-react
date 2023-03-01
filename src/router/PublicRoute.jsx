import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../auth/context";

export const PublicRoute = ({ children }) => {
  //SE USA EL CONTEXT PARA SABER SI EL USUARIO ESTA LOGUEADO
  const { logged } = useContext(AuthContext);

  //SI EL USUARIO ESTA LOGUEADO SE MUESTRAN LOS CHILDREN QUE SON LOS COMPONENTES
  //SI EL USUARIO ESTA LOGUEADO SE REDIRIGE A LA PAGINA DE MARVEL NO A LA DE LOGIN
  return !logged ? children : <Navigate to="/marvel" />;
};
