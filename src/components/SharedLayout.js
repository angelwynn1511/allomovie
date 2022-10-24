import React, { useState } from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import SearchForm from './SearchForm';
import MoviesList from './MoviesList';

const SharedLayout = ({isSearching, setIsSearching}) => {
  const [input, setInput] = useState("");


  console.log('isSearching est '+ isSearching +' dans sharedlayout');
  return (
    <>
      <Navbar/>
      <SearchForm isSearching={(isSearching)} setIsSearching={(setIsSearching)} />
      <Outlet />
    </>
  )
}

export default SharedLayout