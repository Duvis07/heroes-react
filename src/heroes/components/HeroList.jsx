import { HeroCard } from "./";
import { getHeroesByPublisher } from "../helpers";
import { useMemo } from "react";

export const HeroList = ({ publisher }) => {
  //el usememo se usa para que no se vuelva a ejecutar la funcion getHeroesByPublisher
  //la dependencia final es un arreglo de publisher
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  //se toma cada una y se esparce en el componente HeroCard para que se muestre en pantalla
  return (
    <div className="row rows-cols-1 row-cols-md-3 g-3">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};
