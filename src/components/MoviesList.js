import React, {useState, useEffect} from "react";
// J'importe ma variable products de mon data
import { Link, useParams} from "react-router-dom";
import ReactDOM from 'react-dom';
// import Loading from "./Loading";
import ReactPaginate from "react-paginate";
import SearchForm from "./SearchForm";

const MoviesList = ({isSearching}) => {

  const [moviesList, setMoviesList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [counts, setCounts]= useState({
    total_pages:100,
    total_results:2000
  });
  const [totalPages, setTotalPages]= useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [movieOffset, setMovieOffset] = useState(0);
  const moviesPerPage=20;
  const hasNext = counts.total_pages < currentPage;

  const url_paginate = `https://api.themoviedb.org/3/movie/popular?api_key=e4e463e087cd1f24e6bc8e742ac2e8b8&page=${currentPage}`;
  // const [isLoading, setIsLoading] = useState(true);
  
  const [url, setUrl] = useState(url_paginate);
  const url_search=`http://api.themoviedb.org/3/search/movie?api_key=e4e463e087cd1f24e6bc8e742ac2e8b8&query=${isSearching}`;

  useEffect(() =>{
    var url;
    if(isSearching !== ''){
      url=url_search;
    }else{
      url=url_paginate;
    };
    fetch(url)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMoviesList(data.results);
      setTotalPages(data.total_pages);
      // console.log(totalPages);
    })
    setPageCount(Math.ceil(moviesList.length / moviesPerPage));
  }, [moviesPerPage, currentPage, isSearching,totalPages]);
  // console.log(moviesList);
  
  useEffect(()=>{
    console.log("isSearching", isSearching);
  },[moviesPerPage,currentPage,isSearching]);

  const handlePageClick = (event) => {
    const newPage = (event.selected)+1;
    const paginateSearch = "&page=";
    console.log(
        `User requested page number ${newPage}`
    );
    setCurrentPage(newPage);
    // ----------------Trouver solution pour que l'url se mette à jour au changement de page------------------------
    // if(isSearching !== ''){
    //   setUrl(`${url_search}${paginateSearch}${newPage+1}`);
    // }
    // console.log(url);
  };

    // if(isSearching !== ''){
    //   setUrl(`${url_search}${paginateSearch}${newPage+1}`);
    // }

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className="movies">
      <div className="articles">
          {/* <div className="articles"> */}

            {moviesList.map((movie) => {
              const { id, title, poster_path, release_date, vote_average, vote_count} =
                movie;
              return (
                <article key={id}>
                  <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
                  <div className="info">
                    <h1>{title}</h1>
                    <div className="date_note">
                      <p>{release_date}</p>
                      <p>{vote_average} / 10 ({vote_count})</p>
                    </div>
                    <div className="card-btn">
                      <button className="details-button"><Link to={`/details/${id}`}>DETAILS</Link></button>
                      <button className="add-button">Add</button>
                    </div>
                  </div>
                </article>
              );
            })}
          {/* </div> */}
      </div>
      {/* --------------------------------------Pagination avec React-paginate---------------------------------------- */}
        <div className="pages">
          <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName='page-num'
                previousLinkClassName='page-num'
                nextLinkClassName='page-num'
                activeLinkClassName='num-active'
                marginPagesDisplayed={1}
          />
        </div>
      {/* --------------------------------------FIN Pagination avec React-paginate---------------------------------------- */}
    </div>

  );
  
};
// ReactDOM.render(
//   <MoviesList moviesPerPage={20} />,
//   document.getElementById('container')
// );
export default MoviesList;

