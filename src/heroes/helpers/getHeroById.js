import { heroes } from "../data/heroes";

//El id debe existir en el arreglo heroes o de lo contrario retornará undefined
export const getHeroById = (id) => {
  return heroes.find((hero) => hero.id === id);
};
