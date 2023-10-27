import React, { useState } from 'react';
// import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ setSearchText }) {
//   const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Implement your search functionality here, e.g., fetch data from an API.
    // console.log(`Search for: ${searchText}`);
  };

  return (
    <div style={{ width: '60%', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
      <IconButton
        onClick={handleSearch}
        style={{
          backgroundColor: 'transparent',
          padding: '50',
          border: '1px solid rgb(71, 71, 114)', // Match the border style of the search bar
          borderRight: "none",
          borderRadius: '4px 0px 0px 4px', // Add border radius to make it look like a square
        }}
      >
        <SearchIcon style={{ color: 'rgb(71, 71, 114)' }} />
      </IconButton>
      <input
        type="text"
        placeholder="Search..."
        style={{
          flex: 1, // Take up the remaining space
          padding: '10px',
          fontSize: '16px',
          outline: "none",
          border: '1px solid rgb(71, 71, 114)', // Match the border style of the icon square
          borderRadius: '0px 4px 4px 0px', // Add border radius to match the icon square
        }}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
    </div>
  );
}

export default SearchBar;

