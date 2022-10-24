import {React, useState} from "react";

const SearchForm = ({isSearching,setIsSearching, moviesList,setMoviesList}) => {
  const[searchList,setSearchList]=useState([]);
  
  const searchMovie = async(e) =>{
    e.preventDefault();
    console.log("Searching");
    try {
      const url_search=`http://api.themoviedb.org/3/search/movie?api_key=e4e463e087cd1f24e6bc8e742ac2e8b8&query=${isSearching}`;
      const res= await fetch(url_search);
      const search= await res.json();
      console.log("voici les résultats de la fonction searchMovie:");
      console.log(search.results);
      setSearchList(search.results);
    } catch (e) {
      console.log(e);
    }
  }

  const changeHandler=(e)=>{
    setIsSearching(e.target.value);
  };
  
  return (
    <section>
      <form className="search_form" action="/" method="get" onSubmit={searchMovie}>
        <input
          type="text"
          id="header-search"
          placeholder="i.e 'Titanic'"
          onChange = {changeHandler}
          value={isSearching}
        />
          <select name="languages" id="lang">
            <option value="english">English</option>
            <option value="français">Français</option>
          </select>
          <input type="submit" value="Submit" onClick={searchMovie}/>
      </form>
    </section>
  );
};

export default SearchForm;
