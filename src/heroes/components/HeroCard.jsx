import React from "react";
import { Link } from "react-router-dom";

// se crea un componente para que se muestre el nombre de los heroes que tienen alter ego diferente a su nombre
//si el alter ego es igual al nombre de los heroes no se muestra el nombre de los heroes
export const CharactersByHero = ({ alter_ego, characters }) => {
  if (alter_ego === characters) return <></>;

  return <p className="card-text">{characters}</p>;
};

// se trae el id, superhero, publisher, alter_ego, first_appearance, characters de la data
export const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters,
}) => {
  // se crea una constante para que se pueda usar la imagen de cada heroe
  const heroImageUrl = require(`/assets/heroes/${id}.jpg`);

  /* const charactersByHero = <p className="card-text">{characters}</p>; */

  return (
    <div className="col animate__animated animate__bounce">
      <div className="card">
        <div className="row no-gutter">
          <div className="col-4">
            <img src={heroImageUrl} className="card-img" alt={superhero} />
          </div>

          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{superhero}</h5>
              <p className="card-text">{alter_ego}</p>

              {/*     {alter_ego !== characters && charactersByHero} */}

              <CharactersByHero alter_ego={alter_ego} characters={characters} />

              <p className="card-text">
                <small className="text-muted">{first_appearance}</small>
              </p>

              <Link to={`/hero/${id}`}>More...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
