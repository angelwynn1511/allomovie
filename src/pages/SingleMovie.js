import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const url = `https://api.themoviedb.org/3/movie/`;
const api_key="?api_key=e4e463e087cd1f24e6bc8e742ac2e8b8";

const SingleMovie = () => {
  // useparams est un hook qu'on doit affecter à une variable
  const { movieId } = useParams();
  console.log(movieId); //rend l'id du movie

  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(movie);

  const getMovie = async () => {
    setIsLoading(true);
    const response = await fetch(`${url}${movieId}${api_key}`); // guillemets du 7, 2 variables côte à côte dans le même string
    const movie = await response.json();

    //! si on change le state, on va provoquer un loop infini car la modification du state déclenche useEffect (dans lequel nous modifions le state)
    //* la solution est d'utiliser un [] dans le second arg de useEffect pour qu'il ne se déclenche qu'au premier rendu du composant
    setMovie(movie);
    // console.log(movie);
    setIsLoading(false);
    console.log(movie); //me rend un objet
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const {
    title,
    poster_path,
    overview
  } = movie;
  return (
    <section className="movie">
      <h1>{title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
      <br />
      <p className="resume">
        {overview}
      </p>
      <div className="card-btn">
        <button className="back-home"><Link to="/">Back to movies</Link></button>
        <button className="add-button">Favoris</button>
      </div>
    </section>
  );
};
export default SingleMovie;
