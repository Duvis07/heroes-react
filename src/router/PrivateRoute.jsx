import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/context";

//RECIBE COMO PROPS LOS CHILDREN QUE SON LOS COMPONENTES QUE SE QUIEREN MOSTRAR
export const PrivateRoute = ({ children }) => {
  //SE USA EL CONTEXT PARA SABER SI EL USUARIO ESTA LOGUEADO
  const { logged } = useContext(AuthContext);

  //SE USA EL HOOK DE REACT ROUTER DOM PARA SABER LA RUTA ACTUAL
  const { pathname, search } = useLocation();

  //SE GUARDA LA RUTA ACTUAL EN EL LOCAL STORAGE PARA PODER REDIRIGIR AL USUARIO A LA RUTA ANTERIOR
  const lastPath = pathname + search;

  
  localStorage.setItem("lastPath", lastPath);

  //SI EL USUARIO ESTA LOGUEADO SE MUESTRAN LOS CHILDREN QUE SON LOS COMPONENTES
  //SI NO ESTA LOGUEADO SE REDIRIGE A LA PAGINA DE LOGIN
  return logged ? children : <Navigate to="/login" />;
};
