import React ,{useEffect, useState} from 'react';
import './App.css';

import queryString from 'query-string';

import PostList from './components/PostList';
import Pagination from './components/Pagination';
import SearchForm from './components/SearchForm';

function App() {
  const [postList, setPostList] = useState([]) ; 
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
  });

  const [filters, setFilters] = useState( {    
    _limit: 10,
    _page: 1,
  }) ;



  useEffect ( () => { 
    const fetchData = async () => { 
      try { 
        const paramFilters = queryString.stringify(filters);
        const requestURL=`http://js-post-api.herokuapp.com/api/posts?${paramFilters}`;
        const response = await fetch(requestURL);
        const responseJSON = await response.json();
        setPostList(responseJSON.data);

        setPagination(responseJSON.pagination);

      }catch (error) {
        console.log("Failed to fetch server", error.message) ;
      }
    }
    fetchData() ;
  }, [filters] ) ;

  const handlePaginationChange = ( newPage) => {
    const newFilters = {
      ...filters,
      _page: newPage,
      
    }  

    setFilters(newFilters);
  }


  const handleSearchFormChange = (newSearchTerm) => {
    
    const newFilters = {
      ...filters,
      _page: 1,
      title_like: newSearchTerm.searchTerm
    }
    setFilters(newFilters);
  }

  return (
    <div className="App"> 
      <h1>Post List</h1>
      <SearchForm onSubmit={handleSearchFormChange} /> 
      <PostList posts={postList} />
      <Pagination 
          pagination={pagination} 
          onPaginationChange={handlePaginationChange}
      />
    </div>
  );
}

export default App;
