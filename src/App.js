import data from './data/data.json'
import React, { useEffect, useState } from 'react';
import ListItem from './components/ListItem/ListItem';
import './App.css';
import Search from './components/Search/Search';
import Pagination from './components/Pagination/Pagination';

function App() {

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(data.items)
  }, [])

  useEffect(() => {
    const filteredItems = data.items.filter(i => {

      const description = i.description.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "").trim().toLowerCase()

      const term = searchTerm.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "").trim().toLowerCase()
      
      return i.code.includes(term) || description.includes(term)
    })

    setCurrentPage(filteredItems.length > 5 ? currentPage : 1)
      
    setItems(filteredItems)
  }, [searchTerm])

  const idOfLastItem = currentPage * itemsPerPage
  const idOfFirstItem = idOfLastItem - itemsPerPage
  const currentPageItems = items.slice(idOfFirstItem, idOfLastItem)

  return (
    <div className="app">
      <div className="background"/>
      <div className="app-container">
        <div className="list-container">
        <div className="list-title">
          <h1>{"Products"}</h1>
        </div>
        <Search setSearchTerm={setSearchTerm}/>
        {currentPageItems.map((item) => (
          <ListItem
            item={item}
            items={items}
            varieties={data.varieties}
            key={item.code}
          />
        ))}
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={items}
        />
      </div>
    </div>

  );
}

export default App;
