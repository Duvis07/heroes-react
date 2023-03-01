import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";

export const LoginPage = () => {
  // se usa el hook useContext para poder usar el login
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  // se usa el hook useNavigate para poder navegar a la pagina anterior
  //el lastPath se guarda en el localStorage
  const onLogin = () => {
    const lastPath = localStorage.getItem("lastPath") || "/";

    login("Duvan Botero");
    navigate(lastPath, { replace: true });
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />
      <button className="btn btn-primary" onClick={onLogin}>
        Login
      </button>
    </div>
  );
};
