import React from 'react';
import SearchBar from './SearchBar';

//This is a sample of the component that is called by the Route component in EndPoints.jsx. This is almost like the page. 
//When you want to create a new page, just create a new folder in the components directory and add the components related to that page into that folder, before adding the Route component in EndPoints.jsx.

function SearchPage(){
    return (
        <div>
            <SearchBar/>
        </div>
    )
}

export default SearchPage;