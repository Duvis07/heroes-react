import { heroes } from "../data/heroes";

//se recibe un nombre y se retorna un arreglo de heroes que coincidan con el nombre
//se pasa el nombre a minúsculas y se quitan los espacios en blanco
//filter() crea un nuevo arreglo con todos los elementos que cumplan la condición
//si el nombre no existe, se retorna un arreglo vacío
export const getHeroByName = (name = "") => {
  name = name.toLocaleLowerCase().trim();
  if (name === 0) return [];

  return heroes.filter((hero) =>
    hero.superhero.toLocaleLowerCase().includes(name)
  );
};
