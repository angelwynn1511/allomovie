import React, {useState, useEffect} from 'react';
import MoviesList from '../components/MoviesList';
import Loading from '../components/Loading';
import SearchForm from '../components/SearchForm';

const url = `https://api.themoviedb.org/3/discover/movie?api_key=e4e463e087cd1f24e6bc8e742ac2e8b8&page=1`;

const Home = ({searchList, setSearchList, moviesList, setMoviesList, isSearching, setIsSearching}) => {
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery]=useState(input);

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

  useEffect(() => {
    getMovies();
  }, [movies, input]);
  // console.log(movies);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="Home">
      <div className="moviesList">
        <MoviesList moviesList={(moviesList)} setMoviesList={(setMoviesList)} isSearching={(isSearching)} setIsSearching={(setIsSearching)} />
        {/* {movies.length <= 0 ? (
          <p>Aucun résultat ne correspond à votre recherche</p>
        ) : (
          <MoviesList movies={movies} />
          )} */}
      </div>
    </div>
  );
}

export default Home