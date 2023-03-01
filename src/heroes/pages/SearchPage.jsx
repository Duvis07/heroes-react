import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components";
import queryString from "query-string";
import { getHeroByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  //se usa el hook useLocation para obtener la url
  const location = useLocation();

  //Se instala QueryString para poder obtener los query params
  //se utiliza para obtener el query param q y se manda la propiedad de location.search
  const { q = "" } = queryString.parse(location.search);
  // se llama la funcion getHeroByName y se le pasa el query param q
  const heroes = getHeroByName(q);

  const showSearch = (q.length === 0);
  const showError =( q.length > 0) && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  //recibe el event borra espacios en blanco y si es menor a 1 no hace nada
  const onSearchSubmit = (event) => {
    event.preventDefault();
    // if ( searchText.trim().length <= 1 ) return;

    //le envia query param con lo que la persona escribio en el searchText
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />

            <button className="btn btn-outline-primary mt-1">Search</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {/* {
              ( q === '' )
                ? <div className="alert alert-primary">Search a hero</div>
                : ( heroes.length === 0 ) 
                  && <div className="alert alert-danger">No hero with <b>{ q }</b></div>
            } */}

<div className="alert alert-primary animate__animated animate__fadeIn" 
                style={{ display: showSearch ? '' : 'none' }}>
              Search a hero
            </div>

            <div className="alert alert-danger animate__animated animate__fadeIn" 
                style={{ display: showError ? '' : 'none' }}>
              No hero with <b>{ q }</b>
            </div>
          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
