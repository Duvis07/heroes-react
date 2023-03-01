import React, { useMemo } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { getHeroById } from "../helpers";

export const HeroPage = () => {
  // se toma el id de la url
  const { id } = useParams();

  // se usa el hook useNavigate para poder navegar entre las paginas
  const navigate = useNavigate();

  //el usememo se usa para que no se vuelva a ejecutar la funcion getHeroById
  //cuando el id no cambie el useMemo no se vuelve a ejecutar
  const hero = useMemo(() => getHeroById(id), [id]);

  const heroImageUrl = require(`/assets/heroes/${id}.jpg`);

  // se crea una funcion para poder navegar hacia atras
  const onNavigateBack = () => {
    navigate(-1);
  };

  // si no existe el heroe se redirecciona a la pagina de marvel
  if (!hero) {
    return <Navigate to="/marvel" />;
  }

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={heroImageUrl}
          alt={hero.superhero}
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>

      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {" "}
            <b>Alter ego:</b> {hero.alter_ego}{" "}
          </li>
          <li className="list-group-item">
            {" "}
            <b>Publisher:</b> {hero.publisher}{" "}
          </li>
          <li className="list-group-item">
            {" "}
            <b>First appearance:</b> {hero.first_appearance}{" "}
          </li>
        </ul>

        <h5 className="mt-3"> Characters </h5>
        <p>{hero.characters}</p>

        <button className="btn btn-outline-primary" onClick={onNavigateBack}>
          Regresar
        </button>
      </div>
    </div>
  );
};
