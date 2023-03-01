import {heroes} from '../data/heroes';


// Función que filtra los heroes por su publisher (DC Comics o Marvel Comics)
export const getHeroesByPublisher = (publisher) => {
    const validPublishers = ['DC Comics', 'Marvel Comics'];
    if(!validPublishers.includes(publisher)){
        throw new Error(`Publisher "${publisher}" no es correcto`);
    }
    return heroes.filter(hero => hero.publisher === publisher);
}