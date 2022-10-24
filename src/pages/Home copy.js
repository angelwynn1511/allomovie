import React, {useState, useEffect} from 'react';
import MoviesList from '../components/MoviesList';
import Loading from '../components/Loading';
import SearchForm from '../components/SearchForm';
import ReactPaginate from 'react-paginate';
import Movies from '../components/Movies';
const url = `https://api.themoviedb.org/3/discover/movie?api_key=e4e463e087cd1f24e6bc8e742ac2e8b8&page=1`;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    setIsLoading(isLoading);
    const response = await fetch(`${url}${input}`);
    const { movies } = await response.json();

    if (movies) {
      setMovies(movies);
    } else {
      setMovies([]);
    }
    setIsLoading(false);
  };
  console.log(movies.results);

  useEffect(() => {
    getMovies();
  }, [input]);
  console.log(movies);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="Home">
      {/* J'appelle ma barre de recherche. Quand on écrit dans l'input, le state de celui-ci change */}
      {/* <div className='searchForm'>
        <SearchForm setInput={(input, setInput)} />
        <form action="#">
          <select name="languages" id="lang">
            <option value="english">English</option>
            <option value="français">Français</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div> */}
      <div className="moviesList">
        <MoviesList movies={movies}/>
        {movies.length <= 0 ? (
          <p>Aucun résultat ne correspond à votre recherche</p>
        ) : (
          <MoviesList movies={movies} />
          )}
      </div>
      
    </div>
  );
  
}

export default Home