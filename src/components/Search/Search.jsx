import React, { useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import { MdClear } from 'react-icons/md'
import './styles.css'

const Search = ({ setSearchTerm }) => {

  const [term, setTerm] = useState('')
  const inputRef = useRef(null)

  return (
    <div className="search">
      <FiSearch className="search-button"
        onClick={() => inputRef.current.focus()}  
      />
      <input
        className="search-input"
        onChange={(e) => setSearchTerm(e.target.value)}
        ref={inputRef}
      >  
      </input>
    </div>
  );
}

export default Search;